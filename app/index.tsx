import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Session from '@/components/Session';
import Profile from '@/components/Profile';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import indexStyle from '@/style/indexStyle';





const Tab = createBottomTabNavigator();

export default function index() {
	const [fontsLoaded, fontsError] = useFonts(
		{
			'WorkSans' : require('@/assets/fonts/WorkSans.ttf')
		}
	)
	return (
		<GestureHandlerRootView>
			<View style={indexStyle.body}>
				<Tab.Navigator
					screenOptions={{
						headerShown: false
					}}>
					<Tab.Screen name="Home" component={Session} />
					<Tab.Screen name="Profile" component={Profile} />
				</Tab.Navigator>
			</View>
		</GestureHandlerRootView>
	)
}