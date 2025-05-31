import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FocusApp from './screens/FocusApp';
import Pomodoro from './screens/Pomodoro';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Focus">
        <Stack.Screen name="Focus" component={FocusApp} />
        <Stack.Screen name="Pomodoro" component={Pomodoro} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}