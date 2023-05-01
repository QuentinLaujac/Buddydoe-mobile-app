'use strict';

var ListContainer = require('../../common/ListContainer');
var PureListView = require('../../common/PureListView');
var StyleSheet = require('../../common/BuddyStyleSheet');
var BuddyColors = require('../../common/BuddyColors');
var ProfileView = require('../../common/ProfileView');
var BuddyDetailEvent = require('../../tabs/events/BuddyDetailEvent');
var React = require('React');
var View = require('View');
var Navigation = require('./ProfileNavigator');
var ListView = require('ListView');
var ListContainerProfile = require('../../common/ListContainerProfile');


import { Component, PropTypes } from 'react';
import { cancelStay } from '../../actions';
import { Dimensions, ScrollView, Navigator, TouchableHighlight } from 'react-native';

var { connect } = require('react-redux');
const db = require('../../services/DbServices');
const HttpServices = require('../../services/HttpServices');
var dataReturn = { type: 'USER_FIND' };

class Profile extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
            };
        db.getAllUser().then((data) => {
            let user = data.rows[data.autoinc - 1 + ""];
            this.setState({ profileFacebookId: user.facebookId });
                    });
    }

    componentDidMount() {

    }

    render() {
            return (
                <View style={styles.container}>
              <ProfileView
              profileFacebookId={this.state.profileFacebookId}
              />
            </View>
            );
    }


}

function formatDateToDisplay(sdate) {
    let date = new Date(sdate);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

function select(store) {
    if (store.stay.successDelete) {
        return { deleteStay: true };
    }
    return {};
}


var width = Dimensions.get('window').width / 1.4;
const styles = StyleSheet.create({
    containerTextButton: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    card: {
        flex: 0,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    name: {
        fontWeight: 'bold',
        color: 'white'
    },
    contentButton: {
        marginLeft: 9,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonMoreDetail: {
        backgroundColor: BuddyColors.lightBackground,
    },
    stage: {
        width: Dimensions.get('window').width,
        paddingBottom: 20,
        flex: 1
    },
    profileImage: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    header: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    viewSettingsButton: {
        alignItems: 'center',
        paddingTop: 10,
        width: Dimensions.get('window').width / 4,
        flexDirection: 'column',
    },
    settingsButton: {
        color: BuddyColors.lightBackground,
        flex: 2,
    },
    nameAge: {
        color: BuddyColors.lightBackground,
        fontSize: 20,
        textAlign: 'center'
    },
    pureListView: {
        fontSize: 10,
    },
    testEleg: {
        color: 'black',
    },
})

module.exports = connect(select)(Profile);
