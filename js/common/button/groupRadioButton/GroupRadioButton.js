import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import RadioButton from './RadioButton';
var BuddyColors = require('../../BuddyColors');

export default class GroupRadioButton extends Component {

  constructor(props) {
    super(props);
    
    var stateButtonsSelected = [];
    var selectedIndex = 0;
    React.Children.map(this.props.children, (button, index) => {
        stateButtonsSelected[index] = button.props.isSelected;
        selectedIndex = (button.props.isSelected)?index:selectedIndex;
    });
    this.state = {
      stateButtonSelected: stateButtonsSelected,
      selectedIndex: selectedIndex,
    };

  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.props.children && this.renderButtons()}
      </View>
    );
  }

  renderButtons() {
    return (
      React.Children.map(this.props.children, (button, index) => {
        return (
            <RadioButton 
                {...button.props} 
                isSelected={this.state.stateButtonSelected[index]} 
                onPress={() => {
                 let tmpButtonSelected = this.state.stateButtonSelected;
                 let selectedIndex = this.state.selectedIndex;
                 tmpButtonSelected[selectedIndex] = false;
                 tmpButtonSelected[index] = true;
                 selectedIndex = index;
                 this.setState({stateButtonSelected : tmpButtonSelected, selectedIndex: selectedIndex}); 
                 button.props.onPress();
                }}/>
        );
      })
    );
  }
}


GroupRadioButton.Item = RadioButton;

GroupRadioButton.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  size: PropTypes.number,
  itemSize: PropTypes.number,
  autoInactive: PropTypes.bool,
  onPress: PropTypes.func,
  backdrop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
  radius: PropTypes.number,
  children: PropTypes.node,
  position: PropTypes.oneOf(['left', 'center', 'right']),
};

GroupRadioButton.defaultProps = {
  active: false,
  bgColor: 'transparent',
  buttonColor: 'rgba(0,0,0,1)',
  buttonTextColor: 'rgba(255,255,255,1)',
  position: 'center',
  outRangeScale: 1,
  autoInactive: true,
  onPress: () => {},
  backdrop: false,
  degrees: 45,
  size: 63,
  itemSize: 36,
  radius: 100,
  btnOutRange: 'rgba(255,255,255,1)',
  btnOutRangeTxt: BuddyColors.lightBackground,
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  actionContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  actionBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginLeft:-15,
    marginTop:-10,
    shadowColor: '#444',
    shadowRadius: 1,
  },
  btnText: {
    marginTop: -8,
    marginLeft: 0,
    fontSize: 40,
    fontWeight:'300',
    backgroundColor: 'transparent',
    position: 'relative',
  },
});
