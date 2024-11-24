import { MetricModel, validateMetric } from "./MetricModel";

export interface ExerciseModel {
	name: string;
	sets: number;
	repsPerSet: number;
	wantedRpe: number | undefined;
	weight: number;
	weightUnit: "kg" | "lb";
	rmPercentage: number;
	pauseTime: number | undefined;
	metrics: MetricModel[];
	note: string;
}

export function getPauseTimeFormatted(pauseTime: number): string {
	const minutes = Math.floor(pauseTime / 60);
	const seconds = pauseTime % 60;

	if (minutes === 0) {
		return `${seconds}s`;
	} else if (seconds === 0) {
		return `${minutes}min`;
	} else {
		return `${minutes}min${seconds}s`;
	}
}

export function exerciseEquals(
	ex1: ExerciseModel,
	ex2: ExerciseModel,
): boolean {
	return (
		ex1.name === ex2.name &&
		ex1.repsPerSet === ex2.repsPerSet &&
		ex1.sets === ex2.sets &&
		ex1.pauseTime === ex2.pauseTime
	);
}

export function newExercise(): ExerciseModel {
	return {
		name: "",
		sets: 0,
		repsPerSet: 0,
		wantedRpe: undefined,
		weight: 0,
		weightUnit: "kg",
		pauseTime: undefined,
		rmPercentage: 0,
		metrics: [],
		note: "",
	};
}

export function validateExercise(exercise: ExerciseModel): boolean {
	return (
		exercise.name != "" &&
		exercise.sets > 0 &&
		exercise.repsPerSet > 0 &&
		exercise.weight >= 0 /* &&
    exercise.metrics.reduce(
      (previous, metric) => previous && validateMetric(metric),
      true,
    ) */
	);
}
