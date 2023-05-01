'use strict';

var ListContainer = require('./ListContainer');
var PureListView = require('./PureListView');
var StyleSheet = require('./BuddyStyleSheet');
var BuddyColors = require('./BuddyColors');
var React = require('React');
var View = require('View');
var Navigation = require('../tabs/profile/ProfileNavigator');
var ListView = require('ListView');
var ListContainerProfile = require('./ListContainerProfile');

import { Component, PropTypes } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Text, Button, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { cancelStay } from '../actions';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Navigator, TouchableHighlight } from 'react-native';

var { connect } = require('react-redux');
const db = require('../services/DbServices');

class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            stays: [{}],
            stay: {},
            title: "",
            backgroundImage: require('../tabs/profile/img/loadingPicture.png'),
            profileImage: require('../tabs/profile/img/loadingPicture.png'),
            profileMark: '8,7/10',
            profileLevel: '10',
            profileAwards: '8',
            id: 'MyProfileScreen',
        };

        this.renderRowStats = this.renderRowStats.bind(this);
        this.renderRowStays = this.renderRowStays.bind(this);
        this.renderRowAwards = this.renderRowAwards.bind(this);
        this.goMySettings = this.goMySettings.bind(this);

        db.getAllUser().then(function(data) {
            console.log(data);
            let user = data.rows[data.autoinc - 1 + ""];
            this.setState({ user: user, title: user.firstname + " " + user.lastname, backgroundImage: { uri: user.pictureBanner, width: 430, height: 310 }, profileImage: { uri: user.pictureProfileHigh } });
        }.bind(this));

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
            <Container style={[styles.container]}>
                    <View>
                        <View />
                        <ListContainerProfile
                          backgroundImage= {require('../tabs/profile/img/fondProfile.png')}
                          profileImage={this.state.profileImage}
                          profileMark={this.state.profileMark}
                          profileLevel={this.state.profileLevel}
                          profileAwards={this.state.profileAwards}
                          title='Emeric, 39'>
                          <PureListView
                            title="Stats"
                            data={["test1"]}
                            renderRow={this.renderRowStats}
                          />
                          <PureListView
                            title="Séjours"
                            data={["test1"]}
                            renderRow={this.renderRowStays}
                          />
                          <PureListView
                            title="Awards"
                            data={["test2"]}
                            renderRow={this.renderRowAwards}
                          />
                        </ListContainerProfile>
                        <View />
                      </View>
          </Container>
        );
    }

    renderRowStats() {
        return (
          <Container>
                <Content>
                <Text>
                Statistiques
                </Text>
                </Content>
            </Container>
        );
    }

        renderRowStays() {
        return (
          <Container>
                <Content>
                <Text>
                Séjours
                </Text>
                </Content>
            </Container>
        );
    }

        renderRowAwards() {
        return (
          <Container>
                <Content>
                <Text>
                Awards
                </Text>
                </Content>
            </Container>
        );
    }

    goMySettings() {
        this.props.navigator.push({
            id: 'MySettingsScreen'
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
    color : 'black',
    },
})

module.exports = ProfileView;
