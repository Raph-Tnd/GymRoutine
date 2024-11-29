import { TextInput, View } from "react-native";
import SessionForm from "../../../../components/profile/ProgramForm/SessionForm";
import { SessionModel } from "@/model/SessionModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import AddFormBloc from "../../../../components/profile/ProgramForm/AddFormBloc";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "@/style/Colors";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
	addSession,
	setCreatedProgram,
	updateProgramName,
} from "@/features/program/createdProgramSlice";
import { GlobalAlert } from "@/components/global/GlobalAlert/GlobalAlert";

export default function ProgramForm() {
	const currentCreatedProgram = useSelector(
		(state: RootState) => state.createdProgram,
	);
	const dispatch = useDispatch<AppDispatch>();
	const addNewSession = () => {
		if (currentCreatedProgram) {
			dispatch(addSession());
		}
	};

	const updateSession = (updatedSession: SessionModel, index: number) => {
		if (currentCreatedProgram) {
			let newCreatedProgram = currentCreatedProgram;
			newCreatedProgram.sessions[index] = updatedSession;
			dispatch(setCreatedProgram({ ...newCreatedProgram }));
		}
	};
	return (
		<View style={GlobalStyle.body}>
			<FlatList
				style={ProgramFormStyle.body}
				contentContainerStyle={ProgramFormStyle.bodyContainer}
				ListHeaderComponentStyle={ProgramFormStyle.programHeader}
				ListHeaderComponent={
					<TextInput
						style={ProgramFormStyle.programLabel}
						value={currentCreatedProgram.name}
						onChangeText={(text: string) =>
							dispatch(updateProgramName(text))
						}
						placeholder="Program name"
						placeholderTextColor={Colors.red}
					/>
				}
				data={currentCreatedProgram.sessions}
				renderItem={({ item, index }) => (
					<SessionForm
						key={index}
						session={item}
						sessionIndex={index}
						onUpdate={(updatedSession) =>
							updateSession(updatedSession, index)
						}
					/>
				)}
				ListFooterComponentStyle={ProgramFormStyle.programFooter}
				ListFooterComponent={
					<AddFormBloc type={"Session"} addMethod={addNewSession} />
				}
			/>
			<GlobalAlert />
		</View>
	);
}
