import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "./ProfileStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { newProgram, validateProgram } from "@/model/ProgramModel";
import APISingleton from "@/services/APISingleton";
import { GlobalAlert } from "../global/GlobalAlert/GlobalAlert";
import { useSharedValue } from "react-native-reanimated";
import GlobalAlertStyle from "@/style/global/GlobalAlert/GlobalAlertStyle";
import Header from "../global/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setCreatedProgram } from "@/features/program/createdProgramSlice";

type ProgramFormNavigationProp = StackNavigationProp<
	ProfileStackParamList,
	"Profile"
>;
export default function CreateProgramHeader() {
	const [errorAlertMessage, setErrorAlertMessage] = useState("");
	const user = useSelector((state: RootState) => state.auth.user);
	const currentCreatedProgram = useSelector(
		(state: RootState) => state.createdProgram,
	);
	const dispatch = useDispatch<AppDispatch>();
	const route = useNavigation<ProgramFormNavigationProp>();
	const isGlobalAlertOpen = useSharedValue(false);
	const toggleSheet = () => {
		isGlobalAlertOpen.value = !isGlobalAlertOpen.value;
	};
	const onBackPressHandler = () => {
		route.goBack();
	};
	const onSavePressHandler = async () => {
		if (
			user &&
			currentCreatedProgram &&
			validateProgram(currentCreatedProgram)
		) {
			if (
				await APISingleton.getInstance().postSaveProgram({
					user_id: user.user.email,
					program: currentCreatedProgram,
				})
			) {
				dispatch(setCreatedProgram(newProgram(user.user.email)));
				route.navigate("Profile", { reload: true });
			} else {
				setErrorAlertMessage(
					"You have reached your maximum number of program on this account, remove one or subscribe.",
				);
				toggleSheet();
			}
		} else {
			setErrorAlertMessage(
				"The program isn't valid, colored text has to be modified.",
			);
			toggleSheet();
		}
	};

	return (
		<>
			<Header>
				<>
					<Pressable
						style={GlobalStyle.headerPressable}
						onPress={onBackPressHandler}
					>
						<Text style={GlobalStyle.headerPressableLabel}>
							Go back
						</Text>
					</Pressable>
					<Pressable
						style={GlobalStyle.headerPressable}
						onPress={onSavePressHandler}
					>
						<Text style={GlobalStyle.headerPressableLabel}>
							Save
						</Text>
					</Pressable>
				</>
			</Header>
			<GlobalAlert isOpen={isGlobalAlertOpen} toggleSheet={toggleSheet}>
				<SaveProgramErrorDisplay
					text={errorAlertMessage}
					toggleSheet={toggleSheet}
				/>
			</GlobalAlert>
		</>
	);
}

function SaveProgramErrorDisplay({
	text,
	toggleSheet,
}: {
	text: string;
	toggleSheet: () => void;
}) {
	const [isPressing, setIsPressing] = useState(false);
	return (
		<>
			<Text style={GlobalAlertStyle.information}>{text}</Text>
			<Pressable
				style={[
					GlobalAlertStyle.pressable,
					isPressing ? GlobalAlertStyle.pressablePressing : null,
				]}
				onPressIn={() => setIsPressing(true)}
				onPressOut={() => {
					setIsPressing(false);
					toggleSheet();
				}}
			>
				<Text style={GlobalStyle.pressableMainLabel}>Ok</Text>
			</Pressable>
		</>
	);
}
