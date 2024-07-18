import { View, Text, Pressable } from "react-native";
import React from "react";
import GlobalStyle from "@/style/global/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "./ProfileStack";
import { StackNavigationProp } from "@react-navigation/stack";

type ProgramFormNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;
export default function CreateProgramHeader() {
  const route = useNavigation<ProgramFormNavigationProp>();
  const onBackPressHandler = () => {
    console.log("test");
    route.navigate("Profile");
  };
  return (
    <View style={GlobalStyle.header}>
      <Pressable
        style={GlobalStyle.headerPressable}
        onPress={onBackPressHandler}
      >
        <Text style={GlobalStyle.headerPressableLabel}>Go back</Text>
      </Pressable>
      <Pressable style={GlobalStyle.headerPressable}>
        <Text style={GlobalStyle.headerPressableLabel}>Save</Text>
      </Pressable>
    </View>
  );
}
