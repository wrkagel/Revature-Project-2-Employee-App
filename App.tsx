import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, StatusBar, Button } from "react-native";
import CheckInPage from "./components/check-in-page";
import EmployeeStatusPage from "./components/employee-status-page";
import EventsPage from "./components/events-page";
import LoginPage from "./components/login-page";
import OrdersPage from "./components/orders-page";
import ProblemsPage from "./components/problems-page";
import Employee from "./models/employee";
import CurrentUserContext from "./contexts/current-user-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

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

  useEffect(()=>{
    (async () => {
      try {
        const storedUser: Employee = JSON.parse(await AsyncStorageLib.getItem("user") ?? "");
        if (storedUser){
          setCurrentUser(storedUser);
          setShowLogin(false);
        }
      } catch (error) {
        alert('Error retrieving stored login information. Please login again.');
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
          return <Button title="Logout" onPress={async () => {
            await AsyncStorageLib.removeItem("user");
            setShowLogin(true);
          }} />
        }
      }}>
        <Tab.Screen name="Check-In" component={CheckInPage}/>
        <Tab.Screen name="Events" component={EventsPage}/>
        <Tab.Screen name="Orders" component={OrdersPage}/>

        {/* THESE WILL ONLY BE RENDERED WHEN A MANAGER IS LOGGED IN */}
        
        {currentUser.isManager && (<>
        <Tab.Screen name="Problems" component={ProblemsPage}/>
        <Tab.Screen name="Employee Status" component={EmployeeStatusPage}/>
        </>)}
        
      </Tab.Navigator>        
    </NavigationContainer>
  )}
  </CurrentUserContext.Provider>

  <StatusBar/>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
