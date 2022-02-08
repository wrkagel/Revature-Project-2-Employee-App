import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
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
                workLogs.splice(0, 0, response.data);
                setWorkLogs([...workLogs]);
                setStatus(submission.action);
            }
        })()

    }, [submit])


    return (<View style={{flex: 1}}>

        <View style={{flex:0.1, justifyContent:"center"}}>
            <Text style={[styles.title]}>Work Log History</Text>
        </View>

        <FlatList style={{flex: 0.7}}
            data = {workLogs}
            renderItem={(item)=><View style={styles.actionItem}>
                <Text style={styles.actionItemText}>{new Date(item.item.timestamp).toLocaleString()}</Text>
                <Text style={styles.actionItemText}>{item.item.action === "CHECKIN" ? "Checked In   " : "Checked Out"}</Text>
            </View>}
        />

        <View style={{flex: 0.2, justifyContent:"center"}}>
            {status === "CHECKOUT" ? 
                <Button title="Check In" onPress={()=>{setSubmit({...submit})}}/> 
                :
                <Button title="Check Out" onPress={()=>{setSubmit({...submit})}}/>
            }
        </View>

    </View>)
}

const styles = StyleSheet.create({
    actionItem: {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:10,
        paddingHorizontal:20
    },
    actionItemText:{
        fontSize:16,
        fontWeight:"bold"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        textAlign: "center",

    }
    
})
