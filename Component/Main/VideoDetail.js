import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationBarBgColor, NavigationTitleColor, ScreenWidth, ScreenHeight, BackItem } from '../Commond/Config';
import Network, { RequestUrl } from '../Commond/Network';
import Video from 'react-native-video';

const VideoHeight = 200;
var RequestConfig = {
  page: -1,
  token: '123',
  dataSource: [],
};

export default class VideoDetail extends Component {
  constructor(props) {
    super(props);

    RequestConfig.dataSource = [this.props.navigation.state.params.data, '精彩评论:'];
  
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

    this.state = {
      dataSource: ds.cloneWithRows(RequestConfig.dataSource),
      data: this.props.navigation.state.params.data,

      isLoading: true,
      progress: 0,
      isEnd: false,
      isPaused: false,
      isError: false,

      isRequestComment: false,

      modalVisible: false,
      commentText: '',
      isCommenting: false,
    };
  }

  static navigationOptions = ({navigation,screenProps}) => ({
    headerTitle: '宠物秀',
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
            style = {styles.videoStyle}
            source = {{uri: this.state.data.videoUrl}}
            // source = {{uri: 'http://lksdjflksdjlk.com/sdfs'}}
            volume = {5}
            paused = {this.state.isPaused}
            rate = {1}
            muted = {false}
            resizeMode = {'conver'}
            repeat = {false}

            onLoadStart = {this._onLoadStart.bind(this)}
            onLoad = {this._onLoad.bind(this)}
            onProgress = {this._onProgress.bind(this)} 
            onEnd = {this._onEnd.bind(this)} 
            onError = {this._onError.bind(this)}  
          />
          <View style={styles.videoInnerViewStyle}>
            {
              this.state.isLoading ? <ActivityIndicator style={styles.activityStyle} size='large' color={NavigationBarBgColor} /> : null
            }
            {
              this.state.isEnd ? <Icon onPress={this._restart.bind(this)} style = {styles.playStyle} name = {'ios-play-outline'} size = {26} /> : null
            }
            {
              this.state.isError ? <Text style={styles.errorTextStyle}> @_@ 出错了!</Text> : null
            }
          </View>
          <View style={[styles.progressBarStyle, {width: ScreenWidth * this.state.progress}]}>
          </View>
        </View>
        <ListView
          style = {styles.listViewStyle}
          dataSource = {this.state.dataSource}
          renderRow = {this._renderRow.bind(this)}
          enableEmptySections
          onEndReached = {this._fecthComment.bind(this)}
          onEndReachedThreshold = {-30}
          renderFooter = {this._renderFooter.bind(this)}
          removeClippedSubviews = {false}
        />
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.modalVisible}
          // onRequestClose={this._onModalClose.bind(this)}
          >
          <View style={styles.modalViewStyle}>
            <Icon style={styles.dismissIconStyle}
              name='ios-close-outline'
              size={ 32 }
              color={ NavigationBarBgColor }
              onPress={this._pressDissmiss.bind(this)}
            />
            <TextInput style={styles.modalCommentStyle}
              onChangeText={(text) => this.setState({text})}
              placeholder={'输入评论...'}
              multiline={true}
              autoFocus={true}
              placeholderTextColor={'#696969'}
              onChangeText={(text) => this.setState({commentText: text})}
            />
            <TouchableOpacity onPress={this._submitComment.bind(this)}>
              <Text style={styles.submitStyle}>
                发表评论
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
 		);
	}

  componentDidMount() {
    this._fecthComment();
  }

  _submitComment() {
    if (this.state.isCommenting) {
      // Alert.alert(
      //   '正在评论'
      // );
      return;
    }
    if (this.state.commentText.length <= 0) {
      // Alert.alert(
      //   '请输入评论内容'
      // );
      return;
    }
    // this.setState({
    //   isCommenting: true
    // });

    // this.setState({
    //   isCommenting: false,
    // });

    var thisComment = {
      avatar: 'http://p2.wmpic.me/article/2014/11/11/1415689054_MjBijwHD.jpeg',
      comment: this.state.commentText,
      commentId: '123',
      commenter: 'li',
      commenterId: '38',
    };

    var temp = RequestConfig.dataSource.slice();
    temp.splice(2, 0, thisComment)
    RequestConfig.dataSource = temp;
    // RequestConfig.dataSource.splice(2, 0, thisComment);
    // RequestConfig.dataSource = RequestConfig.dataSource.slice(0, 4);
    // RequestConfig.dataSource.push(thisComment);
    console.log(RequestConfig.dataSource);
    this.setState({
      modalVisible: false,
      dataSource: this.state.dataSource.cloneWithRows(RequestConfig.dataSource),
    });
  }

  // _onModalClose() {
  //   this.setState({
  //     dataSource: this.state.dataSource.cloneWithRows(RequestConfig.dataSource)
  //   });
  // }

  _onFocus() {
    this.setState({
      modalVisible: true,
    });
  }

  _pressDissmiss() {
    this.setState({
      modalVisible: false,
    });
  }

  _renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    console.log(rowID);
    if (rowID == 0) {
      return (
        <View style={styles.videoInfoRowStyle}>
          <Image style={styles.authorAvatarStyle} source={{uri: rowData.avatar}}/>
          <View style={styles.videoTextStyle}>
            <Text style={styles.authorNameStyle}>{rowData.authorName}</Text>
            <Text style={styles.videoDescriptionStyle}>{rowData.description}</Text>
          </View>
        </View>
      );
    }
    else if (rowID == 1) {
      return (
        <View>
          <TextInput style={styles.commentInputStyle}
            placeholder={'输入评论...'}
            multiline={true}
            placeholderTextColor={'#696969'}
            onFocus={this._onFocus.bind(this)}
          />
          <Text style={styles.commentStyle}>{rowData}</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.commentRowStyle}>
          <Image style={styles.commenterAvatarStyle} source={{uri: rowData.avatar}}/>
          <View style={styles.commentTextStyle}>
            <Text style={styles.commenterNameStyle}>{rowData.commenter}</Text>
            <Text style={styles.commentDetailStyle}>{rowData.comment}</Text>
          </View>
        </View>
      );
    }
  }

  _renderFooter() {
    if (this.state.isRequestComment) {
      return <ActivityIndicator style = {styles.moreFooterStyle} color = {NavigationBarBgColor}/>
    }
    else {
      return null
    }
  }

  _fecthComment() {
    if (this.state.isRequestComment) {
      return;
    }

    this.setState({
      isRequestComment: true
    });

    setTimeout(() => {
      Network.post(RequestUrl.commentList, {
        token: RequestConfig.token,
        page: RequestConfig.page + 1,
        videoId: this.state.data.videoId,
      })
      .then((data) => {
        this.setState({
          isRequestComment: false
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
          isRequestComment: false
        });
      });
    }, 2000);
  }

  _restart() {
    this.setState({
      isEnd: false
    });
    this.refs.videoPalyer.seek(0);
  }

  _onLoadStart() {
    this.setState({
      isLoading: true,
    });
  }

  _onLoad() {
    this.setState({
      isLoading: true,
    });
  }

  _onProgress(data) {
    var playableDuration = data.playableDuration;
    var currentTime = data.currentTime;
    var progress = currentTime / playableDuration;

    this.setState({
      isLoading: false,
      progress: progress,
    });
  }

  _onEnd() {
    this.setState({
      progress: 1,
      isEnd: true,
    });
  }

  _onError() {
    this.setState({
      isLoading: false,
      isError: true,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },

  videoBoxStyle: {

  },

  videoStyle: {
    width: ScreenWidth,
    height: VideoHeight,
  },

  videoInnerViewStyle: {
    position: 'absolute',
    width: ScreenWidth,
    height: VideoHeight,
  },

  activityStyle: {
    marginLeft: (ScreenWidth - 50) / 2,
    marginTop: (VideoHeight - 50) / 2,
    width: 50,
    height: 50,
  },

  playStyle: {
    marginLeft: (ScreenWidth - 46) / 2,
    marginTop: (VideoHeight - 46) / 2,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 23,
    color: NavigationBarBgColor
  },

  errorTextStyle: {
    width: ScreenWidth,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    lineHeight: 30,
    marginTop: (VideoHeight - 30) / 2,
    backgroundColor: 'transparent',
  },

  progressBarStyle: {
    height: 2,
    backgroundColor: NavigationBarBgColor,
  },

  listViewStyle: {
    height: ScreenHeight - VideoHeight - 68,
  },

  videoInfoRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
  },

  authorAvatarStyle: {
    marginTop: 8,
    marginBottom: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  videoTextStyle: {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 8,
    width: ScreenWidth - 84,
  },

  authorNameStyle: {
    marginBottom: 4,
    color: '#696969',
    fontSize: 14,
  },

  videoDescriptionStyle: {
    marginRight: 0,
    color: '#778899',
    fontSize: 13,
    lineHeight: 16,
  },

  commentInputStyle: {
    height: 80,
    padding: 8,
    borderColor: '#696969',
    borderWidth: 0.5,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
    fontSize: 14,
  },

  commentStyle: {
    backgroundColor: 'transparent',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
    color: '#000',
  },

  commentRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
  },

  commenterAvatarStyle: {
    marginTop: 8,
    marginBottom: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  commentTextStyle: {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 8,
    width: ScreenWidth - 72,
  },

  commenterNameStyle: {
    marginBottom: 4,
    color: '#696969',
    fontSize: 13,
  },

  commentDetailStyle: {
    marginRight: 0,
    color: '#778899',
    fontSize: 12,
    lineHeight: 15,
  },

  moreFooterStyle: {
    margin: 8
  },

  modalViewStyle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 44,
  },

  dismissIconStyle: {

  },

  modalCommentStyle: {
    height: 120,
    marginTop: 12,
    padding: 8,
    borderColor: '#696969',
    borderWidth: 0.5,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
    fontSize: 14,
  },

  submitStyle: {
    height: 36,
    width: ScreenWidth / 2,
    marginTop: 24,
    borderColor: NavigationBarBgColor,
    color: NavigationBarBgColor,
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 36,
    fontSize: 14,
  },

});
