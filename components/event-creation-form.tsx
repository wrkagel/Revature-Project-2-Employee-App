import { useEffect, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import DatePicker from 'react-native-modal-datetime-picker'
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";

export default function EventCreationForm(props:{setShowCreate:Function, events:Activity[], setEvents:Function}) {

    const {setShowCreate, events, setEvents} = props;

    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [startTime, setStartTime] = useState<number>();
    const [endTime, setEndTime] = useState<number>();
    const [location, setLocation] = useState<string>("");
    const [openStartPicker, setOpenStartPicker] = useState<boolean>(false);
    const [openEndPicker, setOpenEndPicker] = useState<boolean>(false);
    const [submit, setSubmit] = useState<{}>();

    useEffect(() => {
        if(!submit) {
            return;
        }
        if(!title || !desc || !location || !startTime || !endTime) {
            alert('All fields must be filled to create an event.');
            return;
        }
        const controller = new AbortController();
        let success = false;
        (async () => {
            const response = await EventRoutes.createEvent(
                {id:"", title, desc, location, startTime, endTime, status:"On Schedule"},
                controller);
            success = true;
            if(response && response.status === 201 ) {
                alert('Event created successfully');
                events.push(response.data);
                setEvents([...events]);
                setShowCreate(false);
            } else {
                alert('There was an issue communicating with the server.\nPlease reload the events page to see if it was created.');
                setShowCreate(false);
            }
        })();
        return () => {
            if(!success) {
                controller.abort();
            }
        }
    }, [submit])

    return(<View style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"#dedede"}}>
        <View style={{flex:1}}>
            <TextInput placeholder="Title" onChangeText={(text) => setTitle(text)}/>
            <TextInput placeholder="Location" onChangeText={(text) => setLocation(text)}/>
            <TextInput style={{flex:1}} multiline placeholder="Description" onChangeText={(text) => setDesc(text)}/>
            <Pressable onPress={()=> setOpenStartPicker(true)} style={{backgroundColor:"lightblue"}} >
                <Text>Choose Start Time</Text>
            </Pressable>
            <Text>{Boolean(startTime) && new Date(startTime ?? 0).toLocaleString()}</Text>
            <Pressable onPress={() => setOpenEndPicker(true)} style={{backgroundColor:"lightblue"}}>
                <Text>Choose End Time</Text>
            </Pressable>
            <Text>{Boolean(endTime) && new Date(endTime ?? 0).toLocaleString()}</Text>
            <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
                <Button title="Cancel" onPress={() => setShowCreate(false)}/>
                <Button title="Submit" onPress={() => setSubmit({...submit})}/>
            </View>
        </View>
        <DatePicker
            date={new Date(startTime ?? Date.now())}
            isVisible={openStartPicker}
            mode="datetime"
            onConfirm={(date) => {
                setStartTime(date.valueOf());
                setOpenStartPicker(false);
            }}
            onCancel={() => setOpenStartPicker(false)}
        />
        <DatePicker 
            date={new Date(startTime ?? Date.now())}
            isVisible={openEndPicker}
            mode="datetime"
            onConfirm={(date) => {
                setEndTime(date.valueOf());
                setOpenEndPicker(false);
            }}
            onCancel={() => setOpenEndPicker(false)}
        />
    </View>)
}