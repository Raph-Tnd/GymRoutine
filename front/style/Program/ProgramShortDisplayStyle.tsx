import { StyleSheet } from "react-native";
import { Font } from "../Font";
import { Colors } from "../Colors";

export default StyleSheet.create({
	body: {
		flexDirection: "row",
		backgroundColor: Colors.french_gray,
		width: "95%",
		marginTop: 10,
		maxWidth: 800,
		height: 50,
		borderRadius: 5,
		paddingLeft: 10,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "space-evenly",
		shadowOffset: { height: 2, width: 2 },
		shadowRadius: 5,
		elevation: 5,
	},
	label: {
		fontFamily: Font.global,
		fontSize: 14,
		fontWeight: "bold",
	},
	expandedDisplay: {
		flexDirection: "row",
		height: "100%",
		width: "90%",
		maxWidth: 700,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: Colors.french_gray_80,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	selectPressable: {
		backgroundColor: Colors.azure,
		height: "80%",
		width: "100%",
		maxWidth: 100,
		borderRadius: 10,
		shadowOffset: { height: 2, width: 2 },
		shadowRadius: 5,
		elevation: 5,
	},
	selectPressableLabel: {
		overflow: "hidden",
		flex: 1,
		fontFamily: Font.global,
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		alignContent: "center",
	},
});
