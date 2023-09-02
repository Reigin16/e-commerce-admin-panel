import { View , Text} from 'react-native';
import {  Button, darkColors } from '@rneui/themed';
import { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import { SafeAreaView, ScrollView } from "react-native";
const Message = () => {
  const [message, setMessage] = useState([]);
      useEffect(() => {
        fetch('https://backdoor.onrender.com/contacts/messages')
            .then(response => response.json())
            .then(items => setMessage(items)).catch(e => console.log(e));
            return () => {
              
            }
      })
    const refresh = () => {
        fetch('https://backdoor.onrender.com/contacts/messages')
            .then(response => response.json())
            .then(items => setMessage(items)).catch(e => console.log(e));
    }
  return (
     <SafeAreaView style={{flex: 1}}>
        <ScrollView scrollEnabled={true}>
    <View style={{ backgroundColor: darkColors.background }}>
      <View>
        <View>
          {message.length > 0 ? 
            message.map((msg: any) => {
              return (
                <MessageCard
                  key={msg?.name}
                  date={msg?.date}
                  message={msg?.message}
                  status={msg?.status}
                  email={msg?.email}
                  name={msg?.name}
                  refresh={refresh}
                />
              );
            })
           : null}
        </View>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Message;
