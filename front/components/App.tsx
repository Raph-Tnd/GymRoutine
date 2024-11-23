import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login/Login";
import HomeTabs from "./HomeTabs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Stack = createStackNavigator();

export default function App() {
	const user = useSelector((state: RootState) => state.auth.user);
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user != undefined ? (
				<Stack.Screen name="HomeTabs" component={HomeTabs} />
			) : (
				<Stack.Screen name="Login" component={Login} />
			)}
		</Stack.Navigator>
	);
}
