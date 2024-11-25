import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { RootState, store } from "./store";
import { Provider, useSelector } from "react-redux";
import { Slot, useRouter, useSegments } from "expo-router";

function AuthGuard() {
	const segments = useSegments();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";

		if (!user && !inAuthGroup) {
			// Redirect to login if accessing protected routes without auth
			router.replace("/(auth)/login");
		} else if (user && inAuthGroup) {
			// Redirect to home if accessing auth routes while logged in
			router.replace("/(tabs)/(session)/session");
		}
	}, [user, segments]);

	return <Slot />;
}
export default function RootLayout() {
	const [fontsLoaded, fontsError] = useFonts({
		WorkSans: require("@/assets/fonts/WorkSans.ttf"),
	});
	return (
		fontsLoaded && (
			<GestureHandlerRootView>
				<Provider store={store}>
					<AuthGuard />
				</Provider>
			</GestureHandlerRootView>
		)
	);
}
