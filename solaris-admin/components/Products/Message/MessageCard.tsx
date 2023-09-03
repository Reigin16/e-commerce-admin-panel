import { View, Button, Text} from "react-native";
import {darkColors } from "@rneui/themed";


const MessageCard = (props) => {
  
    const done = () => {

        fetch('https://backdoor.onrender.com/contacts/messagestatus', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: props.date,
                email: props.email,
                status: 'Solved',
            })

        }).then(res => res.json())
            .then(msg => {
                props.refresh();
            })

    }
    let d = new Date(props.date)
    console.log(props)
    return (
        
            <View style={{backgroundColor: darkColors.background, borderWidth: 2, borderColor: darkColors.greyOutline, margin: 'auto', maxWidth: 600, marginBottom: 14, marginTop: 14}}>
                <Text style={{color: 'white'}}>{d.toUTCString()}</Text>
                <Text style={{color: 'white'}}>{'Username: '+props.name}</Text>
                <Text style={{color: 'white'}}>{'Email: '+props.email}</Text>
                <Text style={{color: 'white'}}>{'Message: '+props.message}</Text>
                <Text style={{color: 'white'}}>{'Status: '+props.status}</Text>
                <View>
                    {
                        props.status === "Solved" ? (
                            <View></View>
                        ) : (
                            <Button onPress={done} title="Done"/>
                        )
                    }
                
          </View></View>
        
    )
}
export default MessageCard