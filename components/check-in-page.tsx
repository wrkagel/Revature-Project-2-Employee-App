import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, FlatList, Text, View } from "react-native";
import CurrentUserContext from "../contexts/current-user-context";
import WorkLog from "../models/worklog";
import EmployeeRoutes from "../routes/employee-routes";


export default function CheckInPage(){

    const [status, setStatus] = useState<"CHECKIN"|"CHECKOUT">("CHECKOUT");
    const [workLogs, setWorkLogs] = useState<WorkLog[]>([])
    const [submit, setSubmit] = useState<{}>();

    const user = useContext(CurrentUserContext);

    useEffect(()=>{
        (async ()=> {
            const response = await EmployeeRoutes.getWorkLogs(user.id);

            if (response && response.status === 200){
                const savedWorkLogs: WorkLog[] = response.data;
                savedWorkLogs.sort((w1, w2) => {
                    const d1 = new Date(w1.timestamp).valueOf();
                    const d2 = new Date(w2.timestamp).valueOf();
                    return d2 - d1;
                })
                setWorkLogs(savedWorkLogs);
                let savedStatus = status;
                if (savedWorkLogs.length > 0) {
                    savedStatus = savedWorkLogs[0].action
                    setStatus(savedWorkLogs[0].action);
                }
                if ( savedStatus === "CHECKOUT"){
                    
                    Alert.alert("Not Checked In", "You are not checked in: would you like to check in now?", [
                        {text:"Check-In", onPress: ()=>setSubmit({...submit})},
                        {text:"Not now", style: "cancel"}
                    ]                    
                    )
                }
            }
        })()
    }, [])

    useEffect(()=>{
        if (!submit) return;
        (async ()=> {
            const submission: {action: "CHECKIN" | "CHECKOUT"} = {action: status === "CHECKIN" ? "CHECKOUT" : "CHECKIN"};

            const response = await EmployeeRoutes.checkInOut(user.id, submission);

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