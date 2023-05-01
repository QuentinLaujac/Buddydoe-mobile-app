'use strict';

var PureListView = require('../../common/PureListView');
var StyleSheet = require('../../common/BuddyStyleSheet');
var BuddyColors = require('../../common/BuddyColors');
var React = require('React');
var View = require('View');
var Navigation = require('./ProfileNavigator');


import { Component, PropTypes } from 'react';
import { Dimensions, ScrollView, Image } from 'react-native';
import { cancelStay } from '../../actions';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Navigator, TouchableHighlight } from 'react-native';

var { connect } = require('react-redux');
const db = require('../../services/DbServices');

class MySettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            stays: [{}],
            stay: {},
            title: "Mes paramètres",
            backgroundImage: require('./img/bgPaysage.png'),
            profileImage: require('./img/default-image.jpg'),
            id: 'MySettingsScreen',
        };

        //this.renderRow = this.renderRow.bind(this);
        //this.putCancelStay = this.putCancelStay.bind(this);

        db.getAllUser().then(function(data) {
            console.log('data : ', data);
            let user = data.rows[data.autoinc - 1 + ""];
            this.setState({ user: user, profileImage: { uri: user.pictureProfileHigh } });
            console.log('user : ', user)
        }.bind(this));


    };

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
          <View style={[styles.container]}>
              <BuddyDetailEvent />
          </View>
        );
    }


    goMyProfile() {
        this.props.navigator.push({
            id: 'MyProfileScreen'
        });
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
    title: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
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
        backgroundColor: '#EFEFF4',
        paddingBottom: 20,
        flex: 1
    },
    header: {
        backgroundColor: BuddyColors.lightBackground,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        height: 80,
        elevation: 3,
    },
    backIcon: {
        backgroundColor: BuddyColors.lightBackground,
        width: 50,
    },
    container: {
        backgroundColor: 'white',
    },
    iconLeft: {
        color: 'white',
    },
    profileImage: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

module.exports = connect(select)(MySettings);
