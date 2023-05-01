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

const {width, height} = Dimensions.get('window');
var BuddyColors = require('../../BuddyColors');

var widthText = 0;
export default class LauncherButtonItem extends Component {

  render() {
    let backgroundColor = (this.props.isSelected)?this.props.color:'white';
    let textColor = (this.props.isSelected)?'white':this.props.color;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
         <Animated.View style={[{opacity: this.props.button_opac, borderColor: backgroundColor,  backgroundColor: backgroundColor,
          marginTop: 10, borderWidth: 0.5, borderRadius: 5, width: this.props.width, height: 30,
          alignItems: 'center', justifyContent: 'center'}, styles.shadow]}>
             <Text style={{color: textColor, fontWeight: '400', fontSize: width/27}}>{this.props.title}</Text>
          </Animated.View>
      </TouchableOpacity>
    );
  }

}

LauncherButtonItem.propTypes = {
  index: PropTypes.number,
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func,
};

LauncherButtonItem.defaultProps = {
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
    marginTop:0,
    textAlign:'center',
    marginLeft:0,
    width: 73,
  },

  shadow : {
    shadowColor: BuddyColors.colorBack,
    shadowOffset: { "width": 0, "height": 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
});
