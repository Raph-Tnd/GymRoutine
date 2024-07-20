import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProgramForm from "./ProgramForm/ProgramForm";
import { CreatedProgramProvider } from "../global/Provider/CreatedProgramProvider";
import { NavigationContainer } from "@react-navigation/native";

export type ProfileStackParamList = {
  Profile: { reload: boolean } | undefined;
  ProgramForm: { update: boolean } | undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <CreatedProgramProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProgramForm" component={ProgramForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </CreatedProgramProvider>
  );
}
