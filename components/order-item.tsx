import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import ServiceRequest from "../models/service-request";
import OrderRoutes from "../routes/order-routes";


export default function OrderItem(props:{item:ServiceRequest,orders:ServiceRequest[], setOrders:Function,index:number}){
    const [expanded,setExpanded]= useState<boolean>(false)
    const [setProcessing, clickProcessing] = useState<{}>();
    const [setCompleted, clickCompleted] = useState<{}>();

    const {item, orders, index, setOrders} = props;

    useEffect(() => {
        if(! setProcessing) {
            return;
        }
        (async () => {
            item.status = "Processing";
            const response = await OrderRoutes.updateOrder(item);
            if(response && response.status === 200) {
                orders[index] = response.data;
                setOrders([...orders]);
                alert('Set to Processing.');
            } else {
                alert('Error communicating with server.');
            }
        })()
    },[setProcessing])

    useEffect(() => {
        if(!setCompleted) {
            return;
        }
        (async () => {
            item.status = "Completed";
            const response = await OrderRoutes.updateOrder(item);
            if(response && response.status === 200) {
                orders[index] = response.data;
                setOrders([...orders]);
                alert('Set to Completed.');
            } else {
                alert('Error communicating with server.');
            }
        })()
    },[setCompleted])

    
    return(
        <View>
            <Pressable onPress={()=> setExpanded(!expanded)} style={{flex:1}}>
                <Text style={{fontSize:20}}>{props.item.id}</Text>
                <Text style={{fontSize:20}}>{props.item.status}</Text>
            </Pressable>
            {expanded && <View>
                <Text>{props.item.room}</Text>
                <Text>Created: {new Date(props.item.created).toLocaleString()}</Text>
                <FlatList data={item.requestedOfferings} keyExtractor={(item) => item.desc}
                    renderItem={({item}) => {
                        return(<Text>{item.desc} * {item.amount} </Text>)
                    }}/>
                <View style={{flexDirection:"row"}}>
                    <Button title="Set Processing" onPress={() => clickProcessing({...setProcessing})} />
                    <Button title="Set Completed" onPress={() => clickCompleted({...setCompleted})}/>
                </View>
            </View>}
        </View>





    )
}