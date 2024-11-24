import { getMyStringValue } from "@/components/global/Storage";
import { ProgramModel } from "@/model/ProgramModel";
import { SessionModel } from "@/model/SessionModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialProgramState: ProgramModel = {
	author: "",
	name: "",
	sessions: [],
};
const initialState = {
	program: initialProgramState,
	sessionIndex: 0,
};

export const loadCurrentProgram = createAsyncThunk(
	"localStorage/loadCurrentProgram",
	async () => {
		//TODO: fetch online and local then compare
		const response = await getMyStringValue("currentProgram");
		if (response) {
			let newProgram: ProgramModel = JSON.parse(response);
			return newProgram;
		} else {
			return initialProgramState;
		}
	},
);

export const currentProgramSlice = createSlice({
	name: "currentProgram",
	initialState: initialState,
	reducers: {
		setCurrentProgram: (state, action: PayloadAction<ProgramModel>) => {
			state.program = action.payload;
		},
		setSessionIndex: (state, action: PayloadAction<number>) => {
			state.sessionIndex = action.payload;
		},
		updateSession: (state, action: PayloadAction<SessionModel>) => {
			return {
				...state,
				program: {
					...state.program,
					sessions: state.program.sessions.map((session, index) =>
						index == state.sessionIndex ? action.payload : session,
					),
				},
			};
		},
	},
	extraReducers(builder) {
		builder.addCase(loadCurrentProgram.fulfilled, (state, action) => {
			state.program = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setCurrentProgram, setSessionIndex, updateSession } =
	currentProgramSlice.actions;

export default currentProgramSlice.reducer;
