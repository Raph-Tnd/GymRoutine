import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "./ProfileStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreatedProgramContext } from "../global/Provider/CreatedProgramProvider";
import { newProgram, validateProgram } from "@/model/ProgramModel";
import APISingleton from "@/services/APISingleton";
import { AuthContext, User } from "../global/Provider/AuthProvider";

type ProgramFormNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;
export default function CreateProgramHeader() {
  const { currentUser } = useContext(AuthContext);
  const { currentCreatedProgram, setCurrentCreatedProgram } = useContext(
    CreatedProgramContext,
  );
  const route = useNavigation<ProgramFormNavigationProp>();
  const onBackPressHandler = () => {
    route.goBack();
  };
  const onSavePressHandler = async () => {
    if (
      currentUser &&
      currentCreatedProgram &&
      validateProgram(currentCreatedProgram)
    ) {
      if (
        await APISingleton.getInstance().postSaveProgram({
          user_id: currentUser.user.email,
          program: currentCreatedProgram,
        })
      ) {
        setCurrentCreatedProgram(newProgram(currentUser.user.email));
        route.navigate("Profile", { reload: true });
      } else {
        console.log("CAN'T HAD PROGRAM");
      }
    } else {
      console.log("NOT VALID");
    }
  };
  return (
    <View style={GlobalStyle.header}>
      <Pressable
        style={GlobalStyle.headerPressable}
        onPress={onBackPressHandler}
      >
        <Text style={GlobalStyle.headerPressableLabel}>Go back</Text>
      </Pressable>
      <Pressable
        style={GlobalStyle.headerPressable}
        onPress={onSavePressHandler}
      >
        <Text style={GlobalStyle.headerPressableLabel}>Save</Text>
      </Pressable>
    </View>
  );
}
