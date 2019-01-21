// @flow
import React from "react";
import { Icon, Input, Item, Label, Picker } from "native-base";

type FieldProps = {
  type: "string" | "number" | "select" | "time" | "array",
  label: String,
  inputKey: String,
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

const SelectField = ({ inputKey, label, value, type, options = [], onChange }) => {
  return (
    <Item>
      <Label style={{ paddingTop: 4 }}>{label}</Label>
      <Picker
        key={inputKey}
        mode="dropdown"
        iosHeader={label}
        iosIcon={<Icon name="ios-arrow-down-outline"/>}
        style={{ width: "100%", marginTop: 3 }}
        selectedValue={value}
        value={value}
        onValueChange={value => onChange(inputKey, value)}
      >
        {options.map(item => (<Picker.Item label={item.name} key={item.id} value={item.id}/>))}
      </Picker>
    </Item>
  );
};


const fields = {
  string: StringField,
  number: NumberField,
  select: SelectField
};

const Field = (props: FieldProps) => {
  if (!fields[props.type]) {
    return fields["string"](props);
  }
  return fields[props.type](props);
};


export default Field;
