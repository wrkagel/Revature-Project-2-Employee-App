import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ServiceRequest from "../models/service-request";
import OrderRoutes from "../routes/order-routes";
import OrderItem from "./order-item";


export default function OrdersPage(){
    const [orders,setOrders] = useState<ServiceRequest[]>([])



    useEffect(()=> {
        (async ()=> {
            const response = await OrderRoutes.getOrders()
            if(response && response.status === 200){
                setOrders(response.data);
                alert("success");
            }else{
                alert("not success");
            }
        })
    },[])


    return(<View>
        <FlatList 
        keyExtractor={(item)=>item.id}
        data={orders}
        renderItem={({item,index})=>
            <OrderItem item={item} orders={orders} index={index}/>


        }/>
        
    </View>)
}