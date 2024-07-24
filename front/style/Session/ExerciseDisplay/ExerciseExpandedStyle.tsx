import { Colors } from "@/style/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	body: {
		height: "100%",
		width: "90%",
		maxWidth: 700,
		alignSelf: "center",
		backgroundColor: Colors.french_gray_80,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	metricListContainer: {
		height: "100%",
	},
	metricList: {},
});
