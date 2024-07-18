import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProgramForm from "./ProgramForm/ProgramForm";

export type ProfileStackParamList = {
  Profile: undefined;
  ProgramForm: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProgramForm" component={ProgramForm} />
    </Stack.Navigator>
  );
}
