import { Dimensions, StyleSheet } from "react-native";


const deviceHeight = Dimensions.get("window").height;


export default StyleSheet.create({
  container: {
    width: "100%",
    height: deviceHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  logo: {
    width: "100%",
    height: 230,
    paddingBottom: 32
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  input: {
    paddingBottom: 32
  }
});
