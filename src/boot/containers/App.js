import React, {Component} from 'react';
import {View, Text} from 'native-base';


class App extends Component {

  _renderApp = () => {
    return (
      <View>
        <Text>Welcome to app</Text>
      </View>
    );
  };

  render() {
    return this._renderApp();
  }

}


export default App;
