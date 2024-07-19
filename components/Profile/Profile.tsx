import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ProgramModel } from "@/model/ProgramModel";
import APISingleton from "@/services/APISingleton";
import { AuthContext } from "../global/Provider/AuthProvider";
import ProgramShortDisplay from "../Program/ProgramShortDisplay";
import { FlatList } from "react-native-gesture-handler";
import GlobalStyle from "@/style/global/GlobalStyle";
import NewProgramOption from "./NewProgramOption";
import { ProfileStackParamList } from "./ProfileStack";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<ProfileStackParamList, "Profile"> {
  // other props ...
}

export default function Profile({ route, navigation }: Props) {
  const [programSaved, setProgramSaved] = useState<ProgramModel[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let unsubscribed = false;
    const fetchProgram = async () => {
      if (
        (programSaved.length === 0 || route.params?.reload) &&
        currentUser != undefined
      ) {
        let fetchedProgram = await APISingleton.getInstance().getProgramsSaved({
          user_id: currentUser.user.email,
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
      <Text style={GlobalStyle.mainLabel}>Your program</Text>
      <FlatList
        contentContainerStyle={GlobalStyle.listContainer}
        style={GlobalStyle.list}
        data={programSaved}
        renderItem={({ item }) => <ProgramShortDisplay program={item} />}
        ListFooterComponent={<View style={{ paddingBottom: 10 }} />}
      />
      <NewProgramOption />
    </View>
  );
}
