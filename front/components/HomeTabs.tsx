import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Session from "./Session/Session";
import ProfileStack from "./Profile/ProfileStack";
import { Colors } from "@/style/Colors";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				headerStyle: {
					backgroundColor: Colors.bg_gradient_from,
				},
				headerShadowVisible: false,
				/* Parameter for the header title*/
				headerTitleAlign: "center",
				headerStatusBarHeight: 0,
			}}
		>
			<Tab.Screen
				name="Home"
				component={Session}
				options={{ headerShown: true, headerTitle: "" }}
			/>
			<Tab.Screen name="Profile" component={ProfileStack} />
		</Tab.Navigator>
	);
}
