// @flow
import React, {Component} from "react";
import {ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';

import {Formik} from 'formik';


import fields from './fields';
import Schema from "./schema";
import {Button, Text} from "native-base";
import {Field} from "../../index";

const style = StyleSheet.create({
  container: {
    padding: 8
  }
});


type P = {
  isNew?: Boolean,
  business?: Object,
  onSubmit: Function
}


const CorporationForm = (props: P) => {

  const initValues = props.isNew ? fields.reduce((acc, field) => {
    acc[field.key] = field.defaultValue;
    return acc;
  }, {}) : props.business;

  const renderItemInput = ({key, value, error, touched, render, label, type, onChange, onBlur, options, keyboardType}) => {
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
        keyboardType={keyboardType}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 300})}
    >
      <ScrollView style={style.container} keyboardShouldPersistTaps={'always'}>
        <Formik initialValues={initValues} onSubmit={props.onSubmit} validationSchema={Schema}>
          {props => {
            return (
              <View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CorporationForm;
