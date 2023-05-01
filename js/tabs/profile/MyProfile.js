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
import { Dimensions, ScrollView } from 'react-native';
import { cancelStay } from '../../actions';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Navigator, TouchableHighlight } from 'react-native';

var { connect } = require('react-redux');
const db = require('../../services/DbServices');


class MyProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profileMark: '8,7/10',
            profileLevel: '10',
            profileAwards: '8',
            id: 'MyProfileScreen',
        };

        db.getAllUser().then(function(data) {
            console.log("zob zob zob");
            console.log(data);
            let user = data.rows[data.autoinc - 1 + ""];
            this.setState({ user: user, profileUser: user.facebookId, title: user.firstname + " " + user.lastname, backgroundImage: { uri: user.pictureBanner, width: 430, height: 310 }, profileImage: { uri: user.pictureProfileHigh } });
        }.bind(this));


        let resp = HttpServices.readByFacebookId(this.state.profileUser);
        if (resp.codeReturn == "403") {
            dataReturn.type = 'ERROR_READ';
        } else {
            let userData = resp.data[0];
        }

        db.getAllStay().then(function(data) {
            console.log(data);
            if (data.totalrows === 0) {
                return;
            }
            let stay = data.rows[data.autoinc - 1 + ""];
            let stays = [];
            stays.push(stay);
            this.setState({ stays: stays, stay: stay });
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteStay) {
            this.setState({ stays: [{}] });
        }
    }

    render() {
        return (
            <View style={styles.container}>
              <ProfileView
              profileImage={this.state.profileImage}
              profileAwards={this.state.profileAwards}
              profileLevel={this.state.profileLevel} 
              profileMark={this.state.profileMark}
              profileUser={userData}
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

module.exports = connect(select)(MyProfile);
