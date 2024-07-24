import { StyleSheet } from "react-native";
import { Colors } from "../../Colors";
import { Font } from "@/style/Font";

export default StyleSheet.create({
	sheet: {
		backgroundColor: Colors.seasalt,
		padding: 16,
		marginTop: "50%",
		height: "25%",
		aspectRatio: 1,
		borderRadius: 20,
		alignSelf: "center",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},
	backdropTouch: {
		flex: 1,
	},
	pressable: {
		backgroundColor: Colors.dim_gray,
		width: "50%",
		height: "20%",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { height: 2, width: 2 },
		shadowRadius: 5,
		elevation: 5,
	},
	pressablePressing: {
		backgroundColor: Colors.french_gray,
	},
	information: {
		textAlign: "center",
		fontFamily: Font.global,
		fontSize: 14,
	},
});
