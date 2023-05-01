import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, TextInput, Text, ListView, Image, TouchableOpacity, Dimensions, Animated} from 'react-native';
import ProgressiveInput from '../ProgressiveInput';
import ListViewSelect from '../ListViewSelect';

var StyleSheet = require('../BuddyStyleSheet');
var BuddyColors = require('../BuddyColors');

const {width, height} = Dimensions.get('window');

class SearchModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            isLoading: false,
            modalVisible: this.props.displayModal,
            data: [],
            popoverVisible: true,
            anim: new Animated.Value(0),
        };

        this.onTyping = this.onTyping.bind(this)
        this.showPopover = this.showPopover.bind(this);
        this.setItem = this.setItem.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderButtonIcon = this.renderButtonIcon.bind(this);
        this.searchData = this.searchData.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        Animated.timing(this.state.anim, {toValue: 1, duration: 3000}).start();
        this.setModalVisible(this.props.displayModal);
        if(this.props.defaultValue !== undefined){
          this.searchData(this.props.defaultValue);
        }
    }

    componentWillReceiveProps(nextProps) {
        let modalVisible = nextProps.displayModal === undefined? this.state.modalVisible : nextProps.displayModal;
        this.setState({modalVisible:modalVisible});
    }

    renderButton() {
        return (
          <View style={[styles.skip]} >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                    this.setModalVisible(false)
                    let item={};
                    if (this.props.onEndEditing) {
                        this.props.onEndEditing({item});
                    }
                }}
            >
              <Animated.View
                style={
                  [
                    {
                      width: 40,
                      backgroundColor:"transparent",
                      transform: [
                        {
                          rotate: this.state.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', 45 + 'deg']
                          }),
                        }],
                    }]}>
                {this.renderButtonIcon()}
              </Animated.View>
            </TouchableOpacity>
          </View>
       );
    }

    renderButtonIcon() {
        return (
          <Animated.Text style={[{color:'white', fontSize:width/10, color:this.props.color, textAlign:'center'}]}>
            +
          </Animated.Text>
        );
      }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}
            >
                <View style={[{height:height, backgroundColor:"white"}]}>
                    <View>
                        <ProgressiveInput
                            ref="ProgressiveInput"
                            style={[styles.searchBar, {borderColor:this.props.color}]}
                            textInputStyle={styles.title}
                            value={this.state.searchValue}
                            isLoading={this.state.isLoading}
                            onChangeText={this.onTyping.bind(this)}
                            placeholder={this.props.title}
                            focus={false}
                            onInputCleared={()=>{this.setState({searchValue:""});this.onTyping("")}}
                            clearButtonStyle={{marginRight:10}}
                        />
                        <ListViewSelect
                            style={[styles.listViewSelect]}
                            list={this.state.data}
                            isVisible={this.state.popoverVisible}
                            onClick={(item)=>{this.setItem(item)}}
                            renderRow={this.props.renderRow}
                        />
                        {this.renderButton()}
                    </View>
                </View>
            </Modal>
        );
    }

    showPopover() {
        this.setState({popoverVisible: true});
    }

    setItem(item) {
        let value = (item.name === undefined) ? item : item.name;
        this.setState({item: item, searchValue: value});
        if (this.props.onEndEditing) {
            this.props.onEndEditing(item);
        }
        this.setState({modalVisible: false});
    }

    onTyping(text) {
        this.showPopover();
        this.setState({isLoading: true, searchValue: text});
        this.searchData(text);
    }

    searchData(text){
        this.props.searchFilter(text).then(function(data){
            if(data === null || data === undefined){
                return this.setState({isLoading:false, data: [{isEmpty:true, name:""}]});
            }
            return this.setState({isLoading: false, data: data});
        }.bind(this));
    }

}

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: width/18,
        marginLeft:0,
    },
    skip: {
        position: 'absolute',
        right: width/55,
        top: width/40,
    },
    skipText: {
       alignItems: 'center',
    },
    searchBar: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth:1,
        marginLeft: 15,
        marginRight: 15,
        marginTop:width/10,
        marginBottom:width/20,
    },
    listViewSelect: {
        height: height,
    },
    labelResult: {
        fontSize: 13, 
        fontWeight: '200',  
        margin: 15,
        marginTop:40,
        color:BuddyColors.darkText,
    },
})

module.exports = SearchModal;
