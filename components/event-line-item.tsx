import { useEffect, useRef, useState } from "react";
import {View, Pressable, Text, Animated} from "react-native";
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";



export default function EventLineItem(props: Activity & {events:Activity[]} & {setEvents:Function} & {index:number}){

    const [expanded, setExpanded] = useState<boolean>(false);

    const [cancelEvent, setCancelEvent] = useState<{}>();

    const {events, setEvents, index} = props;

    const formAnimation = useRef(new Animated.Value(0)).current;

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

    function expand() {
        setExpanded(true);
        Animated.timing(formAnimation, {
            toValue: 1,
            duration:500,
            useNativeDriver:true
        }).start();
    }

    function contract() {
        Animated.timing(formAnimation, {
            toValue: 0,
            duration:500,
            useNativeDriver:true
        }).start(() => {
            setExpanded(false);
        });
    }

    return(<View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View style={{flex:0.7}}>
            <Pressable onPress={()=> {
                    !expanded ? expand() : contract();
                }} 
                style={{flex:1}}>
                <Text style={{fontSize:20}}>{props.title}</Text>
                <Text style={{fontSize:20}}>{new Date(props.startTime).toLocaleString()}</Text>
            </Pressable>
            {expanded && <Animated.View style={{transform:[{scaleY:formAnimation}]}}>
                <Text>{props.desc}</Text>
                <Text>Ends: {new Date(props.endTime).toLocaleString()}</Text>
                <Text>Location: {props.location}</Text>
                <Text>Status: {props.status}</Text>
            </Animated.View>}
        </View>
        <Pressable style={{flex:0.3, justifyContent:"center"}} onPress={() => setCancelEvent({...cancelEvent})}>
            <Text style={{color:"white", fontSize:20, backgroundColor:"red"}}>Cancel Event</Text>
        </Pressable>
    </View>)
}