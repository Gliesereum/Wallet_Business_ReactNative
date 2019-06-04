import React from 'react';

import {View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';


const Text = ({value, onChange, onBlur, label, error, touched, keyboardType, autoFocus}) => {
  return (
    <View>
      <TextInput
        error={touched && error}
        label={label}
        value={value}
        onChangeText={onChange}
        mode={"outlined"}
        onBlur={onBlur}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
      />
      <HelperText type="error" visible={true}>
        {touched && error}
      </HelperText>
    </View>
  );
};


Text.defaultProps = {
  keyboardType: 'default'
};

export default Text;
