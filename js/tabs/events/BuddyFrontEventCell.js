'use strict';

var React = require('React');
var View = require('View');
var BuddyTouchable = require('../../common/BuddyTouchable');
var StyleSheet = require('../../common/BuddyStyleSheet');
var BuddyColors = require('../../common/BuddyColors');

import { Component } from 'react';
import { TouchableHighlight, Image, Dimensions, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var buddyLogo = require("./img/buddyLogo.png");
var location = require("./img/location.png");
var profileImage = require('../../common/img/default-image.jpg');

const {width, height} = Dimensions.get('window');
var containerWidth = width * 0.90;


class BuddyFrontEventCell extends React.Component {

   render () {
    return (
      <TouchableHighlight underlayColor='transparent'>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.card, styles.darkerShadow]}>
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <View style={{width: containerWidth / 2.5, height:30, backgroundColor:BuddyColors.colorBack, borderTopRightRadius:15, borderBottomLeftRadius:60}}>
              <View style={{marginTop:0.5, marginLeft:15, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontWeight:'600', color:'white', fontSize:11}}>
                  5
                </Text>
                <Text style={{fontWeight:'200', color:'white', fontSize:11, marginRight:-5}}> BUDDIES</Text>
                <Image style={{marginTop:-4, marginLeft:0, marginRight:-20, width:30, height:30}} source={buddyLogo}></Image>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={{marginLeft:25, marginRight:15}}>
              <View style={[{position:'absolute', borderRadius: width / 8, width: width / 4, height: width / 4, backgroundColor:'white'}, styles.darkerShadow]}></View>
              <Image style={[{borderRadius: width / 8, width: width / 4, height: width / 4}]} source={profileImage}/>
               <View
                  style={[styles.actionButton, styles.darkerShadow, {
                      marginTop:width / 5.75,
                      marginLeft:width / 6.45,
                      position:'absolute',
                      width: width / 8.25,
                      height: width / 8.25,
                      borderRadius: width / 16.5,
                      backgroundColor: '#B39DDB',
                    }]}
                >
                <Icon name={"local-bar"} style={{color:'white', fontSize:width/17, marginTop:-3}} />
              </View>
            </View>
            <View style={{marginTop:10, flexDirection: 'column', justifyContent: 'flex-start'}}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={{fontWeight:'700', color:BuddyColors.colorBack}}>Quentin</Text>
                <Text style={{fontWeight:'200', marginTop:3, fontSize:11, color:BuddyColors.darkBackground}}> propose de </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={{fontWeight:'700', color:BuddyColors.colorBack, fontSize:22}} >Boire un verre</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{fontWeight:'200', marginTop:3, fontSize:11, color:BuddyColors.darkBackground}}>à</Text>
                <Text style={{fontWeight:'700', color:BuddyColors.colorBack, fontSize:15}}> Urban bar</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:10, flexDirection: 'column'}}>
            <View style={{marginRight:10 }}>
              <View style={{justifyContent: 'flex-end', flexDirection: 'row',}}>
                <Icon name={"today"} style={{color:'white', fontSize:width/22, marginTop:-0.5, color:BuddyColors.colorBack}} />
                <Text style={{fontWeight:'400', marginTop:3, fontSize:8.75, color:BuddyColors.darkBackground, marginRight:5, marginRight:10.5}}>4 oct</Text>
                <Icon name={"watch-later"} style={{color:'white', fontSize:width/22, marginTop:-1, color:BuddyColors.colorBack}} />
                <Text style={{fontWeight:'400', marginTop:3, fontSize:8.75, color:BuddyColors.darkBackground, marginRight:5, marginRight:7.5}}>19h  </Text>
                <Icon name={"location-on"} style={{color:'white', fontSize:width/22, marginTop:-1, color:BuddyColors.colorBack}} />
                <Text style={{fontWeight:'400', marginTop:3, fontSize:8.75, color:BuddyColors.darkBackground, marginRight:3}}>1,4km </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}


var marginLeftText = width /9;
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    flex: 1,
    height: 158,
    width:containerWidth,
    backgroundColor:'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
 actionButton: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingTop: 2,
      backgroundColor: 'red',
      position: 'absolute',
  },
  darkerShadow : {
      shadowColor: BuddyColors.colorBack,
      shadowOffset: { "width": 0, "height": 2 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
  },
})

module.exports = BuddyFrontEventCell;
