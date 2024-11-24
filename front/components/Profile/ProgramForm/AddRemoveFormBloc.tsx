import { View, Text, Pressable } from "react-native";
import React from "react";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { Plus } from "lucide-react-native";
import { Colors } from "@/style/Colors";
import GlobalStyle from "@/style/global/GlobalStyle";

export default function AddRemoveFormBloc({
	type,
	addMethod,
	removeMethod,
	removeActive,
}: {
	type: "Session" | "Exercise" | "Metric";
	addMethod: () => void;
	removeMethod: () => void;
	removeActive: boolean;
}) {
	const colors = () => {
		switch (type) {
			case "Session":
				return ProgramFormStyle.addRemovePressableSession;
			case "Exercise":
				return ProgramFormStyle.addRemovePressableExercise;
			case "Metric":
				return ProgramFormStyle.addRemovePressableMetric;
		}
	};
	return (
		<View style={ProgramFormStyle.addRemovePressableContainer}>
			{removeActive && (
				<Pressable
					style={[ProgramFormStyle.addRemovePressable, colors()]}
					onPress={removeMethod}
				>
					<Text style={ProgramFormStyle.addRemoveLabel}>-</Text>
				</Pressable>
			)}
			<Pressable
				style={[ProgramFormStyle.addRemovePressable, colors()]}
				onPress={addMethod}
			>
				<Plus color={Colors.text_primary} />
				<Text style={ProgramFormStyle.addRemoveLabel}>Add {type}</Text>
			</Pressable>
		</View>
	);
}
