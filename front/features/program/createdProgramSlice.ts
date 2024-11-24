import { getMyStringValue } from "@/components/global/Storage";
import { newProgram, ProgramModel } from "@/model/ProgramModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
	},
	extraReducers(builder) {
		console.log("test");
		builder.addCase(loadCreatedProgram.fulfilled, (state, action) => {
			state = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setCreatedProgram } = createdProgramSlice.actions;

export default createdProgramSlice.reducer;
