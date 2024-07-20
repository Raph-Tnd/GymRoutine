import { StyleSheet } from "react-native";
import { Font } from "../Font";
import { Colors } from "../Colors";

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.seasalt,
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainLabel: {
    width: "95%",
    minHeight: 80,
    backgroundColor: Colors.dim_gray,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    fontFamily: Font.global,
    fontSize: 20,
  },
  listContainer: {
    alignSelf: "center",
    width: "95%",
    maxWidth: 820,
    backgroundColor: Colors.dim_gray,
    borderRadius: 10,
  },
  list: {
    width: "100%",
    flexGrow: 0,
  },
  pressable: {
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
    borderLeftWidth: 0.5,
    height: "60%",
  },
  pressableMainLabel: {
    fontFamily: Font.global,
    fontWeight: "bold",
    fontSize: 14,
  },
  header: {
    paddingTop: 5,
    backgroundColor: Colors.seasalt,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
    paddingHorizontal: 10,
    flexDirection: "row",
    height: "100%",
    maxHeight: 40,
    width: "100%",
    justifyContent: "space-between",
  },
  headerPressable: {
    backgroundColor: Colors.dim_gray,
    width: "100%",
    maxWidth: 100,
    justifyContent: "center",
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  headerPressableLabel: {
    textAlign: "center",
    fontFamily: Font.global,
    fontSize: 14,
    fontWeight: "bold",
  },
});
