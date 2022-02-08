import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Button, Pressable, Text } from "react-native"
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";
import EventCreationForm from "./event-creation-form";
import EventLineItem from "./event-line-item";

export default function EventsPage(){
    const [events, setEvents] =  useState<Activity[]>([]);
    const [showCreate, setShowCreate] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await EventRoutes.getEvents();
            if(response && response.status === 200) {
                setEvents(response.data);
            }
        })();
    },[]);


    return(<View style={styles.container}>

        <FlatList style={{flex:0.9}}
            keyExtractor={item => item.id}
            data={events}
            renderItem={({item}) => (
                <EventLineItem {...item}/>
            )}
        />
        <View style={{flex:0.1}}>
            <Pressable onPress={() => setShowCreate(true)} style={{flex:1, backgroundColor:"#447799", justifyContent:"center"}}>
                <Text style={{textAlign:"center", fontSize:20}}>Create Event</Text>
            </Pressable>
        </View>
        {showCreate && <EventCreationForm setShowCreate={setShowCreate}/>}
        
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedede'
    }

})