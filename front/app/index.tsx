import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import App from "@/components/App";
import { store } from "./store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function index() {
	const [fontsLoaded, fontsError] = useFonts({
		WorkSans: require("@/assets/fonts/WorkSans.ttf"),
	});
	return (
		fontsLoaded && (
			<GestureHandlerRootView>
				<Provider store={store}>
					<GoogleOAuthProvider clientId="620859170647-2ih3o74dhd7qmhf4vglrh3ag1jse9bk7.apps.googleusercontent.com">
						<App />
					</GoogleOAuthProvider>
				</Provider>
			</GestureHandlerRootView>
		)
	);
}
