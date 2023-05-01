'use strict';


import {
  StackNavigator,
} from 'react-navigation';

var React = require('React');
var Platform = require('Platform');
var BackHandler = require('BackHandler');
var StyleSheet = require('StyleSheet');
var BuddyTabsView = require('./tabs/BuddyTabsView');
var { connect } = require('react-redux');
var { switchTab } = require('./actions');
var BuddyDetailEvent = require('./tabs/events/BuddyDetailEvent');

const App = StackNavigator({
  Home: { screen: BuddyTabsView },
  BuddyDetailEvent: { screen: BuddyDetailEvent },
});


var BuddyNavigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount: function() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener: function(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton: function() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  },

  render: function() {
    // if (route.detailEvent) {
    //   return (
    //     <BuddyDetailEvent />
    //   );
    // }
    return <BuddyTabsView navigator={navigator} />;
  },

});

BuddyNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(BuddyNavigator);
