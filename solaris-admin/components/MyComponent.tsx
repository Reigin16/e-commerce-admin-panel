import React, { useState } from "react";
import { View } from "react-native";
import { darkColors, lightColors } from "@rneui/themed";
import { makeStyles, Button, useThemeMode, Input, useTheme, } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Products from "./Products/Products";
import AddProduct from './Products/AddProduct'
import * as SecureStore from 'expo-secure-store'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import Message from "./Products/Message/Message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Orders from "./Orders/Orders";
const AuthContext = React.createContext()
const Tab = createBottomTabNavigator()

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
const Login = ({ navigation }) => {
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
      <div style={{ padding: '20px', margin: 'auto', }}>
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
        <Button title="Sign in" onPress={() => signIn({ username, password })} />
      </div>
    </View>
  )
}
  

const SignOut = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Button onPress={signOut}>Sign Out</Button>
  )
}


export default function App({ navigation }) {
  const styles = useStyles();
  const [userToken, setUserToken] = React.useState(localStorage.getItem('userToken'))
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
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
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

        }).then((user: any) => {
          if (user.ok) {
            localStorage.setItem('userToken', 'some-value')
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' }); }
        })

      },
      signOut: () =>  {
        localStorage.removeItem('userToken')
        SecureStore.deleteItemAsync('userToken')
        window.location.reload();
      dispatch({ type: 'SIGN_OUT' })
      }
    }),
    []
  );



  const Stack = createNativeStackNavigator()

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer  theme={myTheme}>

        {userToken == null ? (<Stack.Navigator>
          <Stack.Screen name="Log In" component={Login} /></Stack.Navigator>
        ) : (
          <Tab.Navigator backBehavior="order" sceneContainerStyle={{display: 'flex', flex: 1}}>

            <Tab.Screen name='Products' component={Products} options={{
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
            <Tab.Screen name="Message" component={Message} options={{
        
          headerRight: () => (
           <SignOut />
          ),
        }} />
        <Tab.Screen name="Add Product" component={AddProduct} options={{
        
        headerRight: () => (
         <SignOut />
        ),
      }} />
      <Tab.Screen name="Orders" component={Orders} options={{
        
        headerRight: () => (
         <SignOut />
        ),
      }} />
          </Tab.Navigator>
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
