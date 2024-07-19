import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProgramForm from "./ProgramForm/ProgramForm";
import { CreatedProgramProvider } from "../global/Provider/CreatedProgramProvider";

export type ProfileStackParamList = {
  Profile: { reload: boolean } | undefined;
  ProgramForm: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <CreatedProgramProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProgramForm" component={ProgramForm} />
      </Stack.Navigator>
    </CreatedProgramProvider>
  );
}
