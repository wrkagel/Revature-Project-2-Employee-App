import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Pressable, Text } from "react-native"
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";
import EventCreationForm from "./event-creation-form";
import EventLineItem from "./event-line-item";

export default function EventsPage(){
    const [events, setEvents] =  useState<Activity[]>([]);
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [run, setRun] = useState<{}>();

    useEffect(() => {
        (async () => {
            const response = await EventRoutes.getEvents();
            if(response && response.status === 200) {
                response.data.sort((a,b)=>{
                    return a.startTime - b.startTime;
                })
                setEvents(response.data);
            }
        })();
        setRefreshing(false);
    },[run]);

    function refresh() {
        setRefreshing(true);
        setRun({...run});
    }

    return(<View style={styles.container}>

        <FlatList style={{flex:0.9}}
            refreshing={refreshing}
            onRefresh={refresh}
            keyExtractor={item => item.id}
            data={events}
            renderItem={({item, index}) => (
                <EventLineItem {...item} events={events} setEvents={setEvents} index={index}/>
            )}
        />
        <View style={{flex:0.1}}>
            <Pressable onPress={() => setShowCreate(true)} style={styles.createButton}>
                <Text style={styles.createText}>Create Event</Text>
            </Pressable>
        </View>
        {showCreate && <EventCreationForm 
            setShowCreate={setShowCreate} 
            events={events} 
            setEvents={setEvents}
        />}
        
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    createButton:{flex:1, 
        backgroundColor:"#447799", 
        justifyContent:"center"
    },
    createText:{
        textAlign:"center",
        fontSize:20,
        color:"white",
    },

})