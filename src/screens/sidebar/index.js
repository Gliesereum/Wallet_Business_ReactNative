import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View,
  Thumbnail
} from "native-base";
import styles from "./style";

const drawerCover = require("../../../assets/images/sidebar-cover.png");
const defaultUser = require("../../../assets/images/user.png");

const bg = '#48525D';
const routes = [
  { name: "Мои Бизнесы", route: "CarWashes", icon: "paper", bg},
  { name: "Профиль", route: "Profile", icon: "key", bg},
  { name: "Выйти", route: "Logout", icon: "ios-exit", bg}
];

const routesBottom = [
  {name: 'О приложении', route: 'About', icon: 'ios-information-circle-outline', bg}
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    const { firstName, lastName, avatarUrl } = this.props.user;
    const userName = firstName || lastName ? `${firstName} ${lastName}` : "Пользователь";
    const avatar = avatarUrl ? { uri: avatarUrl } : defaultUser;
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <Image source={drawerCover} style={styles.drawerCover}/>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Thumbnail source={avatar}/>
            </View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.myProfile}>Мой профиль</Text>
          </View>

          <View style={styles.mainRoutes}>
            <List
              dataArray={routes}
              renderRow={data =>
                <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                  <Left>
                    <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }}/>
                    <Text style={styles.text}>
                      {data.name}
                    </Text>
                  </Left>
                  {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
                </ListItem>}
            />
          </View>

          <View style={styles.bottomRoutes}>
            <List
              dataArray={routesBottom}
              renderRow={data =>
                <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                  <Left>
                    <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }}/>
                    <Text style={styles.text}>
                      {data.name}
                    </Text>
                  </Left>
                  {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
                </ListItem>}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(state => ({ user: state.auth.user }))(SideBar);
