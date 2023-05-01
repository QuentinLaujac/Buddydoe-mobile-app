'use strict';

import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function BuddyTouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const BuddyTouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : BuddyTouchableIOS;

module.exports = BuddyTouchable;
