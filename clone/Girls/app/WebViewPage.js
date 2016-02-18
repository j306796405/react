/**
 * WebViewPage.js
 * @author jianglj
 * @create 2016-02-16 13:41
 */
'use strict'
import React from 'react-native';
import NavigationBar from './custom-views/react-native-navigationbar/index';

var {
    StyleSheet,
    Component,
    WebView,
    View
    } = React;

class WebViewPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        //作为WebView的导航器
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    title={this.props.title}
                    backHidden={false}
                    barTintColor='white'
                    backFunc={() => {
                        //跳转回去并且卸载掉当前场景
                        this.props.navigator.pop();
                }}/>
                <WebView url={this.props.url} />
            </View>
        )
    }

}

module.exports = WebViewPage;
