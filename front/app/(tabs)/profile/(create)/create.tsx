// ProgramForm.tsx
import React, { useContext, useEffect, useState } from "react";
import {
	TextInput,
	ScrollView,
	View,
	AppState,
	Text,
	Pressable,
} from "react-native";
import SessionForm from "../../../../components/profile/ProgramForm/SessionForm";
import { SessionModel, newSession } from "@/model/SessionModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import AddRemoveFormBloc from "../../../../components/profile/ProgramForm/AddRemoveFormBloc";
import { FlatList } from "react-native-gesture-handler";
import CreateProgramHeader from "../../../../components/profile/CreateProgramHeader";
import { Colors } from "@/style/Colors";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setCreatedProgram } from "@/features/program/createdProgramSlice";
import { GlobalAlert } from "@/components/global/GlobalAlert/GlobalAlert";
import GlobalAlertStyle from "@/style/global/GlobalAlert/GlobalAlertStyle";

export default function ProgramForm() {
	const currentCreatedProgram = useSelector(
		(state: RootState) => state.createdProgram,
	);
	const dispatch = useDispatch<AppDispatch>();

	const handleProgramNameChange = (name: string) => {
		if (currentCreatedProgram) {
			let newCreatedProgram = currentCreatedProgram;
			newCreatedProgram.name = name;
			dispatch(setCreatedProgram({ ...newCreatedProgram }));
		}
	};

	const addSession = () => {
		if (currentCreatedProgram) {
			let newCreatedProgram = currentCreatedProgram;
			newCreatedProgram.sessions = [
				...newCreatedProgram.sessions,
				newSession(currentCreatedProgram.sessions.length + 1),
			];
			dispatch(setCreatedProgram({ ...newCreatedProgram }));
		}
	};

	const removeSession = () => {
		if (currentCreatedProgram) {
			let newCreatedProgram = currentCreatedProgram;
			newCreatedProgram.sessions = newCreatedProgram.sessions.splice(
				0,
				newCreatedProgram.sessions.length - 1,
			);
			dispatch(setCreatedProgram({ ...newCreatedProgram }));
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
				style={{ width: "95%" }}
				contentContainerStyle={ProgramFormStyle.body}
				ListHeaderComponent={
					<TextInput
						style={ProgramFormStyle.programLabel}
						value={currentCreatedProgram.name}
						onChangeText={handleProgramNameChange}
						placeholder="Program name"
						placeholderTextColor={Colors.red}
					/>
				}
				scrollEnabled={false}
				data={currentCreatedProgram.sessions}
				renderItem={({ item, index }) => (
					<SessionForm
						key={index}
						session={item}
						index={index}
						onUpdate={(updatedSession) =>
							updateSession(updatedSession, index)
						}
					/>
				)}
				ListFooterComponentStyle={ProgramFormStyle.programFooter}
				ListFooterComponent={
					<AddRemoveFormBloc
						type={"Session"}
						addMethod={addSession}
						removeMethod={removeSession}
						removeActive={currentCreatedProgram.sessions.length > 1}
					/>
				}
			/>
			<GlobalAlert />
		</View>
	);
}

export function FormDelimiter() {
	return <View style={ProgramFormStyle.delimiter} />;
}
