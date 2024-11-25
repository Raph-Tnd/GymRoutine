import { Stack } from "expo-router";

export type ProfileStackParamList = {
	Profile: { reload: boolean } | undefined;
	ProgramForm: { update: boolean } | undefined;
	BrowseProgram: undefined;
};

export default function ProfileStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="index"
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(create)/create" />
			<Stack.Screen name="(browse)/browse" />
		</Stack>
	);
}
