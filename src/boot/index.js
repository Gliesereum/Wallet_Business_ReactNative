import {createSwitchNavigator, createAppContainer} from 'react-navigation';


import App from './containers/App';
import Auth from './containers/Auth';
import Loading from './containers/Loading'



export default createAppContainer(createSwitchNavigator({
  Loading: Loading,
  Auth: Auth,
  App: App,
}, {
  initRouteName: 'Loading'
}));
