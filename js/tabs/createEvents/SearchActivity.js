import React, { Component, PropTypes } from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
var SearchModal = require('../../common/modal/SearchModal');
var StyleSheet = require('../../common/BuddyStyleSheet');
var BuddyColors = require('../../common/BuddyColors');

var hotels;

var starIcon = require("./img/star.png");

const DB = require('../../services/DbServices');
const HttpServices = require('../../services/HttpServices');
const {width, height} = Dimensions.get('window');

class SearchActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            launchButtons: false,
        };

        this.toogleLauncherButton = this.toogleLauncherButton.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.renderRow = this.renderRow.bind(this);
        DB.getAllHotel().then(function (result) {
            hotels = result.rows[1].data;
        });
    }

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({ active: nextProps.active });
        }
    }

    toogleLauncherButton() {
        this.setState({ launchButtons: !this.state.launchButtons });
        if (!this.state.launchButtons) {
            this.setState({ centerButtonColor: BuddyColors.lightBackground })
            this.setState({ showPopup: !this.state.showPopup })
        }
    }

    selectedItem(iconName, color) {
        this.setState({ centerButtonIcon: iconName });
        this.setState({ centerButtonColor: color })
    }

    //filter(data => data.name.toLowerCase().includes(text.toLowerCase())).

    searchFilter(text){
        return new Promise(function(resolve, reject){
            HttpServices.searchActivity(this.props.keyWord, text, "50.633333,3.066667", 50000).then(function (resp) {
                if (resp.codeReturn == "201" && Array.isArray(resp.data)) {
                    nearHotels = resp.data;
                    let searchFilter = [];
                    if (nearHotels != undefined) {
                        searchFilter = nearHotels.map(
                            data => {
                                if(data != null || data != undefined){
                                    data.name = data.name.toLowerCase();
                                    data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                                    return data;
                                }
                            }
                        );
                    } 
                    if(text === this.props.keyWord){
                        searchFilter.sort(function(a, b) {
                          if (parseInt(a.distance) < parseInt(b.distance)) {
                            return -1;
                          }
                          if (parseInt(a.distance) > parseInt(b.distance)) {
                            return 1;
                          }
                          return 0;
                        });
                    }
                    
                    if (searchFilter.length > 0) {
                        resolve(searchFilter);
                    }else{
                        resolve();
                    }
                }
            }.bind(this));
        }.bind(this));
    }

    renderRow(rowData){
        let name = rowData.name !== null && rowData.name.length > 25 ? rowData.name.substring(0, 25)+"..." : rowData.name;
        let row = <View>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                        <Text style={styles.rowText}>{name}</Text>
                        <Text style={styles.distanceText}>{rowData.distance} km</Text>
                    </View>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                        <Text style={styles.adresse}>{rowData.address}</Text>
                        <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                            <Text style={styles.rating}>{rowData.rating} / 5</Text>
                            <Image style={{marginTop:-5, marginLeft:-5, marginRight:5}} source={starIcon}></Image>
                        </View>
                    </View>
                  </View>;
        if (rowData.isEmpty) {
            let noResult = this.state.data.length === 0 || this.state.searchValue === ""? null : "AUCUN RESULTAT =(";
            row = <Text style={[styles.emptyRow, {color:this.props.color}]}>{noResult}</Text>;
        } else if (rowData.value !== undefined) {
            row = <View style={styles.specialRow}><Text style={styles.rowTextSpecial}>{rowData.value}</Text></View>;
        }
        return row;
    }

    render() {
        let defaultValue = this.props.keyWord.toLowerCase() === "autre" ? "" : this.props.keyWord; 
        return (
             <SearchModal 
                title="Rechercher un lieu"
                placeholder="Saisissez votre recherche"
                searchFilter={this.searchFilter}
                onEndEditing={this.props.onEndEditing}
                displayModal={this.props.displayModal} 
                renderRow={this.renderRow}
                defaultValue={defaultValue}
                color={this.props.color}
            />
        );
    }
}

const styles = StyleSheet.create({
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
        fontWeight: '700',
        fontSize:width / 20,
        color: BuddyColors.darkText,
        marginLeft:5,
    },
    distanceText: {
        padding: 10,
        backgroundColor: '#ffffff',
        fontWeight: '200',
        fontSize:width / 22,
        color: BuddyColors.darkText
    },
    adresse: {
        padding: 10,
        fontWeight: '200',
        fontSize:width / 30,
        color: BuddyColors.darkText,
        marginLeft:5, 
        marginTop:-15,
        width:(3*width)/4,
    },
    rating: {
        padding: 10,
        fontWeight: '200',
        fontSize:width / 30,
        color: BuddyColors.darkText,
        marginLeft:5, 
        marginTop:-15
    },
    rowTextSpecial: {
        marginTop: 5,
        marginLeft: 10
    },
    emptyRow:{
        padding: 10,
        fontSize: 13,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: '200',
    }
})

module.exports = SearchActivity;
