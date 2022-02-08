import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ServiceRequest from "../models/service-request";


export default function OrderItem(props:{item:ServiceRequest,orders:ServiceRequest[],index:number}){
    const[expanded,setExpanded]= useState<boolean>(false)

    
    
    
    return(
        <View>
            <Pressable onPress={()=> setExpanded(!expanded)} style={{flex:1}}>
                <Text style={{fontSize:20}}>{props.item.id}</Text>
                <Text style={{fontSize:20}}>{props.item.status}</Text>
            </Pressable>
            {expanded && <View>
                <Text>{props.item.room}</Text>
                <Text>Created: {new Date(props.item.created).toLocaleString()}</Text>
                
            </View>}
        </View>





    )
}