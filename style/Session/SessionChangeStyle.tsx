import { StyleSheet } from "react-native";
import { Colors } from "../Colors";
import { Font } from "../Font";

export default StyleSheet.create({
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    height: "100%",
    maxHeight: 40,
    width: "100%",
    justifyContent: "space-between",
  },
  pressable: {
    backgroundColor: Colors.dim_gray,
    width: "100%",
    maxWidth: 100,
    justifyContent: "center",
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
