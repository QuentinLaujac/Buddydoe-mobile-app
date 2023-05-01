'use strict';

var BuddyColors = require('./BuddyColors');
var React = require('React');
var ReactNative = require('react-native');
var StyleSheet = require('./BuddyStyleSheet.js');
var View = require('View');

import { Dimensions, Card, Image, Text, Button, TouchableOpacity, TouchableHighlight, ActivityIndicator, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

type Props = {
    startDate: string;
    startDateMonth: string;
    endDate: string;
    endDateMonth: string;
    year: string;
    town: string;
    hotel: string;
};

type State = {
};


class CardStayList extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    startDate: '01',
    startDateMonth: 'Jan',
    endDate: '01',
    endDateMonth: 'Jan',
    year: '1970',
    address1: 'N/A',
    address2: 'N/A',
    hotel: 'N/A',
  };

  constructor(props: Props) {
    super(props);

    this.state = {

    };

    //(this: any).renderFooter = this.renderFooter.bind(this);
    //(this: any).onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
    }
  }

  render() {
    return (
        <View style={[styles.global]}>
        <View style={[styles.borderCut]}>
        </View>
        <View style={[styles.barItemsContent]}>
            <View style={[{width:width-20, backgroundColor:'white', minHeight:55, flexDirection: 'row', borderRadius:5, borderLeftWidth: 0, borderLeftColor: BuddyColors.colorButton, borderColor: BuddyColors.colorBack, borderWidth: 0}]}>
                <View style={{backgroundColor:"white", flex:2, alignItems:'center', justifyContent:'center', borderRadius:15}}>
                    <Icon name="bed" size={20} color={BuddyColors.colorButton} />
                </View>
                <View style={{backgroundColor:"white", flex:2, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:14, color:BuddyColors.colorBack, textAlign:'center', fontWeight:'700' }}>{this.props.startDate}</Text>
                    <Text style={{fontSize:10, color:BuddyColors.colorBack, textAlign:'center' }}>{this.props.startDateMonth}</Text>
                </View>
                <View style={{backgroundColor:"white", flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Icon name="angle-right" size={20} color={BuddyColors.colorButton} />
                </View>
                <View style={{backgroundColor:"white", flex:2, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:14, color:BuddyColors.colorBack, textAlign:'center', fontWeight:'700' }}>{this.props.endDate}</Text>
                    <Text style={{fontSize:10, color:BuddyColors.colorBack, textAlign:'center' }}>{this.props.endDateMonth}</Text>
                </View>
                <View style={{backgroundColor:'white', flex:9, justifyContent: 'center', borderRadius:15}}>
                    <Text style={{fontSize:14, color:BuddyColors.colorBack, textAlign:'center', fontWeight:'700', marginLeft: 5 }}>{this.props.hotel}</Text>
                    <Text style={{fontSize:10, color:BuddyColors.colorBack, textAlign:'center', fontWeight:'400', marginLeft: 5  }}>{this.props.address1}</Text>
                    <Text style={{fontSize:10, color:BuddyColors.colorBack, textAlign:'center', fontWeight:'400', marginLeft: 5  }}>{this.props.address2}</Text>
                </View>
            </View>
        </View>
        <View style={[styles.borderCut]}>
        </View>
                </View>
    );
  }
}

var styles = StyleSheet.create({
    barItemsContent: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        borderBottomWidth : 1,
    },
    global: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderCut: {
        flex:1,
    },
    shadow : {
        shadowColor: '#000',
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    cardShadow : {
        shadowColor: '#000',
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

module.exports = CardStayList;