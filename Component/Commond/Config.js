import React, { Component } from 'react';
import {
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export var BaseColor = '#ee735c';
export var NavigationBarBgColor = BaseColor;
export var NavigationTitleColor = '#fff'

export var ScreenWidth = Dimensions.get('window').width;
export var ScreenHeight = Dimensions.get('window').height;

export var BackItem = function(navigation) {
	return (
      <TouchableOpacity onPress = {() => navigation.goBack()}>
        <Icon
          name = { 'ios-arrow-back' }
          size = { 26 }
          color = { '#fff' }
          style = {{paddingLeft: 16}}
        />
      </TouchableOpacity>
    );
}

