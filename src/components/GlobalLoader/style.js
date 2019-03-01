import { StyleSheet } from "react-native";

const Dimensions = require("Dimensions");

const { height, width } = Dimensions.get("window");

console.log(height);
console.log(width);

export default StyleSheet.create({
  container: {},
  containerLoader: {
    backgroundColor: "#686868",
  },
  loading: {
    position: "absolute",
    backgroundColor: "#686868",
    opacity: 0.7,
    width: width,
    height: height,
    zIndex: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#cfcfcf"
  },
  children: {
    width: width,
    height: height
  }
});
