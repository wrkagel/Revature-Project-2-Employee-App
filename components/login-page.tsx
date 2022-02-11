import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Employee from "../models/employee";
import EmployeeRoutes from "../routes/employee-routes";



export default function LoginPage(props: { setCurrentUser: Function, setShowLogin: Function }) {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [submit, setSubmit] = useState<{}>();


    useEffect(() => {
        (async () => {            
            if (!submit) return;

            const loginPayload = { username: usernameInput, password: passwordInput }
            const response = await EmployeeRoutes.logIn(loginPayload);

            if (response && response.status === 200) {
                AsyncStorageLib.setItem("user", JSON.stringify(response.data));
                props.setCurrentUser(response.data);
                props.setShowLogin(false);
            }

        })()
    }, [submit])

    return (<View style={styles.container}>
        <Text style={styles.labelText}>Employee Login Portal</Text>
        <TextInput
            style={styles.textInput}
            placeholder="username"
            onChangeText={(value) => setUsernameInput(value)}
            autoCapitalize={"none"}
        />
        <TextInput
            style={styles.textInput}
            secureTextEntry
            placeholder="password"
            onChangeText={(value) => setPasswordInput(value)}
            autoCapitalize={"none"}
        />
        <Pressable style={styles.loginButton} onPress={()=>setSubmit({...submit})}>
            <Text style={styles.loginButtonText}>Log In</Text>
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    labelText:{
        marginVertical:8,
        fontWeight:"bold",
        fontSize:20,
        marginBottom:40,
    },
    loginButton:{
        backgroundColor:"#0080ff60",
        width: 80,
        padding: 10,
        margin:10,
        alignItems:"center",
    },
    loginButtonText:{
        fontWeight:"bold",
        fontSize: 18,
    
    },
    textInput:{
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"black",
        width: 120,
        height: 40,
        textAlign:"center",
        marginVertical:5,
    }
});