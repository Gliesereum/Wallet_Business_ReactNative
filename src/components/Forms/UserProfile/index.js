// @flow
import React from 'react';
import {View} from "react-native";
import {Button, Text} from "native-base";
import {Formik} from "formik";

import fields from './fields';
import Schema from './schema';
import {Field} from "../../index";

type P = {
  onUpdate: Function,
  user: Object
}

const UserProfileForm = (props: P) => {

  const renderItemInput = ({key, value, error, touched, render, label, type, onChange, onBlur, options}) => {
    return render && (
      <Field
        key={key}
        type={type}
        value={value}
        error={error}
        touched={touched}
        label={label}
        fieldKey={key}
        onChange={onChange(key)}
        onBlur={onBlur(key)}
        options={options}
      />
    );
  };

  return (
    <Formik initialValues={props.user} onSubmit={props.onUpdate} validationSchema={Schema}>
      {props => {
        return (
          <View style={{padding: 8}}>
            {fields.map(field => renderItemInput({
              ...field,
              value: props.values[field.key],
              error: props.errors[field.key],
              onChange: props.handleChange,
              onBlur: props.handleBlur,
              touched: props.touched[field.key]
            }))}
            <Button block onPress={props.handleSubmit} title={'Сохранить'}>
              <Text>Сохранить</Text>
            </Button>
          </View>
        );
      }
      }
    </Formik>
  );
};

export default UserProfileForm;
