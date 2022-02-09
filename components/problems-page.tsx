import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Problem from "../models/problem";
import ProblemRoutes from "../routes/problem-routes";
import ProblemLineItem from "./problem-line-item";


export default function ProblemsPage(){
    const [problems,setProblems] = useState<Problem[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [run, setRun] = useState<{}>()


    useEffect(()=>{
        (async ()=> {
            const response = await ProblemRoutes.getProblems();
            if(response && response.status === 200){
                const problems =response.data;
                setProblems([...problems])
            }
            setRefreshing(false)
        })();
    },[run])

    function refresh(){
        setRefreshing(true);
        setRun({...run})
        
    }


    return(<View>

        <FlatList 
        keyExtractor={(item)=>item.id}
        refreshing={refreshing}
        onRefresh={refresh}
        data = {problems}
        renderItem={({item,index})=>
        <ProblemLineItem item={item} problems={problems} index={index} setProblems={setProblems} />
        }
        />

    </View>)
}