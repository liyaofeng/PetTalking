import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationBarBgColor, NavigationTitleColor, ScreenWidth, BackItem } from '../Commond/Config';
import Network, { RequestUrl } from '../Commond/Network';
import Video from 'react-native-video';

export default class VideoDetail extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: this.props.navigation.state.params.data,

      rate: 1,
      muted: false,
      resizeMode: 'conver',
      repeat: true 
    };
  }

  static navigationOptions = ({navigation,screenProps}) => ({
    headerTitle: '',
    headerStyle: {
      backgroundColor: NavigationBarBgColor
    },
    headerTitleStyle: {
      color: NavigationTitleColor,
      fontSize: 15
    },
    tabBarVisible: false,
    headerLeft: (BackItem(navigation))
  });

	render() {
  	return (
      <View style = {styles.container}>
        <View style = {styles.videoBoxStyle}>
          <Video
            ref = 'videoPalyer'
            source = {{uri: this.state.data.videoUrl}}
            style = {styles.videoStyle}
            volume = {5}
            paused = {false}
            rate = {this.state.rate}
            muted = {this.state.muted}
            resizeMode = {this.state.resizeMode}
            repeat = {this.state.repeat}

            onLoadStart = {this._onLoadStart.bind(this)}
            onLoad = {this._onLoad.bind(this)}
            onProgress = {this._onProgress.bind(this)} 
            onEnd = {this._onEnd.bind(this)} 
            onError = {this._onError.bind(this)}  
          />
       </View>
      </View>
 		);
	}

  _onLoadStart() {
    console.log('on load start!');
  }

  _onLoad() {
    console.log('on load!');
  }

  _onProgress() {
    console.log('on progress!');
  }

  _onEnd() {
    console.log('on end!');
  }

  _onError() {
    console.log('on error!');
  }

}

const styles = StyleSheet.create({
  container: {

  },

  videoBoxStyle: {

  },

  videoStyle: {
    width: ScreenWidth,
    height: 200
  }
});
