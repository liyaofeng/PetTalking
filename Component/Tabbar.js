import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator } from 'react-navigation';
import { BaseColor } from './Commond/Config'

import Main from './Main/Main';
import Record from './Record/Record';
import Mine from './Mine/Mine';

export default TabNavigator({
  Main: { screen: Main },
  Record: { screen: Record },
  Mine: { screen: Mine }
}, {
  tabBarOptions: {
    activeTintColor: BaseColor
  }
});