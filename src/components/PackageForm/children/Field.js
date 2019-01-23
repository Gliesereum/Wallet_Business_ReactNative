// @flow
import React from "react";
import {
  Icon,
  Input,
  Item,
  Label,
  Picker,
  View,
  Accordion,
  ListItem,
  CheckBox,
  Body,
  Text
} from "native-base";

import TimePicker from "../../../components/TimePicker";

type FieldProps = {
  type: "string" | "number" | "select" | "time" | "array",
  label: String,
  key: String,
  value: String | Number | Array<String>,
  options?: Array<Object>,
  onChange: Function;
}

const StringField = ({ inputKey, label, value, type, error, onChange }) => {
  return (
    <Item fixedLabel key={inputKey}>
      <Label style={{ paddingTop: 4 }}>{label}</Label>
      <Input
        value={value}
        onChangeText={text => onChange(inputKey, text)}
        keyboardType={"default"}
      />
    </Item>
  );
};

const NumberField = ({ inputKey, label, value, type, error, onChange }) => {
  return (
    <Item fixedLabel key={inputKey}>
      <Label style={{ paddingTop: 4 }}>{label}</Label>
      <Input
        value={String(value)}
        onChangeText={text => onChange(inputKey, text)}
        keyboardType={"numeric"}
      />
    </Item>
  );
};


const ArrayField = ({ inputKey, label, value, type, options, onChange }) => {

  const dataArray = [{ title: label }];

  const checkedPrice = id => value && value.findIndex(item => item === id) !== -1;

  const checkHandler = price => () => {
    const hasSelected = checkedPrice(price.id);
    hasSelected ?
      onChange(inputKey, value.filter(item => item !== price.id)) :
      onChange(inputKey, [...value, price.id]);
  };

  const content = options.map(price => {
    return (
      <ListItem style={{ flex: 1 }} key={price.id} onPress={checkHandler(price)}>
        <CheckBox checked={checkedPrice(price.id)} onPress={checkHandler(price)}/>
        <Body>
        <Text>{price.name}</Text>
        </Body>
      </ListItem>
    );
  });

  return (
    <Item
      fixedLabel
      key={inputKey}
      style={{ paddingTop: 4 }}
    >
      <Accordion
        dataArray={dataArray}
        icon="add"
        expandedIcon="remove"
        renderContent={() => content}
        textStyle={{ color: "green" }}
        headerStyle={{ backgroundColor: "#fff" }}
        key={inputKey}
      />
    </Item>
  );
};


const fields = {
  string: StringField,
  number: NumberField,
  array: ArrayField
};


const PriceInput = (props: FieldProps) => {
  if (!fields[props.type]) {
    return fields["string"](props);
  }
  return fields[props.type](props);
};


export default PriceInput;
