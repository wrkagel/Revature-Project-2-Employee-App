import { Button, Text, View } from "react-native";
import Employee from "../models/employee";


export default function LoginPage(props:{setCurrentUser: Function, setShowLogin: Function}){

    const debugEmployee: Employee = {
        id: 0,
        isManager: false,
        fname: "",
        lname: "",
        username: "Basic Boy"
    }
    const debugManager: Employee = {
        id: 0,
        isManager: true,
        fname: "",
        lname: "",
        username: "Man E. Ger"
    }

    function loginEmployee(){
        props.setCurrentUser(debugEmployee)
        alert(`Logged in: ${debugEmployee.username}`)
        props.setShowLogin(false);
    }
    function loginManager(){
        props.setCurrentUser(debugManager)
        alert(`Logged in: ${debugManager.username}`)
        props.setShowLogin(false);
    }

    return(<View>
        <Text>Login Page</Text>

        <Button title="Log-In Employee" onPress={loginEmployee} />
        <Button title="Log-In Manager" onPress={loginManager} />
    </View>)
}