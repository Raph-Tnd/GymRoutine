import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login/Login";
import HomeTabs from "./HomeTabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { loadCreatedProgram } from "@/features/program/createdProgramSlice";
import { loadCurrentProgram } from "@/features/program/currentProgramSlice";

const Stack = createStackNavigator();

export default function App() {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		console.log(user);
		if (user?.user != undefined) {
			dispatch(loadCreatedProgram(user.user.email));
			dispatch(loadCurrentProgram());
		}
	}, [user]);
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user != undefined ? (
				<Stack.Screen name="HomeTabs" component={HomeTabs} />
			) : (
				<Stack.Screen name="Login" component={Login} />
			)}
		</Stack.Navigator>
	);
}
