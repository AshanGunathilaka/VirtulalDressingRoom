// App.js
import 'react-native-gesture-handler'; // Import at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import AddressScreen from './Screens/AddressScreen';
import DeliveryScreen from './Screens/Delivery/delivery';
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider placement='top' offsetTop={100} animationType='zoom-in'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Delivery" component={DeliveryScreen} />

        </Stack.Navigator>
      </NavigationContainer>    
    </ToastProvider>
  );
}
