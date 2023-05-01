'use strict';

var BuddyColors = require('../common/BuddyColors');
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var Image = require('Image');
var View = require('Image');
var StyleSheet = require('../common/BuddyStyleSheet');
var BuddyEventsView = require('./events/BuddyEventsView');
var Profile = require('./profile/Profile');
var CreateEventButton = require('./createEvents/CreateEventButton');

var { switchTab } = require('../actions');
var { connect } = require('react-redux');
var Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

import {
  StackNavigator,
} from 'react-navigation';
import type { Tab, Day } from '../reducers/navigation';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons';


class BuddyTabsView extends React.Component {

    props: {
        tab: Tab;
        day: Day;
        onTabSelect: (tab: Tab) => void;
        navigator: StackNavigator;
    };

    constructor(props) {
        super(props);
    }

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {
        return (
          <TabNavigator tabBarStyle={{ backgroundColor:'white'}}>
            <TabNavigator.Item
              selected={this.props.tab === 'events'}
              renderIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"view-agenda"} style={{color:BuddyColors.colorOthers, fontSize:width/12 }} /></View>}
              renderSelectedIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"view-agenda"} style={{color:BuddyColors.colorBack, fontSize:width/12 }} /></View>}
              onPress={function(){
                  this.onTabSelect('events');
              }.bind(this)}>
              {<BuddyEventsView navigator={this.props.navigator} />}
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.props.tab === 'myEvents'}
              renderIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"notifications"} style={{color:BuddyColors.colorOthers, fontSize:width/11 }} /></View>}
              renderSelectedIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"notifications"} style={{color:BuddyColors.colorBack, fontSize:width/11 }} /></View>}
              onPress={() => this.onTabSelect.bind(this, 'my-myEvents')}>
              {<BuddyEventsView navigator={this.props.navigator} />}
            </TabNavigator.Item>
            <TabNavigator.Item
              tabStyle={{ zIndex:2}}
              selected={this.props.tab === 'my-schedule'}
              renderIcon={() =>  <CreateEventButton /> }
              onPress={() => this.onTabSelect.bind(this, 'my-schedule')}>
            </TabNavigator.Item>
            <TabNavigator.Item
              tabStyle={{ zIndex:1}}
              selected={this.props.tab === 'notifications'}
              renderIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"forum"} style={{color:BuddyColors.colorOthers, fontSize:width/13 }} /></View>}
              renderSelectedIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"forum"} style={{color:BuddyColors.colorBack, fontSize:width/13 }} /></View>}
              onPress={() => this.onTabSelect.bind(this, 'my-schedule')}>
              {<BuddyEventsView navigator={this.props.navigator} />}
            </TabNavigator.Item>
            <TabNavigator.Item
            tabStyle={{ zIndex:1}}
              selected={this.props.tab === 'profile'}
              renderIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"person"} style={{color:BuddyColors.colorOthers, fontSize:width/10 }} /></View>}
              renderSelectedIcon={() => <View style={{alignItems:'center', justifyContent: 'center', marginTop:20}}><Icon name={"person"} style={{color:BuddyColors.colorBack, fontSize:width/10 }} /></View>}
              onPress={function(){
                  this.onTabSelect('profile');
              }.bind(this)}>
              {<Profile navigator={this.props.navigator} />}
            </TabNavigator.Item>
          </TabNavigator>
        );
    }

}

function select(store) {
    return {
        tab: store.navigation.tab,
        day: store.navigation.day,
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab)),
    };
}


const styles = StyleSheet.create({
    horizontalScrollView: {
        height: undefined,
    },

    iconTab: {
        width: 25,
        height: 25,
    },
   
})


module.exports = connect(select, actions)(BuddyTabsView);
