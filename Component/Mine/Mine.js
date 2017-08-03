import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationBarBgColor, NavigationTitleColor, ScreenWidth } from '../Commond/Config';
import Network, { RequestUrl } from '../Commond/Network'

class Mine extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ tintColor }) => (
      <Icon 
        name={ 'ios-person-outline' }
        size={ 28 }
        color={ tintColor }
      />
    ),
    headerTitle: '个人中心',
    headerStyle: {
      backgroundColor: NavigationBarBgColor
    },
    headerTitleStyle: {
      color: NavigationTitleColor,
      fontSize: 15
    }
  };

  static defaultProps = {
    userInfo: {}
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.userInfo.avatar == null ? 
          <View style={styles.avatarContainer}
            onPress={this._selectedAvatar.bind(this)}
          >
            <TouchableOpacity style={styles.iconBgView}
              activeOpacity={0.8}
              onPress={this._selectedAvatar.bind(this)}
            >
              <Icon style={styles.selectedImageIcon}
                name={'ios-cloud-upload-outline'}
                size={ScreenWidth / 9}
                color={'#ccc'}
              />
            </TouchableOpacity>
          </View> :
          <View style={styles.avatarContainer}>
            <Image style={styles.avatarBgImage}
              uri={this.props.userInfo.avatar}
            />
            <TouchableOpacity style={styles.avatarStyle}
              activeOpacity={0.8}
              onPress={this._selectedAvatar.bind(this)}
            >
              <Image style={styles.avatarStyle}
              />
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }

  _selectedAvatar() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  avatarContainer: {
    width: ScreenWidth,
    height: ScreenWidth / 2.3,
    backgroundColor: '#ccc',
  },

  iconBgView: {
    position: 'absolute',
    width: ScreenWidth / 5,
    height: ScreenWidth / 5,
    left: ScreenWidth / 2 - ScreenWidth / 10,
    top: ScreenWidth / 4.6 - ScreenWidth / 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    // textAlign: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedImageIcon: {
    // position: 'absolute',
    // width: ScreenWidth / 5,
    // height: ScreenWidth / 5,
    // left: ScreenWidth / 2 - ScreenWidth / 10,
    // top: ScreenWidth / 4.6 - ScreenWidth / 10,
    // backgroundColor: '#fff'
    // borderRadius: 8,
    // textAlign: 'center',
  },

  avatarBgImage: {
    flex: 1
  },

  avatarStyle: {
    position: 'absolute',
  }

});

export default StackNavigator({
  Mine: { screen: Mine },
});