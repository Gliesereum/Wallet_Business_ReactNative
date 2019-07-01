import React from 'react';
import { Header, Left, Body, Title, Right } from "native-base";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    header: {
        marginTop: 20
    }
});

const HeaderLayout = ({left, body, right}) => {
  return (
    <Header style={styles.header}>
      <Left>{left}</Left>
      <Body>
      <Title>{body}</Title>
      </Body>
      <Right>{right}</Right>
    </Header>
  );
};


export default HeaderLayout
