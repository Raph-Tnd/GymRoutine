import { View, TextInput, Pressable } from "react-native";
import { SessionModel } from "@/model/SessionModel";
import { ExerciseModel } from "@/model/ExerciseModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { FlatList } from "react-native-gesture-handler";
import ExerciseForm from "./ExerciseForm";
import AddFormBloc from "./AddFormBloc";
import { Colors } from "@/style/Colors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
	addExercise,
	removeSession,
	updateSessionName,
} from "@/features/program/createdProgramSlice";
import { Trash2 } from "lucide-react-native";

export default function SessionForm({
	session,
	sessionIndex,
	onUpdate,
}: {
	session: SessionModel;
	sessionIndex: number;
	onUpdate: (updatedSession: SessionModel) => void;
}) {
	const dispatch = useDispatch<AppDispatch>();
	const updateCurrentSessionName = (name: string) => {
		dispatch(updateSessionName({ name: name, sessionIndex: sessionIndex }));
	};
	const removeCurrentSession = () => {
		dispatch(removeSession(sessionIndex));
	};
	const addNewExercise = () => {
		dispatch(addExercise(sessionIndex));
	};
	return (
		<View style={ProgramFormStyle.sessionContainer}>
			<FlatList
				style={ProgramFormStyle.session}
				contentContainerStyle={ProgramFormStyle.exercisesContainer}
				ListHeaderComponent={
					<View style={ProgramFormStyle.sessionHeader}>
						<TextInput
							style={ProgramFormStyle.sessionLabel}
							value={session.name}
							onChangeText={updateCurrentSessionName}
							placeholder={`Session ${sessionIndex + 1}`}
							selectTextOnFocus={true}
							selectionColor={Colors.border_color}
						/>
						<Pressable
							style={ProgramFormStyle.sessionRemove}
							onPress={removeCurrentSession}
						>
							<Trash2 size={16} color={Colors.text_secondary} />
						</Pressable>
					</View>
				}
				data={session.exercises}
				renderItem={({ item, index }) => (
					<ExerciseForm
						key={index}
						exercise={item}
						sessionIndex={sessionIndex}
						exerciseIndex={index}
					/>
				)}
				ListFooterComponentStyle={ProgramFormStyle.sessionFooter}
				ListFooterComponent={
					<AddFormBloc type={"Exercise"} addMethod={addNewExercise} />
				}
			/>
		</View>
	);
}
