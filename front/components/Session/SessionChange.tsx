import { View, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { ProgramContext } from "../global/Provider/ProgramProvider";
import GlobalStyle from "@/style/global/GlobalStyle";

export default function SessionChange({
	maxSession = 0,
	saveMethod,
}: {
	maxSession?: number;
	saveMethod: () => void;
}) {
	const { currentSessionIndex, setCurrentSessionIndex } =
		useContext(ProgramContext);
	const onSessionChange = (previous: boolean) => {
		saveMethod();
		setCurrentSessionIndex(currentSessionIndex + (previous ? -1 : 1));
	};
	return (
		<>
			{currentSessionIndex > 0 ? (
				<Pressable
					style={GlobalStyle.headerPressable}
					onPress={() => onSessionChange(true)}
				>
					<Text style={GlobalStyle.headerPressableLabel}>
						Previous
					</Text>
				</Pressable>
			) : (
				<View></View>
			)}
			{currentSessionIndex < maxSession ? (
				<Pressable
					style={GlobalStyle.headerPressable}
					onPress={() => onSessionChange(false)}
				>
					<Text style={GlobalStyle.headerPressableLabel}>Next</Text>
				</Pressable>
			) : (
				<View></View>
			)}
		</>
	);
}
