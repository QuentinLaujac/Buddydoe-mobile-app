/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8MapView
 * @flow
 */
'use strict';

var ActionSheetIOS = require('ActionSheetIOS');
var PureListView = require('../../common/PureListView');
var React = require('React');
var StyleSheet = require('../../common/BuddyStyleSheet');
var View = require('View');
var { connect } = require('react-redux');

import { Image, Text, Button } from 'react-native'
var ListContainer = require('../../common/ListContainer');

class BuddyDetailEvent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ListContainer
          title="Bowling"
          backgroundImage={require('./img/bgPaysage.png')}
          backgroundColor={'#9176D2'}>
          <PureListView
            title="Infos"
            data={["test1"]}
            renderRow={this.renderRow}
          />
          <PureListView
            title="buddies"
            data={["test1"]}
            renderRow={this.renderBuddiesRow}
          />
          <PureListView
            title="Chat"
            renderEmptyList={this.renderChatRow}
          />
          <PureListView
            title="Places"
            data={["test1", "test2"]}
            renderRow={this.renderPlacesRow}
          />
        </ListContainer>
      </View>
    );
  }

  renderRow(row) {
      return (
         <Container>
                <Content>
                    <View>
                        <View>                        
                            <Text>Infos</Text>
                        </View>

                        <View>                        
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor bibendum mauris. Donec pretium ornare facilisis. Nam pharetra condimentum tortor nec vulputate. Etiam quis orci quis turpis gravida venenatis. Ut eu tellus risus. Vestibulum ornare lobortis lacus, quis tempor tellus sagittis vitae. Nulla ut lacus id ante vehicula suscipit. Nullam eget ultricies nisi.

Sed vitae ultricies justo, id ullamcorper felis. In non bibendum massa, at aliquet purus. Sed nec lacus vulputate, sollicitudin dui eu, commodo dolor. Curabitur sed venenatis ante. In et nisi ornare, maximus purus nec, facilisis nisi. Cras laoreet, eros at rutrum aliquam, nisl est imperdiet tortor, nec ultrices elit enim eu felis. Mauris mattis suscipit turpis id consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque tempor quis turpis eget feugiat.
                            </Text>
                        </View>
                   </View>
                </Content>
            </Container>
      );
  }

   renderBuddiesRow() {
        return (
          <Container>
                <Content>
                <View>
                    <View>
                        <View>
                            <Image square size={80} source={require('./img/emericProf.jpg')} />
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </View>
                        <View>
                            <Image square size={80} source={require('./img/emericProf.jpg')} />
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </View>
                        <View>
                            <Image square size={80} source={require('./img/emericProf.jpg')} />
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </View>
                        <View>
                            <Image square size={80} source={require('./img/emericProf.jpg')} />
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                        </View>
                    </View>
                </View>
                </Content>
            </Container>
        );
    }

    renderChatRow() {
        return (
            <Container>
                <Content>
                    <View>
                    <View>
                        <View>
                            <Image source={require('./img/emericProf.jpg')} />
                            <Text>Emeric Legrand</Text>
                            <Text note>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor bibendum mauris</Text>
                        </View>
                        <View>
                            <Image source={require('./img/emericProf.jpg')} />
                            <Text>Emeric Legrand</Text>
                            <Text note>Etiam quis orci quis turpis gravida venenatis. Ut eu tellus risus. Vestibulum ornare lobortis lacus, quis tempor tellus sagittis vitae. Nulla ut lacus id ante vehicula suscipit. Nullam </Text>
                        </View>
                        <View>
                            <Image source={require('./img/emericProf.jpg')} />
                            <Text>Emeric Legrand</Text>
                            <Text note>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor bibendum mauris</Text>
                        </View>
                        <View>
                            <Image source={require('./img/emericProf.jpg')} />
                            <Text>Emeric Legrand</Text>
                            <Text note>Etiam quis orci quis turpis gravida venenatis. Ut eu tellus risus. Vestibulum ornare lobortis lacus, quis tempor tellus sagittis vitae. Nulla ut lacus id ante vehicula suscipit. Nullam </Text>
                        </View>
                        <View>
                            <Image source={require('./img/emericProf.jpg')} />
                            <Text>Emeric Legrand</Text>
                            <Text note>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor bibendum mauris</Text>
                        </View>
                        <View>
                            <Image source={require('./img/emericProf.jpg')} />
                            <Text>Emeric Legrand</Text>
                            <Text note>Etiam quis orci quis turpis gravida venenatis. Ut eu tellus risus. Vestibulum ornare lobortis lacus, quis tempor tellus sagittis vitae. Nulla ut lacus id ante vehicula suscipit. Nullam </Text>
                        </View>
                    </View>
                  </View>
                </Content>
            </Container>
        );
    }

    renderPlacesRow() {
        return (
            <Button block info> Info </Button>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  directionsButton: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    ios: {
      bottom: 49,
    },
    android: {
      bottom: 0,
    },
  },
});

function select(store) {
  return {
  };
}

module.exports = connect(select)(BuddyDetailEvent);
