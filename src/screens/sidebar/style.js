const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  userInfo: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 20 : deviceWidth / 16,
    top: Platform.OS === "android" ? deviceHeight / 10 : deviceHeight / 14,
    color: '#fff'
  },
  userAvatar: {
    paddingBottom: 16
  },
  userName: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff'
  },
  myProfile: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 24,
  },
  mainRoutes: {
    borderBottomColor: `rgba(0, 0, 0, 0.08);`,
    borderBottomWidth: 2,
    paddingBottom: 16
  },
  bottomRoutes: {
    paddingTop: 16
  }
};
