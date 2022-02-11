import { useEffect, useRef, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, View, Animated } from "react-native";
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

    const orderDate = new Date(props.item.created);
    const partialId = props.item.id.substring(props.item.id.length - 7, props.item.id.length)

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
            <Pressable onPress={()=> !expanded ? expand() : contract()} style={styles.inlinePressable}>
                <View style={styles.orderLineView}>
                    <Text style={styles.inlineText}>OrderID: <Text style={styles.textBold}>{partialId}</Text></Text>
                    <Text style={styles.inlineRightAlign}>{props.item.room}</Text>
                </View>
                <View style={styles.orderLineView}>
                    <Text style={styles.inlineText}>Status:   <Text style={styles.textBold}>{props.item.status}</Text></Text>
                    <Text style={styles.inlineRightAlign}>{orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}</Text>
                </View>
            </Pressable>
            {expanded && <Animated.View style={{transform:[{scaleY:formAnimation}]}}>
                <Text style={styles.expandedText}><Text style={styles.textBold}>Room: </Text>{props.item.room}</Text>
                <Text style={styles.expandedText}><Text style={styles.textBold}>Created: </Text>{new Date(props.item.created).toLocaleString()}</Text>
                <Text style={[styles.textBold, {alignSelf:"center"}]}>Order Details</Text>
                <FlatList data={item.requestedOfferings} keyExtractor={(item) => item.desc}
                    renderItem={({item}) => {
                        return(<Text style={styles.expandedText}>{item.amount} x {item.desc}</Text>)
                    }}/>
                {props.item.status === "Cancelled" ?
                    <></>
                    : props.item.status === "Completed" ?
                     <View style={styles.buttonView}>
                        <Button title="Re-Open Order (Processing)" onPress={() => clickProcessing({...setProcessing})} />
                    </View>
                    : props.item.status === "Processing" ?
                    <View style={styles.buttonView}>
                        <Button title="Set Completed" onPress={() => clickCompleted({...setCompleted})}/>
                    </View>
                    :    
                    <View style={styles.buttonView}>
                        <Button title="Set Processing" onPress={() => clickProcessing({...setProcessing})} />   
                        <Button title="Set Completed" onPress={() => clickCompleted({...setCompleted})}/>
                    </View>
                }
            </Animated.View>}
        </View>

    )
}

const styles = StyleSheet.create({
    inlinePressable:{
        margin:8,
        justifyContent:"space-between",
    },
    orderLineView:{
        flex:1,
        flexDirection:"row",
    },
    inlineText:{
        fontSize:16,
        flex:.5,
        marginHorizontal:20,
    },
    inlineRightAlign:{
        fontSize:16,
        flex:.5,
        textAlign:"right",
        marginRight:30,
    },
    expandedText:{
        marginLeft:"15%",
    },
    textBold:{
        fontWeight:"bold",
    },
    buttonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:5,
        marginHorizontal:15,
    },
});