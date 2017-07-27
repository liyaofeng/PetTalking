/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Tabbar from './Component/Tabbar'

export default class PetTalking extends Component {
  render() {
    return (
      <Tabbar />
    );
  }
}

AppRegistry.registerComponent('PetTalking', () => PetTalking);
