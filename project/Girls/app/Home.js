/**
 * Home.js
 * @author jianglj
 * @create 2016-02-18 14:44
 */
'use strict'

import React, {
    StyleSheet,
    View,
    Text,
    Component,
    Animated,
    Image,
    TouchableHighlight,
} from 'react-native';

import DateUtils from './utils/DateUtils';
import RequestUtil from './utils/RequestUtils';
import WebViewPage from './WebViewPage';
import HistoryList from './HistoryList';

class Home extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            //后台数据加载
            isLoading: true,
            //开场动画
            isPlaying: true,
            fadeAnimLogo: new Animated.Value(0),
            fadeAnimSupportedBy: new Animated.Value(0),
            fadeAnimPoweredBy: new Animated.Value(0),
            fadeAnimLayout: new Animated.Value(1)
        };
    }

    async componentDidMount() {
        let timing = Animated.timing;
        Animated.sequence([
            timing(this.state.fadeAnimLogo, {
                toValue: 1,
                duration: 800
            }),
            timing(this.state.fadeAnimSupportedBy, {
                toValue: 1,
                duration: 800
            }),
            timing(this.state.fadeAnimPoweredBy, {
                toValue: 1,
                duration: 800
            })
        ]).start(
            //start方法感觉就是回调 不需要用async
            () => {
                this.setState({
                    isPlaying: false
                })
                //如果数据加载没有完成 hideWelcome内会进行判断不会关闭动画
                this._hideWelcome();
            })

        try{
            //在方法内定义await的话 需要将该方法定义为async
            this.listData = await RequestUtil.getContents(DateUtils.getCurrentDate());
        }catch(error){
            alert('数据加载异常,请检查网络!');
            return;
        }
        this.homeData = this.listData[0].results;
        //资源加载完成
        this.setState({
            isLoading: false
        })

        this._hideWelcome();

    }

    render() {
        let content = this.state.isLoading
            ? (<View />)
            : (
                <View style={styles.base_container}>
                    <View style={styles.headerWrapper}>
                        <Image source={{uri: this.homeData.福利[0].url}} style={{flex: 1}} />
                        <View style={styles.editorWrapper}>
                            <Text style={styles.imageEditors}>{ 'via.' + this.homeData.福利[0].who }</Text>
                        </View>
                    </View>
                    <View style={styles.contentWrapper}>
                        <TouchableHighlight
                            style={{flex: 2}}
                            underlayColor={'#06c'}
                            onPress={() => {
                                this.props.navigator.push({
                                    component: WebViewPage,
                                    url: this.homeData.休息视频[0].url
                                })
                            }}
                        >
                            <View style={styles.container}>
                                <Text style={styles.videoTitle}>{this.homeData.休息视频[0].desc}</Text>
                                <Text style={styles.dateAuthor}>{this.listData[0].date + ' via.' + this.homeData.休息视频[0].who}</Text>
                                <Text style={styles.toVideo}>--> 去看视频~</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.buttonStyle}
                            underlayColor={'green'}
                            onPress={() => {
                                this._skipToHistory(this.listData);
                            }}
                        >
                            <Text style={styles.toHistory}>查看往期</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        return (
            <View style={styles.base_container}>
                {content}
                {this._welcome()}
            </View>
        )
    }

    _welcome() {
        if(this.state.welcomeEnd){
            return null;
        }
        return (
            <Animated.View style={[styles.indicatorWrapper, {opacity: this.state.fadeAnimLayout}]}>
                <Animated.View
                    style={{
                        opacity: this.state.fadeAnimLogo,
                        transform: [{
                            translateX: this.state.fadeAnimLogo.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-40, 0]
                            })
                        }]
                    }}
                >
                    <Image source={require('./images/gank_launcher.png')} style={{ width: 100, height: 100 }}/>
                </Animated.View>

                <Animated.Text
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        opacity: this.state.fadeAnimSupportedBy,
                        transform: [{
                            translateX: this.state.fadeAnimSupportedBy.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 25]
                            })
                        }]
                    }}
                >
                    <Text style={styles.footerText}>Supported by: Gank.io</Text>
                </Animated.Text>

                <Animated.Text
                    style={{
                        opacity: this.state.fadeAnimPoweredBy,
                        position: 'absolute',
                        bottom: 30,
                        transform: [{
                            translateX: this.state.fadeAnimPoweredBy.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 25]
                            })
                        }]
                    }}
                >
                    <Text style={styles.footerText}>Powered by: 北京杰讯云动力科技有限公司</Text>
                </Animated.Text>
            </Animated.View>
        )
    }

    _hideWelcome() {
        if(this.state.isLoading || this.state.isPlaying){
            return;
        }

        Animated.timing(
            this.state.fadeAnimLayout,
            {
                toValue: 0,
                duration: 1000
            }
        ).start(() => {
            //隐藏开场动画
            this.setState({
                welcomeEnd: true
            })
        })
    }

    _skipToHistory(listData) {
        this.props.navigator.push({
            component: HistoryList,
            passProps: {listData}
        })
    }
}

var styles = StyleSheet.create({
    base_container: {
        flex: 1,
        backgroundColor: '#434243'
    },
    container: {
        flex: 1
    },
    indicatorWrapper: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        color: '#aaa',
        fontSize: 15
    },
    headerWrapper: {
        flex: 4,
        backgroundColor: '#000'
    },
    editorWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 17,
        backgroundColor: '#000',
        opacity: 0.5
    },
    imageEditors: {
        fontSize: 12,
        color: '#fff',
        position: 'absolute'
    },
    contentWrapper: {
        flex: 3,
        backgroundColor: '#252528'
    },
    videoTitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 17,
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 21
    },
    dateAuthor: {
        fontSize: 14,
        color: '#fff',
        position: 'absolute',
        left: 15,
        bottom: 17
    },
    toVideo: {
        fontSize: 14,
        color: '#fff',
        position: 'absolute',
        bottom: 17,
        right: 15
    },
    buttonStyle: {
        backgroundColor: '#434243',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 17,
        marginBottom: 17
    },
    toHistory: {
        fontSize: 18,
        color: '#fff'
    }
})

module.exports = Home;
