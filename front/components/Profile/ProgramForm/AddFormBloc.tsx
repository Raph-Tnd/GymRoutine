import { Text, Pressable } from "react-native";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { Plus } from "lucide-react-native";
import { Colors } from "@/style/Colors";

export default function AddFormBloc({
	type,
	addMethod,
}: {
	type: "Session" | "Exercise" | "Metric";
	addMethod: () => void;
}) {
	return (
		<Pressable style={ProgramFormStyle.addPressable} onPress={addMethod}>
			<Plus color={Colors.text_primary} size={16} />
			<Text style={ProgramFormStyle.addRemoveLabel}>Add {type}</Text>
		</Pressable>
	);
}
