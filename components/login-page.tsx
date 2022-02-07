import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import Employee from "../models/employee";



export default function LoginPage(props: { setCurrentUser: Function, setShowLogin: Function }) {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [submit, setSubmit] = useState<{}>();


    useEffect(() => {
        (async () => {            
            if (!submit) return;

            const loginPayload = { username: usernameInput, password: passwordInput }
            const response = await axios.patch<Employee>("http://20.72.189.253:3000/login", loginPayload)
                .then((r) => r)
                .catch((error) => {
                    let message = "";
                    if (error.response) {
                        message += error.response.data;
                    }
                    if (error.message) {
                        message += `\n${error.message}`;
                    }
                    alert(message);
                });

            if (response && response.status === 200) {
                AsyncStorageLib.setItem("user", JSON.stringify(response.data));
                props.setCurrentUser(response.data);
                props.setShowLogin(false);
            }

        })()
    }, [submit])

    return (<View>
        <Text>Login Page</Text>
        <TextInput
            placeholder="username"
            onChangeText={(value) => setUsernameInput(value)}
            autoCapitalize={"none"}
        />
        <TextInput
            secureTextEntry
            placeholder="password"
            onChangeText={(value) => setPasswordInput(value)}
            autoCapitalize={"none"}
        />
        <Button title="Log-In" onPress={()=>setSubmit({...submit})} />
    </View>)
}