import { MetricModel } from "./MetricModel";


export interface ExerciseModel {
	name: string;
	sets: number;
	repsPerSet: number;
	weight: number;
	weightUnit: "kg" | "lb";
	pauseTime: number;
	metrics: MetricModel[];
}

export function getPauseTimeFormatted(exercise: ExerciseModel): string {
	const minutes = Math.floor(exercise.pauseTime / 60);
	const seconds = exercise.pauseTime % 60;
	
	if (minutes === 0) {
	  return `${seconds}s`;
	} else if (seconds === 0) {
	  return `${minutes}min`;
	} else {
	  return `${minutes}min${seconds}s`;
	}
  }
