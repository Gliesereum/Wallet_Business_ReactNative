import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Spinner } from 'native-base';

import style from './style';


const GlobalLoader = ({ loading, children }) => {
  return (
    <View style={style.container}>
      {loading && (
        <View style={style.loading}>
          <View style={{ opacity: 1, zIndex: 20 }}>
            <Spinner color={'grey'}/>
            <Text style={style.text}>Подождите...</Text>
          </View>
        </View>
      )}
      <View style={style.children}>
        {children}
      </View>
    </View>
  );
};


export default connect(state => ({ loading: state.app.globalSpinner }))(GlobalLoader);
