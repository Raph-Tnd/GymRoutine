import { Colors } from "@/style/Colors";
import { Font } from "@/style/Font";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	pressable: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		width: "95%",
		padding: 10,
		borderRadius: 15,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "space-evenly",
		borderWidth: 1,
		borderColor: Colors.border_color,
	},
	exerciseLabel: {
		borderColor: Colors.border_color,
		padding: 10,
		color: Colors.text_primary,
		fontFamily: Font.global,
		fontSize: 14,
		fontWeight: "bold",
	},
	mainLabel: {
		borderWidth: 1,
		borderColor: Colors.border_color,
		borderRadius: 10,
		padding: 10,
		color: Colors.text_primary,
		fontFamily: Font.global,
		fontSize: 14,
	},
});
