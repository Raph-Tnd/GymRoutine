import { storeData } from "@/components/global/Storage";
import { GoogleToken } from "@/model/Auth/GoogleToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
	reducerPath: "mainApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://141.145.201.163/GymRoutine/",
	}),
	endpoints: (builder) => ({
		connect: builder.query<string, string>({
			query: (code) => `connectionToken?code=${code}`,
			transformResponse: (response: GoogleToken): string => {
				//missing access token and expires token gestion
				if (Platform.OS === "web") {
					storeData("google_refresh_token", response.refreshToken);
				} else {
					SecureStore.setItemAsync(
						"google_refresh_token",
						response.refreshToken,
					);
				}
				return response.idToken;
			},
		}),
		connectWithRefreshToken: builder.query<string, undefined>({
			query: (refreshToken) => `refreshToken/${refreshToken}`,
			transformResponse: (response: GoogleToken) => {
				//missing access token and expires token gestion
				return response.idToken;
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useConnectQuery, useConnectWithRefreshTokenQuery } = mainApi;
