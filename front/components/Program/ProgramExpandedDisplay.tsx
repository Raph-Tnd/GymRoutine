import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import ExerciseExpandedStyle from "@/style/Session/ExerciseDisplay/ExerciseExpandedStyle";
import ProgramShortDisplayStyle from "@/style/Program/ProgramShortDisplayStyle";
import { Colors } from "@/style/Colors";
import { ProgramModel } from "@/model/ProgramModel";
import { ProgramContext } from "../global/Provider/ProgramProvider";
import { CreatedProgramContext } from "../global/Provider/CreatedProgramProvider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../Profile/ProfileStack";
import APISingleton from "@/services/APISingleton";
import { AuthContext } from "../global/Provider/AuthProvider";

type ProgramFormNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ProgramForm"
>;

export default function ProgramExpandedDisplay({
  program,
}: {
  program: ProgramModel;
}) {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation<ProgramFormNavigationProp>();
  const { setCurrentProgram } = useContext(ProgramContext);
  const { setCurrentCreatedProgram } = useContext(CreatedProgramContext);
  const onSelectPressHandler = () => {
    setCurrentProgram(program);
  };
  const onUpdatePressHandler = () => {
    setCurrentCreatedProgram(program);
    navigation.navigate("ProgramForm", { update: true });
  };
  const onDeletePressHandler = () => {
    if (currentUser) {
      APISingleton.getInstance().deleteSavedProgram({
        user_id: currentUser.user.email,
        program: program,
      });
      navigation.navigate("Profile", { reload: true });
    }
  };
  return (
    <View style={ProgramShortDisplayStyle.expandedDisplay}>
      <Pressable
        style={[
          ProgramShortDisplayStyle.selectPressable,
          { backgroundColor: Colors.green },
        ]}
        onPress={onSelectPressHandler}
      >
        <Text style={ProgramShortDisplayStyle.selectPressableLabel}>
          Select
        </Text>
      </Pressable>
      <Pressable
        style={ProgramShortDisplayStyle.selectPressable}
        onPress={onUpdatePressHandler}
      >
        <Text style={ProgramShortDisplayStyle.selectPressableLabel}>
          Update
        </Text>
      </Pressable>
      <Pressable
        style={[
          ProgramShortDisplayStyle.selectPressable,
          { backgroundColor: Colors.red },
        ]}
        onPress={onDeletePressHandler}
      >
        <Text style={ProgramShortDisplayStyle.selectPressableLabel}>
          Delete
        </Text>
      </Pressable>
    </View>
  );
}
