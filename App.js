import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Signup from './src/Signup';
import Login from './src/Login'
import { BottomTab } from './src/navigation/BottomTab';
import EditProfile from './src/navigation/EditProfile';
import ChangePassword from './src/navigation/ChangePassword';
import AuthContextProvider from './src/Context/Context';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;