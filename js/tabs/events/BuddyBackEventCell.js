'use strict';

var React = require('React');
var View = require('View');
var BuddyTouchable = require('../../common/BuddyTouchable');
var StyleSheet = require('../../common/BuddyStyleSheet');
var BuddyColors = require('../../common/BuddyColors');

//import Icon from 'react-native-vector-icons/MaterialIcons';

import { Component } from 'react';
import { Image, Text, Button, TouchableHighlight, Dimensions } from 'react-native';
//import { Col, Row, Grid } from 'react-native-easy-grid';


class BuddyBackEventCell extends React.Component {

  props: {
    data: any;
    onPress: ?() => void;
  };

   render () {
    /*<Icon style={styles.icon} name='chat' />
    <Icon style={styles.icon} name='motorcycle' />
    <Icon style={styles.icon} name='room' />
    <Icon style={styles.icon} name='schedule' />$*/

    return (
      <TouchableHighlight underlayColor='transparent'>
        <Image style={[styles.container]} >
          <View style={styles.header}>
            <Text style={[styles.titleHeader]}>Métro Bowling, 29 rue de la Poule 59000 Lille</Text>
            <Text style={[styles.strong]}>Il y a 4 participants</Text>
          </View>
          <View style={styles.boddy}>
                <View style={[styles.contentParticipant]}>
                  <Image style={[styles.imageParticpant]} source={require('./img/buddies/ben.png')} />
                  <Image style={[styles.imageParticpant]} source={require('./img/buddies/femme-brune.png')} />
                  <Image style={[styles.imageParticpant]} source={require('./img/buddies/melindra.png')} />
                  <Image style={[styles.imageParticpant]} source={require('./img/buddies/fred.png')} />
                </View>
          </View>
          <View style={styles.iconSection}>
             <View style={styles.groupIcon}>
                <Text style={[styles.detailIcon]}>21</Text>
            </View>
             <View style={styles.groupIcon}>
                <Text style={[styles.detailIcon]}>3</Text>
            </View>
            <View style={styles.groupIcon}>
                <Text style={[styles.detailIcon]}>1,4km</Text>
            </View>
            <View style={styles.groupIcon}>
                <Text style={[styles.detailIcon]}>19h</Text>
            </View>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }
}

var containerWidth = Dimensions.get('window').width * 0.85;
var width = Dimensions.get('window').width /1.4 ;
var marginLeftText = width /9;
const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    flex: 1,
    flexDirection: 'column',
    height: 145,
    width:containerWidth,
    marginHorizontal: 28,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:BuddyColors.lightBackground
  },
  header: {
   flex:1,
   marginTop:30,
   marginHorizontal: 10,
  },
  titleHeader:{
   color:'white',
   textAlign: 'center',
  },
  boddy: {
    flex:1
  },
  detailIcon: {
    color:'white',
  },
  strong : {
    fontWeight: 'bold',
    color:'white',
    textAlign:'center'
  },
  imageParticpant  : {
    marginHorizontal: 5,
  },
  contentParticipant : {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  groupIcon : {
     justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom:3
  },
  icon : {
    color: 'white',
    marginHorizontal: 2,
    fontSize:20
  },
  iconSection : {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

module.exports = BuddyBackEventCell;
