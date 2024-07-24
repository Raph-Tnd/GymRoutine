import { StyleSheet } from "react-native";
import { Font } from "../Font";
import { Colors } from "../Colors";

export default StyleSheet.create({
	body: {
		marginTop: "20%",
		flexGrow: 0,
		alignSelf: "center",
		alignItems: "center",
		width: "95%",
		borderRadius: 15,
		backgroundColor: Colors.raisin_black,
	},
	programLabel: {
		width: "97%",
		minHeight: 50,
		backgroundColor: Colors.dim_gray,
		marginTop: 5,
		paddingHorizontal: 5,
		borderRadius: 10,
		textAlign: "center",
		justifyContent: "center",
		alignContent: "center",
		fontFamily: Font.global,
		fontSize: 16,
		fontWeight: "bold",
	},
	sessionLabel: {
		width: "97%",
		marginTop: 5,
		paddingHorizontal: 5,
		borderRadius: 10,
		textAlign: "center",
		justifyContent: "center",
		alignContent: "center",
		fontFamily: Font.global,
		fontSize: 16,
		fontWeight: "bold",
	},
	session: {
		marginTop: 10,
		alignSelf: "center",
		width: "95%",
		maxWidth: 820,
		backgroundColor: Colors.dim_gray,
		borderRadius: 10,
		justifyContent: "space-evenly",
	},
	list: {
		width: "100%",
		flexGrow: 0,
	},
	exercise: {
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
	delimiter: {
		marginHorizontal: 5,
		borderLeftWidth: 0.5,
		height: "60%",
	},
	exerciseMainLabel: {
		width: "100%",
		fontFamily: Font.global,
		fontWeight: "bold",
		fontSize: 14,
	},
	exerciseLabel: {
		width: "30%",
		textAlign: "center",
		fontFamily: Font.global,
		fontSize: 14,
	},
	exerciseLabelPlaceholder: {
		color: Colors.air_force_blue,
	},
	exerciseInputCue: {
		textAlign: "center",
		fontFamily: Font.global,
		fontSize: 14,
	},
	exerciceInputCueEdge: {
		marginRight: 5,
	},
	metricView: {
		height: "100%",
		width: "90%",
		maxWidth: 700,
		alignSelf: "center",
		backgroundColor: Colors.french_gray_80,
		flexDirection: "row",
		justifyContent: "center",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	metricListContainer: {
		height: "100%",
		width: "100%",
	},
	metricList: {},
	metric: {
		marginVertical: 5,
		marginLeft: 10,
		paddingHorizontal: 5,
		flexDirection: "row",
		backgroundColor: Colors.azure,
		height: "100%",
		maxHeight: 30,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	metricInput: {
		textAlign: "center",
		width: "100%",
		maxWidth: 50,
	},
	metricFooter: {
		height: "100%",
		width: 80,
	},
	sessionFooter: {
		flexDirection: "row",
		marginBottom: 10,
	},
	programFooter: {
		flexDirection: "row",
		marginVertical: 10,
	},
	addRemovePressableContainer: {
		marginVertical: 5,
		height: "100%",
		maxHeight: 40,
		flexDirection: "row",
		width: "90%",
		alignSelf: "center",
		justifyContent: "flex-end",
	},
	addRemovePressable: {
		marginLeft: 10,
		width: "100%",
		height: "100%",
		maxWidth: 30,
		maxHeight: 30,
		borderRadius: 10,
	},
	addRemovePressableSession: {
		backgroundColor: Colors.dim_gray,
	},
	addRemovePressableExercise: {
		backgroundColor: Colors.french_gray,
	},
	addRemovePressableMetric: {
		backgroundColor: Colors.azure,
	},
	addRemoveLabel: {
		width: "100%",
		height: "100%",
		alignContent: "center",
		textAlign: "center",
		fontFamily: Font.global,
		fontSize: 14,
		fontWeight: "bold",
	},
});
