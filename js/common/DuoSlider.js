import React, { Component, PropTypes } from 'react';
import {
    View,
    Animated,
    Text,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');

import MultiSlider from '@ptomasroos/react-native-multi-slider';

class DuoSlider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            minValueStep : 0,
            maxValueStep:10,
            minValue: this.props.minDefaultValue,
            maxValue : this.props.maxDefaultValue,
            step: this.props.step,
            offset:this.props.offset,
        };

        this.sliderOneValuesChange = this.sliderOneValuesChange.bind(this);
    }

    sliderOneValuesChange(values){
        let minValueStep = values[0];
        let maxValueStep = values[1];
        let minValue = (values[0] == 0)? this.props.minDefaultValue: values[0] * this.state.step + this.state.offset + this.props.minDefaultValue;
        let maxValue = (values[1] == 10)? this.props.maxDefaultValue: values[1] * this.state.step + this.state.offset + this.props.minDefaultValue;
        this.setState({ minValueStep:minValueStep, maxValueStep:maxValueStep, minValue: minValue,  maxValue: maxValue});
        this.props.onChange(minValue, maxValue);
    }

    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Animated.View style={{opacity: this.props.button_opac, backgroundColor: this.props.color,
                        marginTop: height/87, borderRadius: 2, width: width/17, height: width/17,
                        alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '400', fontSize: height/60}}>{this.state.minValue}</Text>
                </Animated.View>
                <View style={{marginTop:20}}>
                 <MultiSlider
                    values={[this.state.minValueStep, this.state.maxValueStep]}
                    sliderLength={this.props.width/1.5}
                    selectedStyle={{
                        backgroundColor: this.props.color,
                     }}
                      containerStyle={{
                        height:40,
                      }}
                    onValuesChange={this.sliderOneValuesChange}
                  />
                  </View>
                  <Animated.View style={{opacity: this.props.button_opac, backgroundColor: this.props.color,
                        marginTop: height/87, borderRadius: 2, width: 22, height: 22,
                        alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '400', fontSize: height/60}}>{this.state.maxValue}</Text>
                </Animated.View>
            </View>
        );
    }
}


module.exports = DuoSlider;
