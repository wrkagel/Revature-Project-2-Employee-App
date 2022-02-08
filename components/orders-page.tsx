import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ServiceRequest from "../models/service-request";
import OrderRoutes from "../routes/order-routes";
import OrderItem from "./order-item";


export default function OrdersPage(){
    const [orders,setOrders] = useState<ServiceRequest[]>([])



    useEffect(()=> {
        (async ()=> {
            const response = await OrderRoutes.getOrders()
            if(response && response.status === 200){
                const orders = response.data;
                orders.sort((o1, o2) => {
                    if(o1.status === 'Ordered' && o2.status !== "Ordered") {
                        return -1;
                    }
                    if(o2.status === 'Ordered' && o1.status !== "Ordered") {
                        return 1;
                    }
                    return o1.created - o2.created;
                });
                setOrders(response.data);
            }else{
                alert("not success");
            }
        })();
    },[])


    return(<View>
        <FlatList 
        keyExtractor={(item)=>item.id}
        data={orders}
        renderItem={({item,index})=>
            <OrderItem item={item} orders={orders} setOrders={setOrders} index={index}/>


        }/>
        
    </View>)
}