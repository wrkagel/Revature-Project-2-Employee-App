import { Text, View } from "react-native";
import WorkLog from "../models/worklog";


export default function EmployeeStatusItem(props:(WorkLog & {fname:string, lname:string})) {

    const {fname, lname, action, timestamp} = props;

    return(<View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{paddingLeft:10, paddingTop:10}}>{`${fname} ${lname}`}</Text>
            <Text style={{paddingRight:10, paddingTop:10}}>{
                action === "CHECKIN" ? "Checked In" : "Checked Out"
            }</Text>
        </View>
        <Text>{new Date(timestamp).toLocaleString()}</Text>
    </View>)
}