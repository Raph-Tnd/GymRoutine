import { Colors } from "@/style/Colors";
import { Font } from "@/style/Font";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	body: {
		gap: 30,
	},
	titleLabel: {
		textAlign: "center",
		fontFamily: Font.global,
		color: Colors.text_primary,
		fontWeight: "bold",
		fontSize: 20,
	},
	listContainer: {
		paddingTop: 10,
		alignSelf: "center",
		width: "95%",
		backgroundColor: Colors.card_bg,
		borderWidth: 1,
		borderColor: Colors.border_color,
		borderRadius: 20,
	},
});
