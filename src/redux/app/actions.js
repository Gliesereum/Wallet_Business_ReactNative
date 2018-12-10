import {AsyncStorage} from 'react-native';

import {delay} from '../../utils';

const actions = {

  GLOBAL_SPINNER_ON: 'GLOBAL_SPINNER_ON',
  GLOBAL_SPINNER_OFF: 'GLOBAL_SPINNER_OFF',

  $globalSpinnerOn: () => ({ type: actions.GLOBAL_SPINNER_ON }),
  $globalSpinnerOff: () => ({ type: actions.GLOBAL_SPINNER_OFF }),

};


export default actions;
