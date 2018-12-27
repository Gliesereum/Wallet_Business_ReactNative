import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

import Autocomplete from 'react-native-autocomplete-input';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clear: {
    position: 'absolute',
    right: 8,
    top: 14,
    zIndex: 15,
    backgroundColor: '#8d8d8d',
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: 'center',
    flex: 1,
    opacity: 0.5
  },
  listStyle: {
    maxHeight: 150,
    borderRadius: 5,
    padding: 5,
    marginTop: 1
  },
  inputContainerStyle: {
    borderColor: '#fff',
    padding: 5
  }
});


class GoogleAddressAutoComplete extends React.Component {

  state = {
    query: '',
    data: [],
    done: false
  };

  componentDidMount() {
    this._initForm()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.query !== nextProps.query) {
      this._onInput('query')(nextProps.query)
    }
  }

  _initForm = () => {
    const {address} = this.props;
    if (address) {
      this._onInput('query')(address)
    }
  };

  _onInput = key => value => {
    this.setState(state => ({
      ...state,
      [key]: value
    }))
  };

  _searchAddressHandler = (text) => {
    const {done} = this.state;
    this._onInput('query')(text);
    if (text.length >= 2 && !done) {
      fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${text}&key=AIzaSyD1fazwx_8e7n_eyy_Qohk1EJCaR5dS_uE`)
        .then(data => data.json())
        .then(({predictions}) => {
          this.setState(state => ({...state, data: predictions}))
        })
    }
  };

  _doneHandler = address => {
    this._onInput('done')(true);
    this._onInput('query')(address.description);
    this.props.onSelect(address);
  };

  _clearHandler = () => {
    this._onInput('query')('');
    this._onInput('data')([]);
    this._onInput('done')(false);
  };

  render() {
    const {query, data, done} = this.state;
    const hideResults = done || query.length < 2;
    return (
      <View style={styles.container}>
        <View style={styles.clear}>
          <Icon
            name="ios-close"
            color="#fff"
            size={25}
            onPress={this._clearHandler}
          />
        </View>
        <View>
        </View>
        <View>
          <Autocomplete
            inputContainerStyle={styles.inputContainerStyle}
            hideResults={hideResults}
            placeholder={"Адрес"}
            listStyle={styles.listStyle}
            data={data}
            defaultValue={query}
            onChangeText={this._searchAddressHandler}
            renderItem={item => (
              <TouchableOpacity onPress={() => this._doneHandler(item)}>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    )
  }
}


export default GoogleAddressAutoComplete
