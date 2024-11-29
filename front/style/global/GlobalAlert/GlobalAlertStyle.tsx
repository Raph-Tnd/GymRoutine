import { StyleSheet } from "react-native";
import { Colors } from "../../Colors";
import { Font } from "@/style/Font";

export default StyleSheet.create({
	sheet: {
		backgroundColor: Colors.card_bg,
		padding: 16,
		marginTop: "50%",
		height: "40%",
		width: "95%",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.border_color,
		alignSelf: "center",
		justifyContent: "space-around",
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
		backgroundColor: Colors.color_primary_base,
		width: "40%",
		height: 40,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		shadowOffset: { height: 2, width: 2 },
		shadowRadius: 5,
		elevation: 5,
	},
	pressableCancel: {
		backgroundColor: Colors.red,
	},
	pressableList: {
		width: "100%",
		flexDirection: "row",
		gap: 10,
		justifyContent: "center",
	},
	pressablePressing: {
		backgroundColor: Colors.color_primary_light,
	},
	information: {
		color: Colors.text_primary,
		textAlign: "center",
		fontFamily: Font.global,
		fontSize: 14,
	},
});
