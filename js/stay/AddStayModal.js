import React, { Component } from 'react';
import { isActiveStay, createStay, skipStay } from '../actions';
import { Modal, View, TextInput, Text, ListView, TouchableOpacity, Button, Dimensions, Switch, Image } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../common/button/datePicker/DatePicker';

var StyleSheet = require('../common/BuddyStyleSheet');
var BuddyColors = require('../common/BuddyColors');
var SearchModal = require('../common/modal/SearchModal');
var { connect } = require('react-redux');

const {width, height} = Dimensions.get('window');

const DB = require('./../services/DbServices');
const HttpServices = require('./../services/HttpServices');

var SearchHotel = require('./SearchHotel');
var BuddyDatePicker = require("../common/button/datePicker/BuddyDatePicker");

var lastPosition = "";
var imgHotel = require("./img/hotelBuddydoe.png");

class AddStayModal extends React.Component {

    constructor(props) {
        super(props);
        let dateJ = new Date();

        this.state = {
            displaySearchModal: false,
            selectedHotel: {name:""},
            hasCar: false,
            position: "",
            dateDeb : dateJ,
            dateEnd: new Date(dateJ.getFullYear(), dateJ.getMonth(), dateJ.getDate()+1, 19, 0, 0),
        };

        this.onEndSearchHotelModal = this.onEndSearchHotelModal.bind(this);
        this.createStay = this.createStay.bind(this);
        this.cancelAddStay = this.cancelAddStay.bind(this);
    }

    setStayModalVisible(visible) {
        this.setState({ stayModalVisible: visible });
    }

    componentDidMount() {
        this.checkHasActiveStay();
    }

    onEndSearchHotelModal(item) {
        this.setState({nomLieu:item.name, selectedHotel: item, displaySearchModal: false });
    }

