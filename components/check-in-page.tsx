import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import CurrentUserContext from "../contexts/current-user-context";
import WorkLog from "../models/worklog";


export default function CheckInPage(){

    const [status, setStatus] = useState<"CHECKIN"|"CHECKOUT">("CHECKOUT");
    const [workLogs, setWorkLogs] = useState<WorkLog[]>([])
    const [submit, setSubmit] = useState<{}>();

    const user = useContext(CurrentUserContext);

    useEffect(()=>{
        (async ()=> {
            const response = await axios.get<WorkLog[]>(`http://20.72.189.253:3000/employees/${user.id}/worklogs`)
            .then((r) => r)
            .catch((error) => {
            let message = "";
            if(error.response) {
                message += error.response.data;
            }
            if(error.message) {
                message += `\n${error.message}`;
            }
            alert(message);
            });

            if (response && response.status === 200){
                const savedWorkLogs: WorkLog[] = response.data;
                savedWorkLogs.sort((w1, w2) => {
                    return w2.timestamp - w1.timestamp;
                })
                setWorkLogs(savedWorkLogs);
                if (savedWorkLogs.length > 0) {
                    setStatus(savedWorkLogs[0].action);
                }
            }
        })()
    }, [])

    useEffect(()=>{
        if (!submit) return;
        (async ()=> {
            const submission: {action: "CHECKIN" | "CHECKOUT"} = {action: status === "CHECKIN" ? "CHECKOUT" : "CHECKIN"};

            const response = await axios.post(`http://20.72.189.253:3000/employees/${user.id}/worklogs`, submission)
            .then((r) => r)
            .catch((error) => {
            let message = "";
            if(error.response) {
                message += error.response.data;
            }
            if(error.message) {
                message += `\n${error.message}`;
            }
            alert(message);
            });

            if (response && response.status === 200){
                submission.action === "CHECKIN" ? alert("Successfully checked in!") : alert("Successfully checked out!");
                setStatus(submission.action);
            }
        })()

    }, [submit])


    return (<View style={{flex: 1}}>

        {/* <FlatList style={{flex: 0.8}}/> */}

        <View style={{flex: 0.2}}>
            {status === "CHECKOUT" ? 
                <Button title="Check In" onPress={()=>{setSubmit({...submit})}}/> 
                :
                <Button title="Check Out" onPress={()=>{setSubmit({...submit})}}/>
            }
        </View>

    </View>)
}