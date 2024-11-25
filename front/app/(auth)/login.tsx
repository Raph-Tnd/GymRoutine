import { View, Text } from "react-native";
import { GoogleSign } from "@/services/Auth/GoogleSign";
import { Dumbbell } from "lucide-react-native";
import { Colors } from "@/style/Colors";
import LoginStyle from "@/style/LoginStyle";

export default function Login() {
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
