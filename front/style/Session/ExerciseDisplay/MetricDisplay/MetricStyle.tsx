import { StyleSheet } from "react-native";
import { Colors } from "../../../Colors";
import { Font } from "../../../Font";

export default StyleSheet.create({
	body: {
		paddingHorizontal: 5,
		flexDirection: "row",
		height: "100%",
		alignItems: "center",
		borderRightWidth: 1,
		borderRightColor: Colors.border_color,
	},
	label: {
		padding: 10,
		color: Colors.text_primary,
		fontFamily: Font.global,
		fontSize: 14,
	},
	value: {
		padding: 5,
		color: Colors.text_primary,
		fontFamily: Font.global,
		fontSize: 14,
		backgroundColor: Colors.color_primary_darker,
		borderRadius: 5,
	},
});
