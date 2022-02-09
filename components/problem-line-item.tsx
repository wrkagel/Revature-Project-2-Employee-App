import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Problem from "../models/problem";
import ProblemRoutes from "../routes/problem-routes";




export default function ProblemLineItem(props:{item:Problem,problems:Problem[],index:number,setProblems:Function}){
    const[reviewed, setReviewed]= useState<{}>()
    

    useEffect(()=>{
        if(!reviewed) return;
        (async ()=>{
            props.item.status = "reviewed";
            const response = await ProblemRoutes.updateProblem(props.item)
            if(response && response.status === 200){
                props.problems[props.index].status = props.item.status;
                props.setProblems([...props.problems])
                alert("You have successfully marked it as reviewed")
            }
        })();
    },[reviewed])
    
    return(
        <View>
            <Text>{props.item.category}</Text>
            <Text>{new Date(props.item.submittedTime).toLocaleString()}</Text>
            <Text>{props.item.desc}</Text>
            <Text>{props.item.status}</Text>
            <Pressable onPress={()=>setReviewed({...reviewed})}  >
                <Text>Mark as reviewed</Text>
            </Pressable>
        </View>




    )

}