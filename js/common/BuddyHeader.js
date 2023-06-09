'use strict';

var BuddyColors = require('./BuddyColors');
var React = require('React');
var Platform = require('Platform');
var StyleSheet = require('StyleSheet');
var { Text } = require('./BuddyText');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Image = require('Image');
var ToolbarAndroid = require('ToolbarAndroid');

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
  | 'icon'         // Always use icon
  | 'title';       // Always use title

export type Foreground = 'light' | 'dark';

export type Item = {
  title?: string;
  icon?: number;
  layout?: Layout;
  onPress?: () => void;
};

export type Props = {
  title?: string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  foreground?: Foreground;
  style?: any;
  children?: any;
};

class BuddyHeaderAndroid extends React.Component {
  static height: number;
  props: Props;

  render() {
    const {leftItem, rightItem, extraItems} = this.props;
    let actions = [];
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        show: 'never',
      })));
    }

    const textColor = this.props.foreground === 'dark'
      ? BuddyColors.darkText
      : 'white';

    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{flex: 1}}>
          {this.props.children}
        </View>
      );
    }

    return (
      <View style={[styles.toolbarContainer, this.props.style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          titleColor={textColor}
          subtitleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </ToolbarAndroid>
      </View>
    );
  }

  handleActionSelected(position: number) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}


class BuddyHeaderIOS extends React.Component {
  static height: number;
  props: Props;

  render() {
    const {leftItem, title, rightItem, foreground} = this.props;
    const titleColor = foreground === 'dark' ? BuddyColors.darkText : 'white';
    const itemsColor = foreground === 'dark' ? BuddyColors.lightText : 'white';

    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      : this.props.children;
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color={itemsColor} item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color={itemsColor} item={rightItem} />
        </View>
      </View>
    );
  }

}

class ItemWrapperIOS extends React.Component {
  props: {
    item: Item;
    color: string;
  };

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress} = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}


var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

const Header = Platform.OS === 'ios' ? BuddyHeaderIOS : BuddyHeaderAndroid;
Header.height = HEADER_HEIGHT;
// $FlowFixMe
Header.__cards__ = (define) => {
  const menuItem = {
    title: 'Menu',
    icon: require('./img/hamburger.png'),
    onPress: () => alert('Menu button pressed!'),
  };
  const filterItem = {
    title: 'Filter',
    icon: require('./img/filter.png'),
    onPress: () => alert('Filter button pressed!'),
  };

  define('Simple', () => <Header title="Hello, world" />);
  define('With items', () => (
    <Header
      title="Default"
      leftItem={menuItem}
      rightItem={filterItem}
    />
  ));
  define('Forcing icons', () => (
    <Header
      title="Forcing icons"
      leftItem={{...menuItem, layout: 'icon'}}
      rightItem={{...filterItem, layout: 'icon'}}
    />
  ));
  define('Forcing title', () => (
    <Header
      title="Forcing title"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
    />
  ));
  define('With content', () => (
    <Header leftItem={menuItem}>
      <View style={{backgroundColor: '#224488'}}>
        <Text style={{color: 'yellow'}}>
          Yellow text as title
        </Text>
      </View>
    </Header>
  ));
  define('With Background', () => (
    <Header
      title="With Background"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
      style={{backgroundColor: '#224488'}}
    />
  ));
  define('With light background', () => (
    <Header
      title="Light Background"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
      style={{backgroundColor: 'white'}}
      foreground="dark"
    />
  ));
};

module.exports = Header;
