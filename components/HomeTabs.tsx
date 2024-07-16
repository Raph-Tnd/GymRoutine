import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Session from './Session/Session';
import { ProgramProvider } from './global/Provider/ProgramProvider';
import ProfileStack from './Profile/ProfileStack';



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
                <Tab.Screen name="Profile" component={ProfileStack} /> 
            </Tab.Navigator>
        </ProgramProvider>
    )
}