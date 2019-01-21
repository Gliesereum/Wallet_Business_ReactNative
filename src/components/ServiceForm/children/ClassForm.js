import React, { Component } from "react";
import { Modal } from "react-native";
import { Body, Button, Container, Content, ListItem, Right, Switch, Text } from "native-base";
import { HeaderLayout } from "../../Layout";


class ClassForm extends Component {

  _onSubmit = priceClass => event => {
    return event ?
      this.props.onAddClassToPrice(priceClass) :
      this.props.onRemoveClassFromPrice(priceClass);
  };

  _classSwitched = serviceClass => {
    const { servicePrice } = this.props;
    const index = servicePrice.serviceClass.findIndex(item => item.id === serviceClass.id);
    return index !== -1;
  };

  renderPriceClassItem = item => {
    const switched = this._classSwitched(item);
    return (
      <ListItem key={item.id}>
        <Body>
        <Text>{item.name}</Text>
        </Body>
        <Right>
          <Switch
            value={switched}
            onTintColor="#50B948"
            onValueChange={this._onSubmit(item)}
          />
        </Right>
      </ListItem>
    );
  };

  render() {
    const classList = this.props.serviceClass.map(this.renderPriceClassItem);
    return (
      <Modal
        onRequestClose={this.props.onFullSubmit}
        visible={this.props.isOpen}
        animationType="slide"
      >
        <Container>
          <HeaderLayout
            body={"Класс обслуживания"}
          />
          <Content style={{padding: 4}}>
            {classList}
            <Button
              style={{ width: "100%", marginTop: 12, justifyContent: "center" }}
              onPress={this.props.onFullSubmit}
            >
              <Text>Сохранить</Text>
            </Button>
          </Content>
        </Container>
      </Modal>
    );
  }

}


export default ClassForm;
