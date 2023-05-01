import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { checkLoginStatus } from './actions'

var LoginScreen = require('./login/LoginScreen');
var { connect } = require('react-redux');
var StatusBar = require('StatusBar');
var BuddyNavigator = require('./BuddyNavigator');
var AddStayModal = require('./stay/AddStayModal');

var BuddyDoeApp = React.createClass({

    componentDidMount: function() {
        this.props.dispatch(checkLoginStatus());
    },

    render: function() {
        if (!this.props.isLoggedIn) {
            return <LoginScreen />;
        }
        return (
            <View style={styles.container}>
              <StatusBar
                translucent={true}
                backgroundColor="rgba(0, 0, 0, 0.2)"
                barStyle="light-content"
               />
               <AddStayModal />
              <BuddyNavigator />
            </View>
        );
    }

});


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    };
}

module.exports = connect(select)(BuddyDoeApp);
