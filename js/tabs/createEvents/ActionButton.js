import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ActionButtonItem from './ActionButtonItem';
var BuddyColors = require('../../common/BuddyColors');

const alignMap = {
  center: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    startDegree: 180,
    endDegree: 360,
  },

  left: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    startDegree: 270,
    endDegree: 360,
  },

  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    startDegree: 180,
    endDegree: 270,
  },
};

export default class ActionButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      onEndAction : props.onEndAction,
      anim: new Animated.Value(props.active ? 1 : 0),
      animOnAction : new Animated.Value(props.active ? 1 : 0),
      displayDisappearAction : false,
      categSelected:false,
    };

    this.disappearButton = this.disappearButton.bind(this);
    this.appearButton = this.appearButton.bind(this);

    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(nextProps) {
    let displayDisappearAction = nextProps.displayDisappearAction != undefined? nextProps.displayDisappearAction:this.state.displayDisappearAction;
    let categSelected = nextProps.categSelected != undefined? nextProps.categSelected : this.state.categSelected;
    if(nextProps.displayDisappearAction != this.state.displayDisappearAction && displayDisappearAction){
      this.disappearButton();
    }else if (nextProps.displayDisappearAction != this.state.displayDisappearAction && !displayDisappearAction){
      this.reset();
    }
    this.setState({categSelected: categSelected, displayDisappearAction : displayDisappearAction});
  }

  getActionButtonStyle() {
    return [styles.actionBarItem, this.getButtonSize()];
  }

  getActionContainerStyle() {
    const {alignItems, justifyContent} = alignMap[this.props.position];
    return [styles.overlay, styles.actionContainer, {
      alignItems,
      justifyContent,
    }];
  }
  getActionsStyle() {
    return [this.getButtonSize()];
  }

  getButtonSize() {
    return {
      width: this.props.size,
      height: this.props.size,
    };
  }


  animateButton() {
    Animated.spring(this.state.anim, {
      toValue: 1,
      duration: 250,
    }).start();

    this.setState({ active: true });
    setTimeout(() => {
        this.state.onEndAction();
    }, 250);
  }

  reset() {
    Animated.spring(this.state.anim, {
      toValue: 0,
      duration: 250,
    }).start();

    this.appearButton();

    setTimeout(() => {
      this.setState({ active: false });
      this.state.onEndAction();
    }, 250);
  }

  disappearButton(){
    Animated.spring(this.state.animOnAction, {
      toValue: 1,
      duration: 250,
    }).start();
  }

  appearButton(){
    Animated.spring(this.state.animOnAction, {
      toValue: 0,
      duration: 250,
    }).start(()=>this.setState({displayDisappearAction : false}));
  }

  renderButton() {
    return (
      <View
        style={this.getActionButtonStyle()}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
              this.props.onPress();
              if (this.props.children) {
                if(this.state.active){
                  if(!this.state.categSelected){
                    return this.reset();
                  }
                }else{
                  this.animateButton();
                }
              }
            }}
        >
          <Animated.View
            style={
              [
                styles.btn,
                {
                  width: this.props.size,
                  height: this.props.size,
                  borderRadius: this.props.size / 2,
                  backgroundColor: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.buttonColor, this.props.btnOutRange]
                  }),
                  transform: [
                    {
                      scale: this.state.animOnAction.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                      }),
                    },
                    {
                      rotate: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', this.props.degrees + 'deg']
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
    if (this.props.icon) {
      return this.props.icon;
    }

    return (
      <Animated.Text
        style={[styles.btnText,
                {
                  color: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.buttonTextColor, this.props.btnOutRangeTxt]
                  })
                }]}>
        +
      </Animated.Text>
    );
  }

  renderActions() {
    if (!this.state.active) return null;
    const startDegree = this.props.startDegree || alignMap[this.props.position].startDegree;
    const endDegree = this.props.endDegree || alignMap[this.props.position].endDegree;
    const startRadian = startDegree * Math.PI / 180;
    const endRadian = endDegree * Math.PI / 180;

    const childrenCount = React.Children.count(this.props.children);
    let offset = 0;
    if (childrenCount !== 1) {
      offset = (endRadian - startRadian) / (childrenCount - 1);
    }

    return (
      React.Children.map(this.props.children, (button, index) => {
        return (

          <View
            pointerEvents="box-none"
            style={this.getActionContainerStyle()}
          >
            <ActionButtonItem
              key={index}
              index={index}
              position={this.props.position}
              anim={this.state.anim}
              size={this.props.itemSize}
              radius={this.props.radius}
              angle={startRadian + index * offset}
              btnColor={this.props.btnOutRange}
              {...button.props}
              onPress={() => {
                  button.props.onPress();
                }}
            />
          </View>
        );
      })
    );
  }


  render() {
    let backdrop;
    if (this.state.active) {
      backdrop = (
          <Animated.View
            style={
                    {
                      backgroundColor: this.props.bgColor,
                      opacity: this.state.anim,
                      flex: 1,
                    }
                  }
          >
            {this.props.backdrop}
          </Animated.View>
      );
    }
    return (
      <View
        pointerEvents="box-none"
        style={styles.overlay}
      >
        {backdrop}

        {this.props.children && this.renderActions()}

        <View
          pointerEvents="box-none"
          style={this.getActionContainerStyle()}
        >
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

ActionButton.Item = ActionButtonItem;

ActionButton.propTypes = {
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

ActionButton.defaultProps = {
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
  btnOutRangeTxt: BuddyColors.colorBack,
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
