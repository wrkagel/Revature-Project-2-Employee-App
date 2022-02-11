import { useEffect, useState } from "react";
import {View, Pressable, Text, StyleSheet} from "react-native";
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";



export default function EventLineItem(props: Activity & {events:Activity[]} & {setEvents:Function} & {index:number}){

    const [expanded, setExpanded] = useState<boolean>(false);

    const [cancelEvent, setCancelEvent] = useState<{}>();

    const {events, setEvents, index} = props;

    useEffect(() => {
        if(!cancelEvent) {
            return;
        }
        (async () => {
            const response = await EventRoutes.cancelEvent(props.id);
            if(response && response.status === 200) {
                events[index] = response.data;
                setEvents([...events]);
                alert('You have cancelled the event.');
            } else {
                alert('Error communicating with server. Please reload the events page to check if it succeeded.')
            }
        })();
    },[cancelEvent])


    return(
    <View style={styles.container}>
        <View style={{flex:0.7}}>
            <Pressable onPress={()=> setExpanded(!expanded)} style={styles.inlinePressable}>
                <Text style={styles.inlineText}>{props.title}</Text>
                <Text style={styles.inlineText}>{new Date(props.startTime).toLocaleString()}</Text>
            </Pressable>
            {expanded && <View>
                <Text style={styles.expandedText}>{props.desc}</Text>
                <Text style={styles.expandedText}><Text style={styles.expandedTextBold}>Ends:</Text> {new Date(props.endTime).toLocaleString()}</Text>
                <Text style={styles.expandedText}><Text style={styles.expandedTextBold}>Location:</Text> {props.location}</Text>
                <Text style={styles.expandedText}><Text style={styles.expandedTextBold}>Status:</Text> {props.status}</Text>
            </View>}
        </View>
        <Pressable style={styles.cancelPressable} onPress={() => setCancelEvent({...cancelEvent})}>
            <Text style={styles.cancelText}>Cancel Event</Text>
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    inlinePressable:{
        marginVertical:10,
    },
    inlineText:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
    },
    expandedView:{},
    expandedText:{
        marginHorizontal:8,
        marginVertical:3,
    },
    expandedTextBold:{
        fontWeight:"bold",
    },
    cancelPressable:{
        flex:0.3, 
        justifyContent:"center",
        marginRight:8,
    },
    cancelText:{
        color:"white", 
        fontSize:20, 
        backgroundColor:"red",
        textAlign:"center",
    },

});