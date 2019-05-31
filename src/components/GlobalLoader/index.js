import React from "react";
import {connect} from "react-redux";
import {Modal, ActivityIndicator, StyleSheet} from 'react-native';
import {View, Text, Spinner} from "native-base";

import style from "./style";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(80,88,95,0.25)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});


const GlobalLoader = ({loading, children}) => {
  return (
    <>
      {children}
      <Modal transparent={true} animationType={'none'} visible={loading} onRequestClose={() => {
      }}>
        {loading && (
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={loading}/>
            </View>
          </View>)}
      </Modal>
    </>
  );
};


export default connect(state => ({loading: state.app.globalSpinner}))(GlobalLoader);
