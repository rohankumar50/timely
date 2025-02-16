import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { SCREENS } from '../../constants';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';


const Stack = createStackNavigator();

const Navigation = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Stack.Screen name={SCREENS.HISTORY} component={HistoryScreen} />
      </Stack.Navigator>
    );
  };

  export default Navigation;