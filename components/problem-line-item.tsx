import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Problem from "../models/problem";
import ProblemRoutes from "../routes/problem-routes";




export default function ProblemLineItem(props:{item:Problem,problems:Problem[],index:number,setProblems:Function}){
    const[reviewed, setReviewed]= useState<{}>();
    const [expandedImage, setExpandedImage] = useState<boolean>(false);
    const [image, setImage] = useState<{uri:string, height:number, width:number, shrunkHeight:number, shrunkWidth:number} | null>(null);

    useEffect(()=> {
        if(props.item.photoLink) {
            Image.getSize(props.item.photoLink, (width, height) => {
                let shrunkHeight = height;
                let shrunkWidth = width;
                const {width:screenWidth, height:screenHeight} = Dimensions.get('screen');
                while(height > screenHeight || width > screenWidth) {
                    height *= 0.95;
                    width *= 0.95;
                }
                while(shrunkHeight > screenHeight * 0.25 || shrunkWidth > screenWidth * 0.25) {
                    shrunkHeight *= 0.95;
                    shrunkWidth *= 0.95;
                }
                setImage({uri:props.item.photoLink, height, width, shrunkHeight, shrunkWidth});
            });
      }
    },[]);

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
            {image && (props.item.status !== "reviewed" || expandedImage ? <Pressable onPress={() => {
                setExpandedImage(!expandedImage);
            }}>
            <Image source={{ uri: image.uri}} 
            style={
                {width: (expandedImage ? image.width : image.shrunkWidth), 
                height: (expandedImage ? image.height : image.shrunkHeight),
                alignSelf:"center",
                marginVertical:10}} />
            </Pressable>
            :
            <Pressable style={styles.button} onPress={() => {
                setExpandedImage(!expandedImage);
            }}>
                <Text style={styles.buttonText}>Show Image</Text>
            </Pressable>
            )}
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
    }
});