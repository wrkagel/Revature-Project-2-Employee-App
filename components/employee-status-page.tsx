import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import WorkLog from "../models/worklog";
import EmployeeRoutes from "../routes/employee-routes";
import EmployeeStatusItem from "./employee-status-item";


export default function EmployeeStatusPage(){
    
    const [latestWorkLog, setLatestWorkLog] = useState<(WorkLog & {fname:string, lname:string})[]>();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [run, setRun] = useState<{}>();

    useEffect(() => {
        (async () => {
            const response = await EmployeeRoutes.getLatestWorkLogByEmployee();
            if(response && response.data) {
                setLatestWorkLog(response.data);
            } else {
                alert('There was an error communicating with the server.');
            }
        })();
        setRefreshing(false);
    },[run])

    function refresh() {
        setRefreshing(true);
        setRun({...run});
    }

    return(
        <FlatList
            data={latestWorkLog}
            refreshing={refreshing}
            onRefresh={refresh}
            keyExtractor={item => item.id + ""}
            renderItem={({item}) => {
                return <EmployeeStatusItem {...item}/>
            }}
        />)
}