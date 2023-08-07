import { View } from "react-native";
import { Text, Button, Card, useTheme, darkColors } from "@rneui/themed";

const MessageCard = (props: any) => {
    const { theme } = useTheme()
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
    return (
        
            <Card containerStyle={{backgroundColor: darkColors.background, borderColor: darkColors.greyOutline, margin: 'auto', maxWidth: '600px', marginBottom: '14px', marginTop: '14px'}}>
                <Text style={{color: 'white'}}>Date: {d.toUTCString()}</Text>
                <Text style={{color: 'white'}}>Name: {props.name}</Text>
                <Text style={{color: 'white'}}>Email: {props.email}</Text>
                <Text style={{color: 'white'}}>Message: {props.message}</Text>
                <Text style={{color: 'white'}}>Status: {props.status}</Text>
                <div>
                    {
                        props.status === "Solved" ? (
                            <div></div>
                        ) : (
                            <Button size='sm' onPress={done}>Done</Button>
                        )
                    }
                
           </div> </Card>
        
    )
}
export default MessageCard