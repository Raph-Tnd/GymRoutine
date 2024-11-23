import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
	reducerPath: "mainApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://141.145.201.163/GymRoutine/",
	}),
	endpoints: (builder) => ({
		connect: builder.query<void, string>({
			query: (code) => `connectionToken?code=${code}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useConnectQuery } = mainApi;
