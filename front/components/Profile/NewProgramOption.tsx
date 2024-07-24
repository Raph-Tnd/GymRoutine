import { View, Pressable, Text } from "react-native";
import React from "react";
import NewProgramOptionStyle from "@/style/Profile/NewProgramOptionStyle";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "./ProfileStack";
import { StackNavigationProp } from "@react-navigation/stack";

type ProgramFormNavigationProp = StackNavigationProp<
	ProfileStackParamList,
	"ProgramForm"
>;

export default function NewProgramOption() {
	const route = useNavigation<ProgramFormNavigationProp>();
	const onCreatePressHandler = () => {
		route.navigate("ProgramForm");
	};
	const onBrowsePressHandler = () => {
		route.navigate("BrowseProgram");
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
