import { getMyStringValue } from "@/components/global/Storage";
import { ExerciseModel, newExercise } from "@/model/ExerciseModel";
import { newProgram, ProgramModel } from "@/model/ProgramModel";
import { newSession } from "@/model/SessionModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

const initialState: ProgramModel = { author: "", name: "", sessions: [] };

export const loadCreatedProgram = createAsyncThunk(
	"localStorage/loadCreatedProgram",
	async (user: string) => {
		const response = await getMyStringValue("createdProgram");
		if (response) {
			let newProgram: ProgramModel = JSON.parse(response);
			return newProgram;
		} else {
			return newProgram(user);
		}
	},
);

export const createdProgramSlice = createSlice({
	name: "createdProgram",
	initialState: initialState,
	reducers: {
		setCreatedProgram: (state, action: PayloadAction<ProgramModel>) => {
			state = action.payload;
		},
		updateProgramName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		addSession: (state) => {
			return {
				...state,
				sessions: [
					...state.sessions,
					newSession(state.sessions.length + 1),
				],
			};
		},
		updateSessionName: (
			state,
			action: PayloadAction<{ name: string; sessionIndex: number }>,
		) => {
			return {
				...state,
				sessions: state.sessions.map((session, index) => {
					if (index == action.payload.sessionIndex) {
						return { ...session, name: action.payload.name };
					} else {
						return session;
					}
				}),
			};
		},
		removeSession: (state, action: PayloadAction<number>) => {
			return {
				...state,
				sessions: state.sessions.filter(
					(session, index) => index != action.payload,
				),
			};
		},
		addExercise: (state, action: PayloadAction<number>) => {
			return {
				...state,
				sessions: state.sessions.map((session, index) => {
					if (index == action.payload) {
						return {
							...session,
							exercises: [...session.exercises, newExercise()],
						};
					} else {
						return session;
					}
				}),
			};
		},
		updateExerciseProp: (
			state,
			action: PayloadAction<{
				exerciseProp: {
					key: keyof ExerciseModel;
					value: string | number | undefined;
				};
				sessionIndex: number;
				exerciseIndex: number;
			}>,
		) => {
			return {
				...state,
				sessions: state.sessions.map((session, sessionIndex) => {
					if (sessionIndex == action.payload.sessionIndex) {
						return {
							...session,
							exercises: session.exercises.map(
								(exercise, exerciseIndex) => {
									if (
										exerciseIndex ==
										action.payload.exerciseIndex
									) {
										return {
											...exercise,
											[action.payload.exerciseProp.key]:
												action.payload.exerciseProp
													.value,
										};
									} else {
										return exercise;
									}
								},
							),
						};
					} else {
						return session;
					}
				}),
			};
		},
		removeExercise: (
			state,
			action: PayloadAction<{
				sessionIndex: number;
				exerciseIndex: number;
			}>,
		) => {
			return {
				...state,
				sessions: state.sessions.map((session, sessionIndex) => {
					if (sessionIndex == action.payload.sessionIndex) {
						return {
							...session,
							exercises: session.exercises.filter(
								(exercise, exerciseIndex) =>
									exerciseIndex !=
									action.payload.exerciseIndex,
							),
						};
					} else {
						return session;
					}
				}),
			};
		},
	},
	extraReducers(builder) {
		builder.addCase(loadCreatedProgram.fulfilled, (state, action) => {
			state = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {
	setCreatedProgram,
	updateProgramName,
	addSession,
	updateSessionName,
	removeSession,
	addExercise,
	updateExerciseProp,
	removeExercise,
} = createdProgramSlice.actions;

export default createdProgramSlice.reducer;
