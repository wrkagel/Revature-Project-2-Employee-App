import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createContext } from "react";
import { StyleSheet, StatusBar } from "react-native";
import CheckInPage from "./components/check-in-page";
import EmployeeStatusPage from "./components/employee-status-page";
import EventsPage from "./components/events-page";
import OrdersPage from "./components/orders-page";
import ProblemsPage from "./components/problems-page";



export const CurrentUserContext = createContext({
  id: "",
  isManager: false,
  fname: "",
  lname: "",
  username: ""
})

export default function App() {

  const Tab = createBottomTabNavigator();
  

  return (<>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Events" component={EventsPage}/>
        <Tab.Screen name="Check-In" component={CheckInPage}/>
        <Tab.Screen name="Orders" component={OrdersPage}/>
        <Tab.Screen name="Problems" component={ProblemsPage}/>
        <Tab.Screen name="Employee Status" component={EmployeeStatusPage}/>
      </Tab.Navigator>        
    </NavigationContainer>
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
