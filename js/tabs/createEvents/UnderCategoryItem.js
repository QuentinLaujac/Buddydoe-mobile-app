import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

var widthText = 0;

export default class UnderCategoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonColor: props.buttonColor,
    };
  }

  componentWillReceiveProps(nextProps) {
    let bgColor = nextProps.buttonColor !== undefined ? nextProps.buttonColor : this.state.buttonColor;
    this.setState({buttonColor: bgColor});
  }

  render() {
    const pairOffsetX = 2;
    const pairOffsetY = 2;
    const offsetX = this.props.radius * Math.cos(this.props.angle)*pairOffsetX*0.7;
    const offsetY = this.props.radius * Math.sin(this.props.angle)*pairOffsetY*0.7;
    widthText = this.props.title.length*8;
    return (
      <Animated.View
        style={[{
            opacity: this.props.anim,
            width: this.props.size,
            height: this.props.size,
            transform: [
              {
                translateY: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, offsetY],
                }) },
              {
                translateX: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, offsetX],
                }) },
              {
                scale: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }) },
            ]
          }]}
      >
        <TouchableOpacity style={{flex:1}} activeOpacity={this.props.activeOpacity || 0.85} onPress={this.props.onPress}>
          <View
            style={[styles.actionButton,{
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                backgroundColor: this.state.buttonColor,
              }]}
          >
            <Text style={styles.textIcon}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

}

UnderCategoryItem.propTypes = {
  index: PropTypes.number,
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  iconName: PropTypes.string,
  onPress: PropTypes.func,
};

UnderCategoryItem.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
    backgroundColor: 'red',
    position: 'absolute',
  },

  textIcon : {
    color:'white',
    backgroundColor:'transparent',
    marginTop:1,
    textAlign:'center',
    marginLeft:0,
    fontWeight:'500',
    fontSize:width/32,
    width: width/6,
  },
});
