import React from 'react';
import { Provider } from 'react-redux';
import { StyleProvider, Root } from 'native-base';

import RootApp from './src/boot';

import getTheme from './src/theme/components';
import variables from './src/theme/variables/commonColor';

import {GlobalLoader} from './src/components';

import { store } from './src/redux/store';
import * as Expo from 'expo';


export default class App extends React.Component {

  state = { isReady: false };

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading/>;
    }
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <GlobalLoader>
            <Root>
              <RootApp/>
            </Root>
          </GlobalLoader>
        </StyleProvider>
      </Provider>
    );
  }
}
