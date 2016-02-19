/**
 * WebViewPage.js
 * @author jianglj
 * @create 2016-02-19 17:29
 */
'use strict'
import React, {
    StyleSheet,
    WebView,
    Component,
    View
} from 'react-native';

class WebViewPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <WebView source={{uri: this.props.url}} />
            </View>
        )
    }
}

module.exports = WebViewPage;