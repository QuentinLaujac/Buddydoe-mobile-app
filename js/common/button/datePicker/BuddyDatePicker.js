import React, { Component, PropTypes } from 'react';

import DatePicker from './DatePicker';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

var BuddyColors = require('../../BuddyColors');

class BuddyDatePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: null,
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.date !== this.state.date) {
            this.setState({ date: nextProps.date });
        }
    }

    render() {
        return (
            <DatePicker
              date={this.state.date}
              mode={this.props.mode}
              placeholder={this.props.placeholder}
              format={this.props.format}
              confirmBtnText="Ok"
              cancelBtnText="Annuler"
              showIcon={false}
              customStyles={{
                placeholderText: {
                    fontSize: 17,
                    color:this.props.color,
                    textAlign:'center',
                },
                btnTextConfirm: {
                    color:this.props.color,
                },
                dateTouchBody : {
                    width : this.props.width,
                },
                dateText: {
                    fontSize: height/37.5,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: this.props.color,
                },
                dateInput: {
                    backgroundColor: 'white',
                    borderRadius: 5,
                    padding: 3,
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: this.props.marginLeft,
                    marginRight: this.props.marginRight,
                    height: height/13.5,
                    width : this.props.width,
                    flexDirection: 'row',
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: this.props.borderColor,
                    justifyContent:'center',
                    alignSelf: 'stretch',
                    shadowColor: this.props.shadowColor,
                    shadowOffset: { "width": 0, "height": 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.5,
                }
            }}
              onDateChange={(date) => {this.props.onDateChange(date)}}
            />
        );
    }
}

module.exports = BuddyDatePicker;
