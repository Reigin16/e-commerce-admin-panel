import React, { useState } from "react";
import { View } from "react-native";
import { darkColors, useTheme } from "@rneui/themed";
import { makeStyles, Button, useThemeMode, Input } from "@rneui/themed";

import Products from "./Products/Products";
import AddProduct from './Products/AddProduct'
import * as SecureStore from 'expo-secure-store'
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import Message from "./Products/Message/Message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Orders from "./Orders/Orders";
const AuthContext = React.createContext()


const myTheme = {
  dark: true,
  colors: {
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.white,
    text: darkColors.black,
    border: darkColors.greyOutline,
    notification: darkColors.error,

  }  
}
const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { mode, setMode } = useThemeMode()
  // const handleOnPress = () => {
  //   setMode(mode === "dark" ? "light" : "dark");
  //   localStorage.setItem('theme', mode)
  // };
  // React.useEffect(() => {
  //   // Use `setOptions` to update the button that we previously specified
  //   // Now the button includes an `onPress` handler to update the count
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button onPress={handleOnPress} title="Switch" />
  //     ),
  //   });
  // }, [navigation]);


  const { signIn } = React.useContext(AuthContext);

  return (

    <View style={{ backgroundColor: darkColors.background, height: '100%' }}>
      <View style={{ padding: 20, margin: 'auto', }}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => 
        { console.log(username + " " + password)
        signIn({ username, password })}} />
      </View>
    </View>
  )
}
  

const SignOut = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Button onPress={signOut}>Sign Out</Button>
  )
}


export default function App( ) { 
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
    
        let userToken;
      try {
       userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
       console.log(e)
      }

      console.log(userToken)
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        fetch('https://backdoor.onrender.com/users/adminLogin', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            data
          )

        }).then(response => response.json()).then((user: any) => {
          if (user !== 'incorrect form submission') {
            const generateRandomString = (lenth) => {
              const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
              const random = Array.from(
                  {length: lenth},
                  () => char[Math.floor(Math.random() * char.length)]
              );
              const randomString = random.join("");
              return randomString;
          }
           let test = generateRandomString(8)
           console.log(test)
            dispatch({ type: 'SIGN_IN', token: test }); }
        })

      },
      signOut: () =>  {
       
        SecureStore.deleteItemAsync('userToken')
      dispatch({ type: 'SIGN_OUT' })
      }
    }),
    []
  );



  const Stack = createBottomTabNavigator()

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={DarkTheme}>

        {state.userToken == null ? (<Stack.Navigator>
          <Stack.Screen name="Log In" component={Login} /></Stack.Navigator>
        ) : (
          <Stack.Navigator backBehavior="order" sceneContainerStyle={{display: 'flex', flex: 1}}>

            <Stack.Screen name='Products' component={Products} options={{
              tabBarActiveTintColor: darkColors.primary,
              tabBarInactiveTintColor: darkColors.grey5,
              headerLeft: (props) => {
              
              },
          headerRight: () => (
            <>
             
            
           <SignOut />
           </>
          ),
        }} />
            <Stack.Screen name="Message" component={Message} options={{
        
          headerRight: () => (
           <SignOut />
          ),
        }} />
        <Stack.Screen name="Add Product" component={AddProduct} options={{
        
        headerRight: () => (
         <SignOut />
        ),
      }} />
      <Stack.Screen name="Orders" component={Orders} options={{
        
        headerRight: () => (
         <SignOut />
        ),
      }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
}));
