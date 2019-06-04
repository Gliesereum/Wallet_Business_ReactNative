// @flow
import React from 'react';

import {TextInput, SelectInput} from './children';

type OptionType = {
  value: String,
  key: String
};

type P = {
  type: 'text' | 'select',            // expanded, depends on requirements
  value: any,
  onChange: Function,
  label: String,
  fieldKey: String,
  options?: Array<OptionType>,
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad',
  autoFocus?: Boolean
};

const fieldTypes = {
  text: TextInput,
  select: SelectInput,
};


const Field = (props: P) => {
  const FieldComponent = fieldTypes[props.type] || fieldTypes.text;
  return <FieldComponent {...props}/>;
};

export default Field;
