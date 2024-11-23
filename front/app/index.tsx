import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/components/global/Provider/AuthProvider";
import App from "@/components/App";
import { NavigationContainer } from "@react-navigation/native";

export default function index() {
	const [fontsLoaded, fontsError] = useFonts({
		WorkSans: require("@/assets/fonts/WorkSans.ttf"),
	});
	return (
		fontsLoaded && (
			<GestureHandlerRootView>
				<AuthProvider>
					<App />
				</AuthProvider>
			</GestureHandlerRootView>
		)
	);
}
