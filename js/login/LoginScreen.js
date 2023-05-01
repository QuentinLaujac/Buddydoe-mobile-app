'use strict';

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Animated, Image, Dimensions, StatusBar, TouchableOpacity,
} from 'react-native';

var LoginButton = require('../common/LoginButton');
var BuddyColors = require('../common/BuddyColors');

class LoginScreen extends Component {
 state = {
    anim: new Animated.Value(0),
  };


  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  }

  render() {
    return (
      <View
        style={styles.container}
        >
        <StatusBar barStyle="default" />

        <View style={styles.logo}>
          <View style={styles.h}>
             <Animated.Image
              style={this.fadeIn(700, -100)}
              source={require('./img/logo-h.png')}
            />
          </View>
          <View style={styles.hg}>
             <Animated.Image
              style={this.fadeIn(0, -50, -100)}
              source={require('./img/logo-hg.png')}
            />
          </View>
          <View style={styles.hd}>
             <Animated.Image
              style={this.fadeIn(0, -50, 100)}
              source={require('./img/logo-hd.png')}
            />
          </View>
          <View style={styles.bg}>
             <Animated.Image
              style={this.fadeIn(0, 100, -50)}
              source={require('./img/logo-bg.png')}
            />
          </View>
          <View style={styles.bd}>
             <Animated.Image
              style={this.fadeIn(0, 100, 50)}
              source={require('./img/logo-db.png')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
            <Text style={styles.grey}>B</Text><Text style={styles.lightGrey}>uddy</Text>
          </Animated.Text>
          <Animated.Text style={[styles.h1, {marginTop: -30}, this.fadeIn(700, 20)]}>
            <Text style={styles.grey}>Doe</Text>
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
          <Text style={styles.loginComment}>
            Use Facebook to log on.
          </Text>
          <LoginButton source="First screen" />
        </Animated.View>
      </View>
    );
  }

  fadeIn(delay, from = 0, x =0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [x, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }

  fadeLeft(delay, from = 0, x =0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [x, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }




}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(74 * scale),
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    textAlign: 'center',
  },
  logo: {
    alignItems: 'center',
    marginLeft: -130,
    marginTop: 70
  },
  hg: {
    marginLeft: 20,
    marginTop: -84,
    top: 49,
  },
  bg: {
     marginLeft: 52,
     marginTop: 50,
  },
  hd: {
    marginLeft: 238,
    marginTop: -68,
    top: 49,
  },
  bd: {
    marginLeft: 204,
    marginTop: -70,
  },
  h: {
    marginLeft: 130,
    marginTop: 0,
  },
  lightGrey: {
    color: BuddyColors.lightText
  },
  grey: {
    color:BuddyColors.darkText
  },
});


module.exports = LoginScreen;