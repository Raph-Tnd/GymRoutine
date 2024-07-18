import { StyleSheet } from "react-native";
import { Colors } from "../Colors";
import { Font } from "../Font";

export default StyleSheet.create({
  body: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  pressable: {
    backgroundColor: Colors.dim_gray,
    width: "100%",
    maxWidth: 100,
    minHeight: 60,
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  pressableLabel: {
    textAlign: "center",
    fontFamily: Font.global,
    fontSize: 14,
    fontWeight: "bold",
  },
});
