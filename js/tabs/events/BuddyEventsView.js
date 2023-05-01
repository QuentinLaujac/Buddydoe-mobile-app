'use strict';

var ListContainer = require('../../common/ListContainer');
var StyleSheet = require('../../common/BuddyStyleSheet');
var BuddyColors = require('../../common/BuddyColors');
var BuddyFrontEventCell = require('./BuddyFrontEventCell');
var BuddyBackEventCell = require('./BuddyBackEventCell');
var PureListView = require('../../common/PureListView');
var EventsSectionHeader = require('./EventsSectionHeader');
var React = require('React');
var Relay = require('react-relay');
var View = require('View');
var Dimensions = require('Dimensions');

var ListView = require('ListView');

import { Component } from 'react';
import { Image, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var buddydoeText = require("./img/BuddydoeText.png");
const {width, height} = Dimensions.get('window');


var events = [
    { value: "test1", date: "Today", id: "1", name: "Emeric", activity: "Jeux", activityName: "Bowling", desc: "Je vous propose une ou deux parties de Bowling en toute simplicité", nbStars: 3 },
    { value: "test1", date: "Today", id: "2", name: "Jean", activity: "Tourisme", activityName: "tour", desc: "Je vous propose de faire un tour", nbStar: 0 },
    { value: "test1", date: "Tomorrow", id: "3", name: "Mike", activity: "Concert", activityName: "concert", desc: "Un concert ca vous dit ?", nbStars: 0 },
    { value: "test1", date: "Tomorrow", id: "4", name: "Armand", activity: "Sports", activityName: "jogging", desc: "On se fait un petit 10km", nbStars: 3 },
    { value: "test1", date: "Tomorrow", id: "5", name: "Emeric", activity: "Gastronomie", activityName: "Restaurant", desc: "Je vous propose de boire un verre", nbStars: 0 },
    { value: "test1", date: "Tomorrow", id: "3", name: "Mike", activity: "Concert", activityName: "concert", desc: "Un concert ca vous dit ?", nbStars: 0 },
    { value: "test1", date: "Tomorrow", id: "4", name: "Armand", activity: "Sports", activityName: "jogging", desc: "On se fait un petit 10km", nbStars: 3 },
    { value: "test1", date: "Tomorrow", id: "5", name: "Emeric", activity: "Gastronomie", activityName: "Restaurant", desc: "Je vous propose de boire un verre", nbStars: 0 },
];


type State = {
    contentHeight: number;
    dataSource: ListView.DataSource;
};


class BuddyEventsView extends React.Component {
    props: Props;
    state: State;
    contentHeight: number;

    static defaultProps = {
        data: [],
        contentInset: { top: 0, bottom: 0 },
        // TODO: This has to be scrollview height + fake header
        minContentHeight: Dimensions.get('window').height + 20,
    };

    constructor(props) {
        super(props);
        (this: any).renderRow = this.renderRow.bind(this);
        (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
        (this: any).openEvent = this.openEvent.bind(this);
        (this: any).onContentSizeChange = this.onContentSizeChange.bind(this);

        const ds = new ListView.DataSource({
            getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
            getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            contentHeight: 0,
            dataSource: ds.cloneWithRowsAndSections(convertEventArrayToMap()),
        };
    }

    render() {
        const { contentInset } = this.props;
        const bottom = 0 +
            Math.max(0, this.props.minContentHeight - this.state.contentHeight);
        return (
            <View style={[styles.container]}> 
               <View style={[styles.header]} >
                     <View style={{width:width/3}}>
                     </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', width:width/3}}> 
                        <Image style={[{ width: 128 / 1.5, height: 41 / 1.5}]} source={buddydoeText}/>
                    </View>
                    <View style={{width:width/3, alignItems: 'flex-end', justifyContent: 'center'}} >
                        <TouchableOpacity onPress={()=>{}}>
                            <Icon name={"filter-list"} style={{color:'white', fontSize:width/11, marginTop:-0.5, marginRight:width/40}} />
                        </TouchableOpacity>
                    </View>
                </View>
              <View>
                 <ListView style={[styles.listEvent]}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  renderSectionHeader={this.renderSectionHeader}
                  contentInset={{bottom, top: contentInset.top}}
                  onContentSizeChange={this.onContentSizeChange}
                />
              </View>
          </View>
        );
    }

    renderRow(row) {
        var keyFrontCell = "front" + row.id;
        var keyBackCell = "back" + row.id;
        let marginTop = row.id === "1"?12.5:7;
        return (
            <View style={[{marginBottom:7, marginTop:marginTop}]}>
                <BuddyFrontEventCell onPress={() => this.openEvent("coucou")} data={row} key={keyFrontCell} />
            </View>
        );
    }

    renderSectionHeader(sectionData, date) {
        //<EventsSectionHeader title={date} />
        return null;
    }

    openEvent(event) {
        // this.props.navigator.push({
        //     detailEvent: true
        // });
    }


    onContentSizeChange(contentWidth: number, contentHeight: number) {
        // if (contentHeight !== this.state.contentHeight) {
        //   this.setState({contentHeight});
        // }
    }

}

function convertEventArrayToMap() {
    var eventDateMap = {}; // Create the blank map
    events.forEach(function(eventItem) {
        if (!eventDateMap[eventItem.date]) {
            // Create an entry in the map for the date if it hasn't yet been created
            eventDateMap[eventItem.date] = [];
        }

        eventDateMap[eventItem.date].push(eventItem);

    });

    return eventDateMap;

}


const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        color: 'white'
    },
    titleSecond: {
        fontWeight: '600',
        color: BuddyColors.colorButton,
    },
    listEvent: {},
    header: {
        backgroundColor: BuddyColors.colorBack,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:15,
        height: 50,
        elevation: 3,
        position: 'relative',
        justifyContent: 'space-between'
    },
    container: {
        backgroundColor: 'transparent',
    },
    scrollView: {
        height: undefined,
        marginTop: 10,
        marginBottom: 10
    },
    horizontalScrollView: {
        height: undefined,
    }
})

module.exports = BuddyEventsView;
