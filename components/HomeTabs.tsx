import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Session from './Session/Session';
import Profile from './Profile';
import { ProgramProvider } from './global/Provider/ProgramProvider';



const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <ProgramProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen name="Home" component={Session} />
                <Tab.Screen name="Profile" component={Profile} /> 
            </Tab.Navigator>
        </ProgramProvider>
    )
}