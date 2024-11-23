import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import ProgramShortDisplayStyle from "@/style/Program/ProgramShortDisplayStyle";
import { Colors } from "@/style/Colors";
import { ProgramModel } from "@/model/ProgramModel";
import { ProgramContext } from "../global/Provider/ProgramProvider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../Profile/ProfileStack";
import APISingleton from "@/services/APISingleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setCreatedProgram } from "@/features/program/createdProgramSlice";

type ProgramFormNavigationProp = StackNavigationProp<
	ProfileStackParamList,
	"ProgramForm"
>;

export default function ProgramExpandedDisplay({
	program,
}: {
	program: ProgramModel;
}) {
	const user = useSelector((state: RootState) => state.auth.user);
	const navigation = useNavigation<ProgramFormNavigationProp>();
	const { setCurrentProgram } = useContext(ProgramContext);
	const dispatch = useDispatch<AppDispatch>();

	const onSelectPressHandler = () => {
		setCurrentProgram(program);
	};
	const onUpdatePressHandler = () => {
		dispatch(setCreatedProgram(program));
		navigation.navigate("ProgramForm", { update: true });
	};
	const onDeletePressHandler = () => {
		if (user) {
			APISingleton.getInstance().deleteSavedProgram({
				user_id: user.user.email,
				program: program,
			});
			navigation.navigate("Profile", { reload: true });
		}
	};
	return (
		<View style={ProgramShortDisplayStyle.expandedDisplay}>
			<Pressable
				style={[
					ProgramShortDisplayStyle.selectPressable,
					{ backgroundColor: Colors.green },
				]}
				onPress={onSelectPressHandler}
			>
				<Text style={ProgramShortDisplayStyle.selectPressableLabel}>
					Select
				</Text>
			</Pressable>
			<Pressable
				style={ProgramShortDisplayStyle.selectPressable}
				onPress={onUpdatePressHandler}
			>
				<Text style={ProgramShortDisplayStyle.selectPressableLabel}>
					Update
				</Text>
			</Pressable>
			<Pressable
				style={[
					ProgramShortDisplayStyle.selectPressable,
					{ backgroundColor: Colors.red },
				]}
				onPress={onDeletePressHandler}
			>
				<Text style={ProgramShortDisplayStyle.selectPressableLabel}>
					Delete
				</Text>
			</Pressable>
		</View>
	);
}
