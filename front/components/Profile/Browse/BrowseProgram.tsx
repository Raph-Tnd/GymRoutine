import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CreateProgramHeader from "../CreateProgramHeader";
import GlobalStyle from "@/style/global/GlobalStyle";
import { FlatList, TextInput } from "react-native-gesture-handler";
import BrowseProgramStyle from "@/style/Profile/Browse/BrowseProgramStyle";
import { ProgramModel } from "@/model/ProgramModel";
import ProgramShortDisplay from "@/components/Program/ProgramShortDisplay";
import APISingleton from "@/services/APISingleton";
import { AuthContext } from "@/components/global/Provider/AuthProvider";

export default function BrowseProgram() {
  const { currentUser } = useContext(AuthContext);
  const [foundProgram, setFoundProgram] = useState<ProgramModel[]>();
  const onSearchHandler = async (text: string) => {
    if (currentUser) {
      let searchResponse = await APISingleton.getInstance().getSearchedPrograms(
        { user_id: currentUser.user.email, research: text },
      );
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
      <CreateProgramHeader />
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
        renderItem={({ item }) => <ProgramShortDisplay program={item} />}
      />
    </View>
  );
}
