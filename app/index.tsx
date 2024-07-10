import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Session from '@/components/Session';
import Profile from '@/components/Profile';





const Tab = createBottomTabNavigator();

export default function index() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Tab.Screen name="Home" component={Session} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	)
}