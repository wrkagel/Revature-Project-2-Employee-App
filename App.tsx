import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createContext, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import CheckInPage from "./components/check-in-page";
import EmployeeStatusPage from "./components/employee-status-page";
import EventsPage from "./components/events-page";
import LoginPage from "./components/login-page";
import OrdersPage from "./components/orders-page";
import ProblemsPage from "./components/problems-page";
import Employee from "./models/employee";



export const CurrentUserContext = createContext({
  id: 0,
  isManager: false,
  fname: "",
  lname: "",
  username: ""
})

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

  return (<>
  <CurrentUserContext.Provider value={currentUser}>
    {showLogin ? (
      <LoginPage setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
    ) : (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Events" component={EventsPage}/>
        <Tab.Screen name="Check-In" component={CheckInPage}/>
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
