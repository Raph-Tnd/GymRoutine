import { Colors } from "@/style/Colors";
import { Font } from "@/style/Font";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	body: {
		width: "90%",
		alignSelf: "center",
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: Colors.border_color,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginBottom: 10,
	},
	metricListContainer: {
		height: "100%",
	},
	metricList: {},
	noteInput: {
		overflow: "scroll",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		height: "100%",
		paddingHorizontal: 15,
		color: Colors.text_primary,
		fontFamily: Font.global,
		fontSize: 14,
	},
});
