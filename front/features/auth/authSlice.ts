import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
	user: {
		id: string;
		name: string | null;
		email: string;
		photo: string | null;
		familyName: string | null;
		givenName: string | null;
	};
	scopes: string[];
	/**
	 * JWT (JSON Web Token) that serves as a secure credential for your user's identity.
	 */
	idToken: string | null;
	/**
	 * Not null only if a valid webClientId and offlineAccess: true was
	 * specified in configure().
	 */
	serverAuthCode: string | null;
};

interface AuthState {
	user: User | undefined;
	accessToken: string | undefined;
	expirationTime: number | undefined;
}

const initialState: AuthState = {
	user: undefined,
	accessToken: undefined,
	expirationTime: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		setToken: (
			state,
			action: PayloadAction<{ accessToken: string; expireTime: number }>,
		) => {
			state.accessToken = action.payload.accessToken;
			state.expirationTime = action.payload.expireTime;
		},
		reset: (state) => {
			state.user = undefined;
			state.accessToken = undefined;
			state.expirationTime = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, reset } = authSlice.actions;

export default authSlice.reducer;
