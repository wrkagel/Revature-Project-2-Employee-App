import { useEffect, useRef, useState } from "react";
import { Animated, Button, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import ServiceRequest from "../models/service-request";
import OrderRoutes from "../routes/order-routes";


export default function OrderItem(props:{item:ServiceRequest,orders:ServiceRequest[], setOrders:Function,index:number}){
    const [expanded,setExpanded]= useState<boolean>(false)
    const [setProcessing, clickProcessing] = useState<{}>();
    const [setCompleted, clickCompleted] = useState<{}>();
    
    const formAnimation = useRef(new Animated.Value(0)).current;

    const {item, orders, index, setOrders} = props;

    useEffect(() => {
        if(!setProcessing) {
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

    return(
        <View>
            <Pressable onPress={()=> {!expanded ? expand() : contract()}} style={{flex:1}}>
                <Text style={{fontSize:20}}>{props.item.id}</Text>
                <Text style={{fontSize:20}}>{props.item.status}</Text>
            </Pressable>
            {expanded && <Animated.View style={{transform:[{scaleY:formAnimation}]}}>
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
            </Animated.View>}
        </View>





    )
}