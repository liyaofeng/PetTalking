import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';

import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationBarBgColor, NavigationTitleColor, ScreenWidth } from '../Commond/Config';
import Network, { RequestUrl } from '../Commond/Network';
import Storage from 'react-native-storage';

var timer = null;
var storage = new Storage({
  size: 1,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true, 
}); 

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      haveSendCode: false,
      code: '',

      time: 0,
    };
  }

	render() {
  	return (
      <View style={styles.container}>
        <TextInput style={styles.phoneInputStyle}
          placeholder={'手机号'}
          multiline={false}
          autoFocus={true}
          keyboardType={'numeric'}
          placeholderTextColor={'#696969'}
          onChangeText={(text) => this.setState({phone: text})}
        />
        {
          this.state.haveSendCode ? 
          <View style={styles.codeContainerStyle}>
            <TextInput style={styles.codeInputStyle}
              placeholder={'验证码'}
              multiline={false}
              autoFocus={true}
              keyboardType={'numeric'}
              placeholderTextColor={'#696969'}
              onChangeText={(text) => this.setState({code: text})}
            />
            <TouchableOpacity style={[styles.sendCodeContainerStyle, {backgroundColor: this.state.time != 0 ? '#ccc' : NavigationBarBgColor}]}
              activeOpacity={0.8}
              onPress={this._pressSendCode.bind(this)}
            >
              <Text style={styles.sendCodeStyle}>
                {this.state.time != 0 ? ('重新发送(' + this.state.time.toString() + ')') : '重新发送'}
              </Text>
            </TouchableOpacity>
          </View>
          : null
        }
        <TouchableOpacity style={styles.loginContainerStyle}
          activeOpacity={0.8}
          onPress={this._pressLogin.bind(this)}
        >
          <Text style={styles.loginStyle}>
            {this.state.haveSendCode ? '登陆' : '发送验证码'}
          </Text>
        </TouchableOpacity>
      </View>
 		);
	}

  _pressLogin() {
    if (this.state.haveSendCode) {
      var userInfo = {
        token: 'this is a token',
        userName: 'liyf',
        userId: '38',
        avatar: 'http://p3.wmpic.me/article/2015/03/18/1426649933_LmkapquY.jpeg'
      }
      storage.save({
        key: 'loginState',
        data: userInfo,
        expires: null,
      });

      console.log('<11111111111111111></11111111111111111>');
      this.props.loginUserInfo(userInfo);
    }
    else {
      if (this.state.phone.length < 1) {
        return;
      }
      this.setState({
        haveSendCode: true  
      });
      this._countDown();
    }
  }

  _pressSendCode() {
    if (this.state.time == 0) {
      this._countDown();
    }
  }

  _countDown() {
    this.setState({
      time: 60,
    });

    if (timer != null) {
      clearInterval(timer);
    }

    timer = setInterval(() => { 
      var time = this.state.time;
      time--;
      this.setState({
        time: time,
      });
      if (time == 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
  componentWillUnmount() {
    timer && clearTimeout(timer);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    alignItems: 'center',
  },

  phoneInputStyle: {
    height: 42,
    marginLeft: 24,
    marginRight: 24,
    borderColor: NavigationBarBgColor,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 16,
    lineHeight: 42,
    fontSize: 14,
  },

  codeContainerStyle: {
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
  },

  codeInputStyle: {
    flex: 2.2,
    height: 42,
    marginRight: 12,
    borderColor: NavigationBarBgColor,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 16,
    lineHeight: 42,
    fontSize: 14,
  },

  sendCodeContainerStyle: {
    flex: 1,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },

  sendCodeStyle: {
    flex: 1,
    height: 36,
    color: '#fff',
    fontSize: 14,
    lineHeight: 36,
    textAlign: 'center',
  },

  loginContainerStyle: {
    marginTop: 16,
    backgroundColor: NavigationBarBgColor,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },

  loginStyle: {
    width: ScreenWidth / 2,
    height: 42,
    color: '#fff',
    fontSize: 14,
    lineHeight: 42,
    textAlign: 'center',
  },

});




