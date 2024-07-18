import { ExerciseModel } from "./ExerciseModel";

export interface SessionModel {
  name: string;
  exercises: ExerciseModel[];
}
