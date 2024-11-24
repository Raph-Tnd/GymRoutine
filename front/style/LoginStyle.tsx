import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Font } from "./Font";

export default StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: Colors.bg_gradient_from,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},
	mainText: {
		fontFamily: Font.global,
		fontSize: 30,
		fontWeight: "bold",
		color: Colors.text_primary,
	},
	subText: {
		fontFamily: Font.global,
		fontSize: 14,
		color: Colors.text_secondary,
	},
	loginButton: {
		flexDirection: "row",
		backgroundColor: Colors.color_primary_dark,
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		gap: 10,
	},
	loginLabel: {
		color: Colors.text_primary,
		fontFamily: Font.global,
		fontSize: 16,
	},
});
