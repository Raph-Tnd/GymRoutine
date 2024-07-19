import { ExerciseModel, newExercise, validateExercise } from "./ExerciseModel";

export interface SessionModel {
  name: string;
  exercises: ExerciseModel[];
}

export function newSession(index: number): SessionModel {
  return {
    name: `Session ${index}`,
    exercises: [newExercise()],
  };
}

export function validateSession(session: SessionModel): boolean {
  return (
    session.name != "" &&
    session.exercises.reduce(
      (previous, exercise) => previous && validateExercise(exercise),
      true,
    )
  );
}
