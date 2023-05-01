'use strict';

var MyProfile = require('./MyProfile');
var MySettings = require('./MySettings');

import React , {Component} from 'react';
import
{
  View,
  Navigator
} from 'react-native';

class ProfileNavigator extends React.Component{
  constructor(props) {
  super(props);
  }
  
  render() {
    var initialRouteID = 'MyProfileScreen';
    return (
      <Navigator
        style={{flex:1}}
        configureScene={(route) => {
    if (route.id == "MyProfileScreen") {
      return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
    } else {
      return Navigator.SceneConfigs.HorizontalSwipeJump;
    }
  }}
        initialRoute={{id: initialRouteID}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'MyProfileScreen':
        return (<MyProfile navigator={navigator} route={route} title="MyProfileScreen"/>);
      // Add more ids here
    }
  }
}


module.exports = ProfileNavigator;