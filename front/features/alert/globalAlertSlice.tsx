import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const globalAlertSlice = createSlice({
	name: "globalAlert",
	initialState: initialState,
	reducers: {
		setAlertMessage: (state, action: PayloadAction<string>) => {
			return action.payload;
		},
		resetAlertMessage: (state) => {
			return "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAlertMessage, resetAlertMessage } = globalAlertSlice.actions;

export default globalAlertSlice.reducer;
