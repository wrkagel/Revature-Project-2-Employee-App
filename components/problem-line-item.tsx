import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
        <View style={styles.entryContainer}>
            <Text style={styles.bodyText}><Text style={styles.boldText}>Category: </Text>{props.item.category}</Text>
            <Text style={styles.bodyText}><Text style={styles.boldText}>Report Date: </Text>{new Date(props.item.submittedTime).toLocaleString()}</Text>
            <Text style={styles.bodyText}><Text style={styles.boldText}>Details: </Text>{props.item.desc}</Text>
            <Text style={[styles.bodyText, styles.boldText]}>Status: {props.item.status}</Text>
            {props.item.status !== "reviewed" ? <Pressable style={styles.button} onPress={()=>setReviewed({...reviewed})}  >
                <Text style={styles.buttonText}>Mark as reviewed</Text>
            </Pressable> 
            :
            <View style={{padding:8}}></View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    entryContainer:{
        borderTopColor:"black",
        borderTopWidth:1,
        borderStyle:"solid"
    },
    boldText:{
        fontWeight:"bold"
    },
    bodyText:{
        marginHorizontal:10,
    },
    button:{
        padding:8,
        backgroundColor:"#3377e0",
        alignSelf:"center",
        marginTop:5,
        marginBottom:15,
        width:150,
    },
    buttonText:{
        textAlign:"center",
        color:"white"
    },
});