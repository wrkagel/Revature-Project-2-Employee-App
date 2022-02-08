import { useState } from "react";
import {View, Pressable, Text} from "react-native";
import Activity from "../models/activity";



export default function EventLineItem(props: Activity){

    const [expanded, setExpanded] = useState<boolean>(false)


    return(
    <View>
        <Pressable onPress={()=> setExpanded(!expanded)} style={{flex:1}}>
            <Text>{props.title} {new Date(props.startTime).toDateString()}</Text>
        </Pressable>
        {expanded && <View>
            <Text>{props.desc}</Text>
            <Text>{props.endTime}</Text>
            <Text>{props.location}</Text>
            <Text>{props.status}</Text>
        </View>}
    </View>)
}