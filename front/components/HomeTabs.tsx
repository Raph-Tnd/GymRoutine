import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Session from "./Session/Session";
import ProfileStack from "./Profile/ProfileStack";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name="Home" component={Session} />
			<Tab.Screen name="Profile" component={ProfileStack} />
		</Tab.Navigator>
	);
}
