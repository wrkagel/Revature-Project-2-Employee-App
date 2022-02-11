import { StyleSheet, Text, View } from "react-native";
import WorkLog from "../models/worklog";


export default function EmployeeStatusItem(props:(WorkLog & {fname:string, lname:string})) {

    const {fname, lname, action, timestamp} = props;

    return(<View>
        <View style={styles.lineContainer}>
            <Text style={[styles.normalText, styles.textBold]}>{`${fname} ${lname}`}</Text>
            <Text style={[styles.normalText, styles.textBold]}>{
                action === "CHECKIN" ? "Checked In" : "Checked Out"
            }</Text>
        </View>
        <Text style={styles.dateText}>{new Date(timestamp).toLocaleString()}</Text>
    </View>)
}

const styles = StyleSheet.create({
    normalText:{
        paddingHorizontal:10,
        fontSize:16
    },
    dateText:{
        marginBottom:20,
        marginHorizontal:10,
        fontSize:16,
    },
    textBold:{
        fontWeight:"bold"
    },
    lineContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        borderTopColor: "black",
        borderTopWidth:1,
    },
})