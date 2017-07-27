import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Mock from 'mockjs';
import { NavigationBarBgColor, NavigationTitleColor, ScreenWidth } from '../Commond/Config';
import Network, { RequestUrl } from '../Commond/Network'

var RequestConfig = {
  page: 0,
  token: '123',
  dataSource: []
};

class Main extends Component {

  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ tintColor }) => (
      <Icon 
        name={ 'ios-film-outline' }
        size={ 26 }
        color={ tintColor }
      />
    ),
    headerTitle: '宠物说',
    headerStyle: {
      backgroundColor: NavigationBarBgColor
    },
    headerTitleStyle: {
      color: NavigationTitleColor,
      fontSize: 15
    }
  };

  constructor(props) {
    super(props);
  
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: false
    };
  }

	render() {
  	return (
      <View>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this._renderRow.bind(this)}
          enableEmptySections
          onEndReached = {this._fecthMoreData.bind(this)}
          renderFooter = {this._renderFooter.bind(this)}
        />
      </View>
 		);
	}

  componentDidMount() {
    this._fecthData()
  }

  _renderRow(rowData) {
    return (
      <TouchableOpacity
        activeOpacity = {0.8}
      >
        <View style = {styles.rowStyle}>
          <Text style = {styles.titleStyle}>{rowData.title}</Text>
          
          <Image style = {styles.thumbStyle}
            source = {{uri: rowData.thumb}}
          >
            <Icon style = {styles.playStyle}
              name = {'ios-play-outline'}
              size = {26}
            />
          </Image>
          
          <View style = {styles.toolViewStyle}>
            <TouchableOpacity style = {styles.likeViewStyle}>
              <Icon style = {styles.toolIconStyle}
                name = {'ios-heart-outline'}
                size = {22}
              />
              <Text style = {styles.toolTextStyle}>喜欢</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.commentViewStyle}>
              <Icon style = {styles.toolIconStyle}
                name = {'ios-chatboxes-outline'}
                size = {22}
              />
              <Text style = {styles.toolTextStyle}>评论</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderFooter() {
    if (this.state.isLoading) {
      return <ActivityIndicator color = {NavigationBarBgColor}/>
    }
    else {
      return null
    }
  }

  _fecthData() {
    RequestConfig.page = 0;
    this.setState({
      isLoading: true
    });

    Network.post(RequestUrl.videoList, {
      token: RequestConfig.token,
      page: 0
    })
    .then((data) => {
      this.setState({
        isLoading: false
      });

      if (data.success) {
        RequestConfig.dataSource = data.data;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(RequestConfig.dataSource)
        });
      }
    })
    .catch((error) => {
      this.setState({
        isLoading: false
      });
    });
  }

  _fecthMoreData() {
    if (this.state.isLoading) {
      return;
    }

    this.setState({
      isLoading: true
    });

    setTimeout(() => {
      Network.post(RequestUrl.videoList, {
        token: RequestConfig.token,
        page: RequestConfig.page + 1
      })
      .then((data) => {
        this.setState({
          isLoading: false
        });
        if (data.success) {
          RequestConfig.page += 1;
          if (data.data.length <= 0) {
          }
          else {
            RequestConfig.dataSource = RequestConfig.dataSource.concat(data.data);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(RequestConfig.dataSource)
            });
          }
        }
        else {
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
      });
    }, 3000);
  }
}

export default StackNavigator({
  Main: { screen: Main },
});

const styles = StyleSheet.create({
  rowStyle: {
    backgroundColor: '#fff',
    marginBottom: 8
  },

  titleStyle: {
    padding: 8,
    marginLeft: 10,
    fontSize: 14
  },

  thumbStyle: {
    marginLeft: 14,
    width: ScreenWidth - 28,
    height: (ScreenWidth - 28) * 0.59,
    resizeMode: 'cover'
  },

  playStyle: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: NavigationBarBgColor
  },

  toolViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44
  },

  likeViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#ccc'
  },

  commentViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#ccc'
  },

  toolIconStyle: {
    width: 22,
    height: 22,
  },

  toolTextStyle: {
    paddingLeft: 8,
    lineHeight: 22,
    height: 22,
    textAlign: 'center'
  }
});



