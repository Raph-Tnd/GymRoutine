import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProgramModel } from "@/model/ProgramModel";
import APISingleton from "@/services/APISingleton";
import ProgramShortDisplay from "../Program/ProgramShortDisplay";
import { FlatList } from "react-native-gesture-handler";
import GlobalStyle from "@/style/global/GlobalStyle";
import NewProgramOption from "./NewProgramOption";
import { ProfileStackParamList } from "./ProfileStack";
import { StackScreenProps } from "@react-navigation/stack";
import Header from "../global/Header/Header";
import { GoogleSignOut } from "@/services/Auth/GoogleSign";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { loadCreatedProgram } from "@/features/program/createdProgramSlice";

interface Props extends StackScreenProps<ProfileStackParamList, "Profile"> {
	// other props ...
}

export default function Profile({ route, navigation }: Props) {
	const [programSaved, setProgramSaved] = useState<ProgramModel[]>([]);
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		let unsubscribed = false;
		const fetchProgram = async () => {
			if (
				(programSaved.length === 0 || route.params?.reload) &&
				user != undefined
			) {
				let fetchedProgram =
					await APISingleton.getInstance().getProgramsSaved({
						user_id: user.user.email,
					});
				if (!unsubscribed) {
					setProgramSaved([...fetchedProgram]);
				}
			}
		};
		fetchProgram();
		return () => {
			unsubscribed = true;
			navigation.setParams({ reload: false });
		};
	}, [route.params?.reload]);
	return (
		<View style={GlobalStyle.body}>
			<Header>
				<>
					<View></View>
					<GoogleSignOut style={GlobalStyle.headerPressable}>
						<Text style={GlobalStyle.headerPressableLabel}>
							Sign out
						</Text>
					</GoogleSignOut>
				</>
			</Header>
			<Text style={GlobalStyle.titleLabel}>Your program</Text>
			<FlatList
				contentContainerStyle={GlobalStyle.listContainer}
				style={GlobalStyle.list}
				data={programSaved}
				renderItem={({ item }) => (
					<ProgramShortDisplay program={item} />
				)}
				ListFooterComponent={<View style={{ paddingBottom: 10 }} />}
			/>
			<NewProgramOption />
		</View>
	);
}
