import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CreateProgramHeader from "../../../../components/profile/CreateProgramHeader";
import GlobalStyle from "@/style/global/GlobalStyle";
import { FlatList, TextInput } from "react-native-gesture-handler";
import BrowseProgramStyle from "@/style/Profile/Browse/BrowseProgramStyle";
import { ProgramModel } from "@/model/ProgramModel";
import ProgramShortDisplay from "@/components/program/ProgramShortDisplay";
import APISingleton from "@/services/APISingleton";
import Header from "@/components/global/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "expo-router";

export default function BrowseProgram() {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);
	const [foundProgram, setFoundProgram] = useState<ProgramModel[]>();
	const onBackPressHandler = () => {
		router.back();
	};
	const onSearchHandler = async (text: string) => {
		if (user) {
			let searchResponse =
				await APISingleton.getInstance().getSearchedPrograms({
					user_id: user.user.email,
					query: text,
				});
			setFoundProgram(searchResponse);
		}
	};

	useEffect(() => {
		if (foundProgram == undefined) {
			onSearchHandler("");
		}
	}, []);
	return (
		<View style={GlobalStyle.body}>
			<Header>
				<Pressable
					style={GlobalStyle.headerPressable}
					onPress={onBackPressHandler}
				>
					<Text style={GlobalStyle.headerPressableLabel}>
						Go back
					</Text>
				</Pressable>
			</Header>
			<TextInput
				style={BrowseProgramStyle.searchBar}
				onChangeText={onSearchHandler}
				placeholder="Program name, author..."
				placeholderTextColor={"rgba(0,0,0,0.5"}
				selectTextOnFocus={true}
			></TextInput>
			<FlatList
				contentContainerStyle={GlobalStyle.listContainer}
				style={GlobalStyle.list}
				data={foundProgram}
				renderItem={({ item }) => (
					<ProgramShortDisplay program={item} />
				)}
			/>
		</View>
	);
}
