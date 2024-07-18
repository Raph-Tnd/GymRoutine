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
  selectPressable: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.azure,
    height: "80%",
    borderRadius: 10,
    alignContent: "center",
    fontFamily: Font.global,
    fontSize: 14,
    fontWeight: "bold",
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
});
