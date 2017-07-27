import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Record extends Component {
  static navigationOptions = {
    tabBarLabel: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon 
        name={ 'ios-videocam-outline' }
        size={ 42 }
        color={ tintColor }
      />
    ),
    tabBarLabel: (() => (null))
  };

  render() {
      return (
        <View>
          <Text>Record</Text>
        </View>
      );
  }
}