import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import DatePicker from 'react-native-modal-datetime-picker'

export default function EventCreationForm(props:{setShowCreate:Function}) {

    const {setShowCreate} = props;

    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [startTime, setStartTime] = useState<number>();
    const [endTime, setEndTime] = useState<number>();
    const [location, setLocation] = useState<string>("");
    const [openStartPicker, setOpenStartPicker] = useState<boolean>(false);
    const [openEndPicker, setOpenEndPicker] = useState<boolean>(false);

    return(<View style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"#dedede"}}>
        <View style={{flex:1}}>
            <TextInput placeholder="Title" onChangeText={(text) => setTitle(text)}/>
            <TextInput placeholder="Location" onChangeText={(text) => setLocation(text)}/>
            <TextInput style={{flex:1}} multiline placeholder="Desc" onChangeText={(text) => setDesc(text)}/>
            <Pressable onPress={()=> setOpenStartPicker(true)}>
                <Text>Choose Start Time</Text>
            </Pressable>
            <Text>{Boolean(startTime) && new Date(startTime ?? 0).toLocaleString()}</Text>
            <Pressable onPress={() => setOpenEndPicker(true)}>
                <Text>Choose End Time</Text>
            </Pressable>
            <Text>{Boolean(endTime) && new Date(endTime ?? 0).toLocaleString()}</Text>
            <View >
                <Button title="Cancel" onPress={() => setShowCreate(false)}/>
                <Button title="Submit" onPress={() => setShowCreate(false)}/>
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