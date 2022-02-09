import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ServiceRequest from "../models/service-request";
import OrderRoutes from "../routes/order-routes";
import OrderItem from "./order-item";


export default function OrdersPage(){
    const [orders,setOrders] = useState<ServiceRequest[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [run, setRun] = useState<{}>();



    useEffect(()=> {
        (async ()=> {
            const response = await OrderRoutes.getOrders()
            if(response && response.status === 200){
                const orders = response.data;
                const priority = {"Ordered": 0, "Processing": 1, "Completed": 2, "Cancelled": 3};
                orders.sort((o1, o2) => {

                    const dif = priority[o1.status] - priority[o2.status];
                
                    if ( dif !== 0) {
                        return dif;
                    }

                    return o1.created - o2.created;
                });
                setOrders(orders);
            }else{
                alert("not success");
            }
        })();
        setRefreshing(false);
    },[run])

    function refresh() {
        setRefreshing(true);
        setRun({...run});
    }

    return(<View>
        <FlatList 
        keyExtractor={(item)=>item.id}
        data={orders}
        refreshing={refreshing}
        onRefresh={refresh}
        renderItem={({item,index})=>
            <OrderItem item={item} orders={orders} setOrders={setOrders} index={index}/>


        }/>
        
    </View>)
}