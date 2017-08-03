import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator } from 'react-navigation';
import { BaseColor } from './Commond/Config';
import Storage from 'react-native-storage';

import Main from './Main/Main';
import Record from './Record/Record';
import Mine from './Mine/Mine';
import Login from './Login/Login';

var Tab = TabNavigator({
  Main: { screen: Main },
  Record: { screen: Record },
  Mine: { screen: Mine }
}, {
  tabBarOptions: {
    activeTintColor: BaseColor
  }
});

var storage = new Storage({
  size: 1,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true, 
}); 

export default class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userInfo: null,
    };
  }

  componentWillMount() {
    storage.load({
      key: 'loginState',
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      this.setState({ 
        userInfo: ret 
      });
    });
  }

  render() {
    if (this.state.userInfo == null) {
      return (
        <Login loginUserInfo={this._didLogin.bind(this)}
        />
      );
    }
    return (
      <Tab
      />
    );
  }

  _didLogin(data) {
    this.setState({
      userInfo: data,
    });
  }
}