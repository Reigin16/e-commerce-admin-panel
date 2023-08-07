import { View } from "react-native";
import { Text, Button, darkColors } from "@rneui/themed";
import { useState, useEffect } from "react";
import MessageCard from "./MessageCard";
const Message = () => {
    const [message, setMessage] = useState([])
    let controller = new AbortController()
    useEffect(() => {
        fetch('https://backdoor.onrender.com/contacts/messages', {
            signal: controller.signal
        })
        .then(response => response.json())
        .then(items => setMessage(items));
        
        return () => {
            controller.abort()
        }
    })
    const refresh = () => {
        fetch('https://backdoor.onrender.com/contacts/messages')
            .then(response => response.json())
            .then(items => setMessage(items));

    }

    return (
        <div style={{backgroundColor: darkColors.background}}>
            <div>
                <div>

                    {message ? (
                        message.map((msg) => {
                            return (
                                <MessageCard
                                    key={msg.date}
                                    date={msg.date}
                                    message={msg.message}
                                    status={msg.status}
                                    email={msg.email}
                                    name={msg.name}
                                    refresh={refresh}
                                />)

                        })
                    ) : (
                            <div></div>
                        )

                    }
                </div>


            </div>

        </div>
    )
}

export default Message