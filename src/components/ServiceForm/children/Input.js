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

const SelectField = ({ inputKey, label, value, type, options, onChange }) => {
  return (
    <Item key={inputKey}>
      <Label style={{ paddingTop: 4 }}>{label}</Label>
      <Picker
        iosIcon={<Icon name="ios-arrow-down"/>}
        style={{ width: "100%", marginTop: 3 }}
        key={inputKey}
        mode="dropdown"
        iosHeader={label}
        selectedValue={value}
        value={value}
        onValueChange={value => onChange(inputKey, value)}
      >
        {options.map(item => (
          <Picker.Item
            label={item.name}
            key={item.id}
            value={item.id}
          />
        ))}
      </Picker>
    </Item>
  );
};

const ArrayField = ({ inputKey, label, value, type, options, error, onChange }) => {

  const checked = filterId => {
    const foundIndex = value.findIndex(item => item.id === filterId);
    return foundIndex !== -1;
  };

  const onInput = filter => () => {
    const checkedFilter = checked(filter.id);

    onChange(checkedFilter, filter);
  };

  const content = options.map(item => {
    return (
      <ListItem
        style={{ flex: 1 }}
        onPress={onInput(item)}
        key={item.id}
      >
        <CheckBox
          checked={checked(item.id)}
          onPress={onInput(item)}
        />
        <Body>
        <Text>{item.title}</Text>
        </Body>
      </ListItem>
    );
  });

  const dataArray = [{ title: label }];

  return (
    <Item
      fixedLabel
      key={inputKey}
      style={{
        paddingTop: 4
      }}
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
  select: SelectField,
  array: ArrayField
};


const ServiceInput = (props: FieldProps) => {
  if (!fields[props.type]) {
    return fields["string"](props);
  }
  return fields[props.type](props);
};


export default ServiceInput;
