import React, {Component} from 'react';
import {View, Text, Container, Button, Icon, Content} from 'native-base';

import {HeaderLayout} from "../../../components/Layout";
import {PackageForm} from '../../../components'


class CarWashCreatePackage extends Component {

  render() {
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Создать пакет услуг"}
        />
        <Content>
          <PackageForm/>
        </Content>
      </Container>
    )
  }

}


export default CarWashCreatePackage;
