// ExerciseForm.tsx
import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { ExerciseModel } from "@/model/ExerciseModel";
import ProgramFormStyle from "@/style/Profile/ProgramFormStyle";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ExerciseExpandedForm from "./ExerciseExpandedForm";
import { FormDelimiter } from "./ProgramForm";

export default function ExerciseForm({
  exercise,
  onUpdate,
}: {
  exercise: ExerciseModel;
  onUpdate: (updatedExercise: ExerciseModel) => void;
}) {
  const handleChange = (field: keyof ExerciseModel, value: string | number) => {
    onUpdate({ ...exercise, [field]: value });
  };
  const isPressing = useSharedValue(0);
  const expandMetrics = useSharedValue(0);
  const tap = Gesture.LongPress()
    .shouldCancelWhenOutside(true)
    .onBegin(() => {
      isPressing.value = 1;
    })
    .onTouchesCancelled(() => {
      isPressing.value = 0;
    })
    .onEnd(() => {
      isPressing.value = 0;
      expandMetrics.value = (expandMetrics.value + 1) % 2;
    });
  const expandMetricsAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(expandMetrics.value * 40),
    };
  });
  return (
    <>
      <GestureDetector gesture={tap}>
        <>
          <Pressable style={ProgramFormStyle.exercise} onLongPress={() => {}}>
            <TextInput
              style={ProgramFormStyle.exerciseMainLabel}
              value={exercise.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Exercise name"
            />
            <FormDelimiter />
            <TextInput
              style={ProgramFormStyle.exerciseLabel}
              value={exercise.sets.toString()}
              onChangeText={(value) =>
                handleChange("sets", parseInt(value) || 0)
              }
              keyboardType="numeric"
              placeholder="Number of sets"
            />
            <Text style={ProgramFormStyle.exerciseLabel}>x</Text>
            <TextInput
              style={ProgramFormStyle.exerciseLabel}
              value={exercise.repsPerSet.toString()}
              onChangeText={(value) =>
                handleChange("repsPerSet", parseInt(value) || 0)
              }
              keyboardType="numeric"
              placeholder="Reps per set"
            />
            <FormDelimiter />
            <TextInput
              style={ProgramFormStyle.exerciseLabel}
              value={exercise.weight.toString()}
              onChangeText={(value) =>
                handleChange("weight", parseFloat(value) || 0)
              }
              keyboardType="numeric"
              placeholder="Weight"
            />
            <TextInput
              style={ProgramFormStyle.exerciseLabel}
              value={exercise.weightUnit}
              onChangeText={(value) => handleChange("weightUnit", value)}
              placeholder="Weight Unit)"
            />
            <FormDelimiter />
            <TextInput
              style={ProgramFormStyle.exerciseLabel}
              value={exercise.pauseTime.toString()}
              onChangeText={(value) =>
                handleChange("pauseTime", parseInt(value) || 0)
              }
              keyboardType="numeric"
              placeholder="Pause time (sec)"
            />
            <Text style={ProgramFormStyle.exerciseLabel}>s</Text>
          </Pressable>
        </>
      </GestureDetector>
      <Animated.View style={[{ marginBottom: 10 }, expandMetricsAnimatedStyle]}>
        <ExerciseExpandedForm exercise={exercise} onUpdate={onUpdate} />
      </Animated.View>
    </>
  );
}
