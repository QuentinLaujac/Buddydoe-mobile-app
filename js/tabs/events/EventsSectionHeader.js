'use strict';

var BuddyColors = require('../../common/BuddyColors');
import LinearGradient from 'react-native-linear-gradient';
var React = require('React');
var StyleSheet = require('StyleSheet');
import {Text} from 'react-native';

class EventsSectionHeader extends React.Component {
  props: {
    title: string;
  };

  render() {
    return (
      <LinearGradient colors={['#F4F6F7', '#EBEEF1']} style={styles.header}>
        <Text style={styles.label}>
          {this.props.title}
        </Text>
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    height: 32,
    justifyContent: 'center',
    paddingLeft: 17,
  },
  label: {
    color: BuddyColors.lightText,
  },
});

module.exports = EventsSectionHeader;
