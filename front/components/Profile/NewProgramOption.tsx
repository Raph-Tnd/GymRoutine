import { View, Pressable, Text } from "react-native";
import React from "react";
import NewProgramOptionStyle from "@/style/Profile/NewProgramOptionStyle";
import { useRouter } from "expo-router";

export default function NewProgramOption() {
	const router = useRouter();
	const onCreatePressHandler = () => {
		router.replace("/(tabs)/profile/(create)/create");
	};
	const onBrowsePressHandler = () => {
		router.replace("/(tabs)/profile/(browse)/browse");
	};
	return (
		<View style={NewProgramOptionStyle.body}>
			<Pressable
				style={NewProgramOptionStyle.pressable}
				onPress={onCreatePressHandler}
			>
				<Text style={NewProgramOptionStyle.pressableLabel}>
					Create program
				</Text>
			</Pressable>
			<Pressable
				style={NewProgramOptionStyle.pressable}
				onPress={onBrowsePressHandler}
			>
				<Text style={NewProgramOptionStyle.pressableLabel}>
					Browse programs
				</Text>
			</Pressable>
		</View>
	);
}
