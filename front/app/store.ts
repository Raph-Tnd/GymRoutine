import { globalAlertSlice } from "@/features/alert/globalAlertSlice";
import { mainApi } from "@/features/api/apiSlice";
import { authSlice } from "@/features/auth/authSlice";
import { createdProgramSlice } from "@/features/program/createdProgramSlice";
import { currentProgramSlice } from "@/features/program/currentProgramSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		[mainApi.reducerPath]: mainApi.reducer,
		auth: authSlice.reducer,
		createdProgram: createdProgramSlice.reducer,
		currentProgram: currentProgramSlice.reducer,
		globalAlert: globalAlertSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mainApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