    render() {
        return (
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.props.displayModal}
              onRequestClose={() => {alert("Modal has been closed.")}}
              >
                <SearchHotel
                    onEndEditing={this.onEndSearchHotelModal}
                    displayModal={this.state.displaySearchModal} 
                    color={BuddyColors.colorBack}
                    keyWord={""}
                />
                <View>
                    <View style={[styles.header, styles.shadow, {width:width, height: height/10}]} >
                         <View style={{marginTop:height/50}}>
                            <TouchableOpacity onPress={()=>{
                                    this.cancelAddStay();
                                }}>
                                <View style={{opacity: this.props.button_opac,  backgroundColor: BuddyColors.colorBack, width: 90, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: 'white', textAlign:'center', fontWeight: '500', fontSize: height/40}}>Annuler</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:height/50}}>
                            <View> 
                                <Text style={[styles.title, {fontSize: height/40}]}>Créer un séjour</Text>
                            </View>
                        </View>
                        <View style={{marginTop:height/50}} >
                            <TouchableOpacity onPress={()=>{this.createStay().then(function(){this.checkHasActiveStay();}.bind(this))}}>
                                <View style={{opacity: this.props.button_opac,  backgroundColor: BuddyColors.colorBack,  width: 90, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}><Text style={{color: 'white', textAlign:'center', fontWeight: '500', fontSize: height/40, marginRight:5}}>Créer</Text></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
               <View style={[styles.container]}> 
                    <View>
                        <View style={[{width:width-20, borderRadius: 5, backgroundColor:"white",marginLeft:10, height:height/13.5, marginTop: height/20, marginBottom:1}, styles.shadow]}>
                            <TextInput
                                ref="search"
                                style={{color:BuddyColors.colorBack, height: height/19.5, marginLeft:30, borderColor: 'gray', borderWidth:0, fontSize: height/37.5, fontWeight: '400', textAlign:'left', marginTop:height/97.5}}
                                placeholderTextColor="#bababa"
                                placeholder="Lieu"
                                onChangeText={(text) => this.setState({nomLieu : text})}
                                blurOnSubmit={true}
                                onFocus={()=> {
                                    this.setState({displaySearchModal:true});
                                    this.refs.search.blur()
                                }}
                                value={this.state.nomLieu}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <BuddyDatePicker date={this.state.dateDeb} mode="date" placeholder="Date de début" format="DD/MM/YYYY" onDateChange={(date) => {this.setState({dateDeb: date})}} color={BuddyColors.colorBack} borderColor={"white"} shadowColor={BuddyColors.colorBack} width={(width-32)/2} marginLeft={10} marginRight={-12.5}/>
                            <BuddyDatePicker date={this.state.dateEnd} mode="date" placeholder="Date de fin" format="DD/MM/YYYY" onDateChange={(date) => {this.setState({dateEnd: date})}} color={BuddyColors.colorBack} borderColor={"white"} shadowColor={BuddyColors.colorBack} width={(width-32)/2} marginLeft={-12.5} marginRight={10}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 30, marginLeft:10, alignItems:'center'}}>
                            <Switch
                              thumbTintColor={BuddyColors.colorOthers}
                              tintColor={BuddyColors.colorOthers}
                              onTintColor={BuddyColors.colorBack}
                              onValueChange={(value) => this.setState({hasCar: value})}
                              style={[styles.shadow]}
                              value={this.state.hasCar} />
                            <Text style={{color: BuddyColors.colorBack, marginLeft:10, fontWeight: '500', fontSize: height/40}}>J'ai une voiture</Text>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Image style={{resizeMode:'cover', marginLeft:5, marginTop:height/10, width:1819/8, height:1685/8}} source={imgHotel}></Image>
                        <Text style={{color: BuddyColors.colorButton, textAlign:'center', marginTop:-10, width:1819/8, fontWeight: '500', fontSize: height/40}}>Crée un séjour pour découvrir toutes les activités autour de toi !</Text>
                    </View>
                </View>
             </Modal>
        );
    }

    async cancelAddStay(){
        const { dispatch } = this.props;
        await Promise.race([
            dispatch(skipStay()),
        ]);
    }

    async checkHasActiveStay() {
        const { dispatch } = this.props;
        let respDb = await DB.getAllUser();
        let user = respDb.rows[respDb.autoinc - 1 +""];
        await Promise.race([
            dispatch(isActiveStay(user.facebookId)),
        ]);
    }

    async createStay() {
        const { dispatch } = this.props;
        let respDb = await DB.getAllUser();
        let user = respDb.rows[respDb.autoinc - 1 +""];
        await Promise.race([
            dispatch(createStay(user.facebookId, this.state.dateDeb, this.state.dateEnd, this.state.selectedHotel.id)),
        ]);
    }

}


function select(store) {
    if(store.stay.hasSkipped){
        return {displayModal:false};
    }

    if(store.stay.hasActiveStay) {
        return {displayModal:true};
    }

    if(store.stay.successCreated) {
        return {displayModal:true};
    }

    //FIXME: corriger
    return {displayModal:true};
}


const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
    },
    header: {
        backgroundColor: BuddyColors.colorBack,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        position: 'relative',
        justifyContent: 'space-between'
    },
    shadow : {
        shadowColor: BuddyColors.colorBack,
        shadowOffset: { "width": 0, "height": 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    validateButton: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
    },
    skip: {
        position: 'absolute',
        right: 0,
        top: 20,
        padding: 15,
    },
    skipText: {
        color: 'white'
    },
    datePicker: {
        "marginBottom": 15
    },
    searchBar: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 3,
        marginLeft: 10,
        marginRight: 10,
    },
    listViewSelect: {
        marginTop: -10,
        height: 20
    },
    labelResult: {
        margin: 15,
        fontSize: 14,
        fontWeight: '400',
        color: 'white'
    },
    specialRow: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    iconPosition: {
        marginTop: 5
    },
    rowText: {
        padding: 10,
        backgroundColor: '#ffffff',
        fontWeight: '400',
    },
    rowTextSpecial: {
        marginTop: 5,
        marginLeft: 10
    },

    inputIcon: {
        marginLeft: 5,
        fontSize: 20
    },
    textInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        textAlign: 'left'
    },
    activityIndicator: {
        marginLeft: 5,
        marginRight: 5
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',

        backgroundColor: 'white',
        borderRadius: 5,
        padding: 3,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40
    }
})

module.exports = connect(select)(AddStayModal);
