import { getMyStringValue } from "@/components/global/Storage";
import { ProgramModel } from "@/model/ProgramModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialProgramState: ProgramModel = {
	author: "",
	name: "",
	sessions: [],
};
const initialState = {
	program: initialProgramState,
	index: 0,
};

export const loadCurrentProgram = createAsyncThunk(
	"localStorage/loadCurrentProgram",
	async () => {
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
		setCurrentIndex: (state, action: PayloadAction<number>) => {
			state.index = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(loadCurrentProgram.fulfilled, (state, action) => {
			console.log("test");

			state.program = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setCurrentProgram, setCurrentIndex } =
	currentProgramSlice.actions;

export default currentProgramSlice.reducer;
