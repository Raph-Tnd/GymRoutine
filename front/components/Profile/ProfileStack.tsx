import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProgramForm from "./ProgramForm/ProgramForm";
import BrowseProgram from "./Browse/BrowseProgram";

export type ProfileStackParamList = {
	Profile: { reload: boolean } | undefined;
	ProgramForm: { update: boolean } | undefined;
	BrowseProgram: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="ProgramForm" component={ProgramForm} />
			<Stack.Screen name="BrowseProgram" component={BrowseProgram} />
		</Stack.Navigator>
	);
}
