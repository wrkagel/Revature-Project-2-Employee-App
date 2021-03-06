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

    problems.sort((a, b) => {
        if (a.status === "reviewed" && b.status !== "reviewed"){
            return 1;
        }
        else if  ( a.status === b.status ){
            return a.submittedTime - b.submittedTime;
        }
        else return -1;    
    });


    return(<View style={{flex:1}}>

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