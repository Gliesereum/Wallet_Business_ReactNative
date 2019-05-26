import React from 'react';

import {View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';


const Text = ({value, onChange, onBlur, label, error, touched}) => {
  return (
    <View>
      <TextInput
        error={touched && error}
        label={label}
        value={value}
        onChangeText={onChange}
        mode={"outlined"}
        onBlur={onBlur}
      />
      <HelperText type="error" visible={true}>
        {touched && error}
      </HelperText>
    </View>
  );
};

export default Text;
