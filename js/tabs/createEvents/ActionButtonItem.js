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

var widthText = 0;
var {height, width} = Dimensions.get('window');
export default class ActionButtonItem extends Component {   

    render() {
        const offsetX = this.props.radius * Math.cos(this.props.angle) -10;
        const offsetY =  - height / 2.3 ;
        widthText = this.props.title.length * 8;
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
                            })
                        },
                        {
                            translateX: this.props.anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, offsetX],
                            })
                        },
                        {
                            scale: this.props.anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                        },
                    ]
                }]}
            >
            {this.props.children}

            </Animated.View>
        );
    }

}

ActionButtonItem.propTypes = {
    index: PropTypes.number,
    angle: PropTypes.number,
    radius: PropTypes.number,
    buttonColor: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
};

ActionButtonItem.defaultProps = {
    onPress: () => {
    },
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

    textIcon: {
        color: '#eceff1',
        marginTop: 55,
        textAlign: 'center',
        width: 100,
        textShadowColor: "#b0bec5",
        textShadowOffset: {width: 0.25, height: 0.25}
    },
});
