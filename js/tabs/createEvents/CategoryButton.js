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
  Dimensions
} from 'react-native';
import CategoryButtonItem from './CategoryButtonItem';
import UnderCategoryItem from './UnderCategoryItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreateEventModal from './CreateEventModal';
var BuddyColors = require('../../common/BuddyColors');

const {height, width} = Dimensions.get('window');

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

export default class CategoryButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      isSelected: props.isSelected,
      launchButton : props.launchButton,
      iconName:this.props.iconName,
      iconColor: 'transparent',
      endAnim:false,
      centerButtonColor: this.props.centerButtonColor,
      globalAnim: new Animated.Value(props.active ? 1 : 0),
      explodeButtonAnim: new Animated.Value(props.active ? 1 : 0),
      buttonSelected : null,
      outRangeScale : this.props.outRangeScale,
      selectedKeyWord : null,
      iconSousTheme:null,
      theme : null
    };

    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(nextProps) {
        if(nextProps.iconName !== undefined && nextProps.iconName !== this.state.iconName){
          this.setState({iconName: nextProps.iconName});
        }
        if(nextProps.centerButtonColor !== undefined && nextProps.centerButtonColor !== this.state.centerButtonColor){
          this.setState({centerButtonColor: nextProps.centerButtonColor});
          if(nextProps.centerButtonColor === 'transparent'){
           this.setState({iconColor: nextProps.centerButtonColor});
          } else{
             this.setState({iconColor: 'white'});
          }
        }
        if(nextProps.launchButton !== undefined && nextProps.launchButton !== this.state.launchButton){
            this.setState({launchButton: nextProps.launchButton});
             if(nextProps.launchButton){
                this.explodeButton();
            }
        }
        if(nextProps.isSelected !== undefined && nextProps.isSelected != this.state.isSelected){
          this.setState({isSelected : nextProps.isSelected});
        }
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

  explodeButton(){
    return new Promise(function(resolve, reject){
      Animated.parallel([
        Animated.spring(this.state.globalAnim, {
          toValue: 1,
          duration: 125,
        }).start(),
        Animated.timing(this.state.explodeButtonAnim, {
          toValue: 1,
          duration:125,
        }).start(()=>{
          resolve()
        })
      ]);

      this.setState({ active: true, outRangeScale:20 });
    }.bind(this));
  }

  gatherButton(){
    return new Promise(function(resolve, reject){
        Animated.spring(this.state.globalAnim, {
        toValue: 0,
        duration: 125,
      }).start(() => {
        resolve();
        }
      );
    }.bind(this));
  }

  renderButton() {
    return (
      <View
        style={this.getActionButtonStyle()}
      >
        <TouchableOpacity
          style={[styles.btn]}
          activeOpacity={0.85}
          onPress={() => {
              this.props.onPress();
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
                  backgroundColor: this.state.globalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.state.centerButtonColor, this.props.btnOutRange]
                  }),
                  transform: [
                    {
                      scale: this.state.globalAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, this.props.outRangeScale]
                      }),
                    },
                    {
                      rotate: this.state.globalAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', this.props.degrees + 'deg']
                      }),
                    }],
                }]}>
          </Animated.View>
          <Animated.View>
            {this.renderButtonIcon()}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  disappearButton() {
     return (
      <View
        style={this.getActionButtonStyle()}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.btn]}
          onPress={() => {
              this.props.onPress();
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
                  backgroundColor: this.state.centerButtonColor,
                  transform: [
                    {
                      scale: this.state.globalAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, this.state.outRangeScale]
                      }),
                    }],
                }]}>
          </Animated.View>
            <Animated.View
            style={
              [
                {
                  opacity: this.state.globalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0]
                  })
                }
              ]}>
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
    console.log(this.state.iconColor);
    console.log(this.props.btnOutRangeTxt);
    let color = (this.state.endAnim)?this.props.btnOutRangeTxt:this.state.iconColor;
    let fontSize = 20;
    return (
      <Animated.Text
        style={[styles.btnText,
                {
                  marginTop:-this.props.size/2-fontSize/2,
                  color: this.state.globalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.iconColor, this.props.btnOutRangeTxt]
                  })
                }]}>
        <Icon name={this.state.iconName} style={{color:color, fontSize:fontSize}} />
      </Animated.Text>
    );
  }

  renderActions() {
    if (!this.state.active) return null;
    const startDegree = this.props.startDegree || alignMap[this.props.position].startDegree;
    const endDegree = this.props.endDegree || alignMap[this.props.position].endDegree;
    const startRadian = startDegree * Math.PI / 180;
    const endRadian = endDegree * Math.PI / 180;

    const children = (this.state.buttonSelected == null || this.state.buttonSelected.props.children == undefined)? this.props.children: this.state.buttonSelected.props.children;
    const childrenCount = React.Children.count(children);
    let offset = 0;
    if (childrenCount !== 1) {
      offset = (endRadian - startRadian) / (childrenCount );
    }

    if(this.state.buttonSelected == null){
      return (
        React.Children.map(this.props.children, (button, index) => {
          return (
            <View
              pointerEvents="box-none"
              style={this.getActionContainerStyle()}
            >
              <CategoryButtonItem
                key={index}
                index={index}
                position={this.props.position}
                anim={this.state.globalAnim}
                size={this.props.itemSize}
                radius={this.props.radius}
                angle={startRadian + index * offset}

                {...button.props}
                onPress={() => {
                    this.gatherButton().then(()=>{
                      let toActive = button.props.children !== undefined;
                      let isSelected = button.props.children == undefined?true:this.state.isSelected;
                      if(isSelected){
                        this.props.onCategSelected();
                      }
                      this.setState({ active: toActive, theme:button.props.keyWord, isSelected : isSelected, buttonSelected: button, selectedKeyWord: button.props.keyWord})
                      this.explodeButton().then(()=>{
                        if(!toActive){
                         this.setState({endAnim:true});
                        }
                      });
                    });
                    button.props.onPress();
                  }}
              />
            </View>
          );
        })
      );
    }else{
      return (
        React.Children.map(this.state.buttonSelected.props.children, (button, index) => {
          return (
            <View
              pointerEvents="box-none"
              style={this.getActionContainerStyle()}
            >
              <UnderCategoryItem
                key={index}
                index={index}
                position={this.props.position}
                anim={this.state.globalAnim}
                size={this.props.itemSize}
                radius={this.props.radius}
                angle={startRadian + index * offset}
                {...button.props}
                onPress={() => {
                    this.gatherButton().then(()=>{
                      let toActive = button.props.children !== undefined;
                      let isSelected = button.props.children == undefined?true:this.state.isSelected;
                      if(isSelected){
                        this.props.onCategSelected();
                      }
                      this.setState({ active: toActive, isSelected : isSelected, buttonSelected: button, iconSousTheme:button.props.iconName, selectedKeyWord: button.props.keyWord})
                      this.explodeButton().then(()=>{
                        if(!toActive){
                         this.setState({endAnim:true});
                        }
                      });
                    });
                    button.props.onPress();
                  }
                }
              />
            </View>
          );
        })
      )
    }
  }


  render() {
    let backdrop;
    if (this.state.active && !this.state.isSelected) {
      backdrop = (
          <Animated.View
            style={
              {
                backgroundColor: this.props.bgColor,
                opacity: this.state.globalAnim,
                flex: 1,
              }
            }
          >
          </Animated.View>
      );
    }
    if(this.state.isSelected && this.state.endAnim) {
       backdrop = (
        <View style={{zIndex:1}}>
          <CreateEventModal 
           title={'Créer une activité'}
           color={this.state.centerButtonColor}
           iconName={this.state.iconName}
           keyWord={this.state.selectedKeyWord}
           iconSousTheme={this.state.iconSousTheme}
           theme={this.state.theme}
           iconTheme={this.props.iconName}
           onCancel={()=>{
            this.props.onCancel()
          }}
           onClick={()=>{}}
        />
        </View>
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
          {this.state.isSelected && this.disappearButton()}
          {!this.state.isSelected && this.renderButton()}
        </View>
      </View>
    );
  }
}

CategoryButton.Item = CategoryButtonItem;

CategoryButton.propTypes = {
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
  position: PropTypes.oneOf(['left', 'center', 'right']),
};

CategoryButton.defaultProps = {
  active: false,
  bgColor: 'transparent',
  buttonColor: 'rgba(0,0,0,1)',
  buttonTextColor: 'rgba(255,255,255,1)',
  position: 'center',
  outRangeScale: 1.5,
  autoInactive: true,
  onPress: () => {},
  backdrop: false,
  degrees: 45,
  size: 200,
  itemSize: 50,
  radius: width/4.3,
  btnOutRange: 'rgba(255,255,255,0)',
  btnOutRangeTxt: 'rgba(255,255,255,0)',
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
    marginTop:-37,
  },
  btnText: {
    marginTop: 0,
    marginLeft: 0,
    fontSize: 40,
    fontWeight:'500',
    backgroundColor: 'transparent',
    position: 'relative',
  },
});
