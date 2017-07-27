import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Mine extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ tintColor }) => (
      <Icon 
        name={ 'ios-person-outline' }
        size={ 28 }
        color={ tintColor }
      />
    )
  };

  render() {
      return (
        <View>
          <Text>Mine</Text>
        </View>
      );
  }
}