import React, {Component} from 'react';
import {connect} from "react-redux";
import { withNavigation } from 'react-navigation';

import {View, Text} from "native-base";


import {asyncRequest} from "../../utils";

import authActions from '../../redux/auth/actions';



class LoadUser extends Component {

  componentWillMount(){
    // this.initLoading();
  }

  initLoading = async () =>{
    try {
      const user = await asyncRequest('user/me');
      const business = await asyncRequest('user/business');
      await this.props.$authUser({user});
      await this.props.$authBusiness({...business});
    }
    catch (e) {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View><Text>Welcome, user!</Text></View>
    )
  }

}

export default LoadUser;
