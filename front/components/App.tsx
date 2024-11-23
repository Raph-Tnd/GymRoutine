import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./global/Provider/AuthProvider";
import Login from "./Login/Login";
import HomeTabs from "./HomeTabs";

const Stack = createStackNavigator();

export default function App() {
	const { currentUser } = useContext(AuthContext);
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{currentUser != undefined ? (
				<Stack.Screen name="HomeTabs" component={HomeTabs} />
			) : (
				<Stack.Screen name="Login" component={Login} />
			)}
		</Stack.Navigator>
	);
}
