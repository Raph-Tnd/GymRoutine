import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import App from "@/components/App";
import { store } from "./store";
import { Provider } from "react-redux";

export default function index() {
	const [fontsLoaded, fontsError] = useFonts({
		WorkSans: require("@/assets/fonts/WorkSans.ttf"),
	});
	return (
		fontsLoaded && (
			<GestureHandlerRootView>
				<Provider store={store}>
					<App />
				</Provider>
			</GestureHandlerRootView>
		)
	);
}
