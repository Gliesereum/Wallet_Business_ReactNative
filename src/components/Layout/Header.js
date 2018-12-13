import React from 'react';
import { Header, Left, Body, Title, Right } from "native-base";


const HeaderLayout = ({left, body, right}) => {
  return (
    <Header>
      <Left>{left}</Left>
      <Body>
      <Title>{body}</Title>
      </Body>
      <Right>{right}</Right>
    </Header>
  );
};


export default HeaderLayout
