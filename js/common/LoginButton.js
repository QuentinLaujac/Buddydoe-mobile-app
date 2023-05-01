'use strict';

const React = require('react');
const {StyleSheet} = require('react-native');
const FButton = require('./FButton');
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

import { TouchableHighlight, Text, View } from 'react-native';
import { logInWithFacebook } from '../actions'
import { connect } from 'react-redux'

class FBLoginButton extends React.Component {
  props: {
    dispatch: (action: any) => Promise;
  };
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <FButton
          style={[styles.button, this.props.style]}
          caption="Please wait..."
          onPress={() => {}}
        />
      );
    }

    return (
      <FButton
        style={[styles.button, this.props.style]}
        icon={require('../login/img/f-logo.png')}
        caption="Log in with Facebook"
        onPress={() => this.logIn()}
      />
    );
  }

  async logIn() {
    const {dispatch, onLoggedIn} = this.props;

    this.setState({isLoading: true});
    try {
      await Promise.race([
        dispatch(logInWithFacebook()),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } 
  }

}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}


var styles = StyleSheet.create({
  button: {
      alignItems: 'center',
      justifyContent: 'center'
  },
});


module.exports = connect()(FBLoginButton);
