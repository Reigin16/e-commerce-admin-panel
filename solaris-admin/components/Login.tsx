import {View} from 'react-native'
import { Button, Text, Input, useTheme } from '@rneui/themed'
import { useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = (props) => {
    const {theme} = useTheme()
    const [userName, setUserName]= useState()
    const [password, setPassword] = useState()
   const  onEnter = (event) => {
        if (event.key === "Enter") {
            onsubmit();
        }
    }
   const onUserNameChange = (event) => {
       setUserName(event.target.value)
    }
   const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
      const  onsubmit = () => {

            if (password && userName) {
                fetch('https://backdoor.onrender.com/users/adminLogin', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userName: userName,
                        password: password,
                    })
    
                }).then(res => res.json())
                    .then(user => {
                        if (String(user).includes('worng credentials') || String(user).includes('errorTypeError')) {
                            alert("Invalid user name or password")
                        }
                        if (user.userName) {
                            AsyncStorage.setItem('admin', user.userName)
                            props.setRoute('products')
                        }
                    })
            } else {
                alert("Please fill in all the required fields.")
            }
        }
    return (
        <View style={{backgroundColor: theme.colors.background}}>
        <div id ='form-container'>
        <form>
            <Input placeholder='Username' onKeyPress={onEnter} onChange={onUserNameChange} value={userName}/>
            <Input placeholder='Password' onKeyPress={onEnter} onChange={onPasswordChange} value={password}/>
            <Button onPress={onsubmit}>Submit</Button>
        </form>
        </div>
        </View>
    )
}

