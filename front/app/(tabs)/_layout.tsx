import { loadCreatedProgram } from "@/features/program/createdProgramSlice";
import { loadCurrentProgram } from "@/features/program/currentProgramSlice";
import { Colors } from "@/style/Colors";
import { router, Tabs, usePathname } from "expo-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Dumbbell, Home, User } from "lucide-react-native";

export default function TabsLayout() {
	const user = useSelector((state: RootState) => state.auth.user);
	const pathname = usePathname(); // Get the current path
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		if (user?.user != undefined) {
			dispatch(loadCreatedProgram(user.user.email));
			dispatch(loadCurrentProgram());
		}
	}, [user]);
	return (
		<Tabs
			initialRouteName="(session)/session"
			screenOptions={{
				headerTitle: "",
				headerStyle: {
					backgroundColor: Colors.bg_gradient_from,
				},
				headerShadowVisible: false,
				/* Parameter for the header title*/
				headerTitleAlign: "center",
				headerStatusBarHeight: 0,
				tabBarStyle: {
					backgroundColor: Colors.bg_gradient_from,
					borderTopWidth: 1,
					borderColor: Colors.border_color,
				},
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name="(session)/session"
				options={{
					title: "Home",
					headerShown: true,
					tabBarIcon: ({ focused, color, size }) => (
						<Dumbbell
							color={
								focused
									? Colors.color_primary_base
									: Colors.text_secondary
							}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (pathname.includes("/session/")) {
							e.preventDefault();
							router.replace("/session");
						}
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused, color, size }) => (
						<User
							color={
								focused
									? Colors.color_primary_base
									: Colors.text_secondary
							}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (pathname.includes("/profile/")) {
							e.preventDefault();
							router.replace("/profile");
						}
					},
				}}
			/>
		</Tabs>
	);
}
