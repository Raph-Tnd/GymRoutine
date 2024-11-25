import { AppDispatch, RootState } from "@/app/store";
import { GlobalAlert } from "@/components/global/GlobalAlert/GlobalAlert";
import { setAlertMessage } from "@/features/alert/globalAlertSlice";
import { setCreatedProgram } from "@/features/program/createdProgramSlice";
import { newProgram, validateProgram } from "@/model/ProgramModel";
import APISingleton from "@/services/APISingleton";
import { Colors } from "@/style/Colors";
import GlobalAlertStyle from "@/style/global/GlobalAlert/GlobalAlertStyle";
import GlobalStyle from "@/style/global/GlobalStyle";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";

export type ProfileStackParamList = {
	Profile: { reload: boolean } | undefined;
	ProgramForm: { update: boolean } | undefined;
	BrowseProgram: undefined;
};

export default function ProfileStack() {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);
	const currentCreatedProgram = useSelector(
		(state: RootState) => state.createdProgram,
	);
	const dispatch = useDispatch<AppDispatch>();
	const onBackPressHandler = () => {
		router.back();
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
				router.navigate("/profile");
			} else {
				dispatch(
					setAlertMessage(
						"You have reached your maximum number of program on this account, remove one or subscribe.",
					),
				);
			}
		} else {
			dispatch(
				setAlertMessage(
					"The program isn't valid, colored text has to be modified.",
				),
			);
		}
	};
	return (
		<>
			<Stack
				screenOptions={{
					headerTitle: "",
					headerStyle: {
						backgroundColor: Colors.bg_gradient_from,
					},
					headerShadowVisible: false,
				}}
				initialRouteName="index"
			>
				<Stack.Screen name="index" />
				<Stack.Screen
					name="(create)/create"
					options={{
						headerRight: () => (
							<Pressable
								style={GlobalStyle.headerPressable}
								onPress={onSavePressHandler}
							>
								<Text style={GlobalStyle.headerPressableLabel}>
									Save
								</Text>
							</Pressable>
						),
					}}
				/>
				<Stack.Screen name="(browse)/browse" />
			</Stack>
		</>
	);
}
