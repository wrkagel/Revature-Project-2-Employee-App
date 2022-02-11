import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, StatusBar, Button, View } from "react-native";
import CheckInPage from "./components/check-in-page";
import EmployeeStatusPage from "./components/employee-status-page";
import EventsPage from "./components/events-page";
import LoginPage from "./components/login-page";
import OrdersPage from "./components/orders-page";
import ProblemsPage from "./components/problems-page";
import Employee from "./models/employee";
import CurrentUserContext from "./contexts/current-user-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons'

export default function App() {

  const Tab = createBottomTabNavigator();

  const [showLogin, setShowLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState<Employee>({
    id: 0,
    isManager: false,
    fname: "",
    lname: "",
    username: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const storedUser: Employee = JSON.parse(await AsyncStorageLib.getItem("user") ?? "");
        if (storedUser) {
          setCurrentUser(storedUser);
          setShowLogin(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  }, []);

  return (<>
    <CurrentUserContext.Provider value={currentUser}>
      {showLogin ? (
        <LoginPage setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      ) : (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
            headerRight: () => {
              return (<View style={styles.logoutView}>
              <Button title="Logout" onPress={async () => {
                await AsyncStorageLib.removeItem("user");
                setShowLogin(true);
              }} />
              </View>)
            }
          }}>
            <Tab.Screen
              name="Check-In"
              component={CheckInPage}
              options={{ tabBarIcon: () => { return <MaterialCommunityIcons name="timer" size={24} color="green" /> } }}
            />
            <Tab.Screen
              name="Events"
              component={EventsPage}
              options={{ tabBarIcon: () => { return <MaterialIcons name="event" size={24} color="black" /> } }}
            />
            <Tab.Screen
              name="Orders"
              component={OrdersPage}
              options={{ tabBarIcon: () => { return <MaterialCommunityIcons name="chef-hat" size={24} color="gray" /> } }}
            />

            {/* THESE WILL ONLY BE RENDERED WHEN A MANAGER IS LOGGED IN */}

            {currentUser.isManager && (<>
              <Tab.Screen
                name="Problems"
                component={ProblemsPage}
                options={{ tabBarIcon: () => { return <Entypo name="warning" size={24} color="red" /> } }}
              />
              <Tab.Screen
                name="Employee Status"
                component={EmployeeStatusPage}
                options={{ tabBarIcon: () => { return <FontAwesome5 name="clipboard-list" size={24} color="darkorange" /> } }}
              />
            </>)}

          </Tab.Navigator>
        </NavigationContainer>
      )}
    </CurrentUserContext.Provider>

    <StatusBar />
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutView:{
    marginRight: 10,
  },
});
