import { View, Text } from "react-native";
import { GoogleSign } from "@/services/Auth/GoogleSign";
import { Dumbbell } from "lucide-react-native";
import { Colors } from "@/style/Colors";
import LoginStyle from "@/style/LoginStyle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { setUser } from "@/features/auth/authSlice";

export default function Login() {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
			dispatch(
				setUser({
					user: {
						id: "",
						name: null,
						email: "tenaudraphael@gmail.com",
						photo: null,
						familyName: null,
						givenName: null,
					},
					scopes: [],
					idToken: null,
					serverAuthCode: null,
				}),
			);
		}
	}, []);
	return (
		<View style={LoginStyle.body}>
			<Dumbbell color={Colors.color_primary_darker} />
			<Text style={LoginStyle.mainText}>PowerTraining</Text>
			<Text style={LoginStyle.subText}>
				The best app to follow your powerlifting training
			</Text>
			<GoogleSign />
		</View>
	);
}
