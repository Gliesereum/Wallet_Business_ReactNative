// @flow
import React, {Component} from 'react';
import {View} from 'native-base';

import moment from 'moment';


type Props = {
  time: number,           // milliseconds
  onTimeOver: Function,
  mask?: String
}

type State = {
  time: number
}

class Timer extends Component<Props, State> {
  timer: any;

  state = {
    time: 0
  };

  static defaultProps = {
    time: 60000,
    mask: 'mm:ss'
  };

  componentDidMount() {
    this.initialTimer()
  }

  componentWillUnmount() {
    this.removeTimer()
  }

  initialTimer = () => {
    this.setState(state => ({...state, time: this.props.time}));
    this.timer = setInterval(this.tick, 1000);
  };

  removeTimer = () => {
    clearInterval(this.timer);
  };

  reset = () => {
    this.initialTimer()
  };

  tick = () => {
    const timeOver = this.state.time < 1000;
    if (timeOver) {
      this.removeTimer();
      this.props.onTimeOver();
      return;
    }
    this.setState(state => ({...state, time: state.time - 1000}))
  };

  renderTimer = () => {
    const date = new Date(this.state.time);
    const {mask} = this.props;
    return moment(date).format(mask);
  };

  render() {
    return this.renderTimer();
  }

}


export default Timer;
