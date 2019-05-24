import React from 'react';

import {View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';


const Text = ({value, onChange, label, error}) => {
  return (
    <View>
      <TextInput label={label} value={value} onChangeText={onChange} mode={"outlined"}/>
      <HelperText type="error" visible={true}>
        {error}
      </HelperText>
    </View>
  );
};

export default Text;
