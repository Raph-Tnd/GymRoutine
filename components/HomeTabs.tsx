import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Session from './Session';
import Profile from './Profile';



const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
                <Tab.Screen name="Home" component={Session} />
                <Tab.Screen name="Profile" component={Profile} /> 
        </Tab.Navigator>
    )
}