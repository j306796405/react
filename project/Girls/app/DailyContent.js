/**
 * DailyContent
 * @author Jeffery
 * @create 2016-02-21 22:45
 */
'use strict'

import React from 'react-native';
import NavigatorBar from './views/NavigatorBar/index';
import WebViewPage from './WebViewPage';
import Lightbox from 'react-native-lightbox';

var {
    StyleSheet,
    ScrollView,
    View,
    Component,
    Image,
    Text
    } = React;

const HEADER_HEIGHT = 400

class DailyContent extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            opacity: 0
        };
    }

    render() {
        let rowData = this.props.rowData;
        let thumbnail = (typeof rowData.results.福利[0].url !== 'undefined') ? rowData.results.福利[0].url : '';

        let Header = (
            <NavigatorBar title= {rowData.date}
                           backHidden={false}
                           backIcon={true}
                           barTintColor='white'
                           barOpacity= {this.state.opacity}
                           barStyle= {styles.navbar}
                           backFunc={() => {
                                this.props.navigator.pop()
                              }}/>)

        //needsOffscreenAlphaCompositing renderToHardwareTextureAndroid是啥东西
        return (
            <View style={styles.base_container}>
                <ScrollView
                    bounces={false}
                    onScroll={this.onScroll.bind(this)}
                    scrollEventThrottle={5}
                >
                    <Lightbox navigator={this.props.navigator} renderContent={this.renderLightBox.bind(this)}>
                        <Image source= {{uri: thumbnail}} style={[styles.headerImage]}/>
                    </Lightbox>
                    <View style={{flex:1}}>
                        {this.getViews(rowData)}
                    </View>
                </ScrollView>
                <View style={styles.backIcon}/>
                {Header}
            </View>
        )
    }

    getViews(rowData){
        return rowData.category.map((category, index) => (
            <View key={index} style={styles.itemContainer}>
                <Text style={styles.category}>{category}</Text>
                {this.getItems(rowData, category)}
            </View>
        ))
    }

    renderLightBox() {
        let rowData = this.props.rowData;
        let thumbnail = (typeof rowData.results.福利[0].url !== 'undefined') ? rowData.results.福利[0].url : '';
        console.log(thumbnail);
        //<Image source= {require('./images/banner.jpg')} style={{resizeMode: 'contain', flex: 1}} />
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source= {{uri: 'http://bpic.pic138.com/14/67/54/68b1OOOPIC08.jpg!wt'}} style={{resizeMode: 'contain', flex: 1, alignSelf: 'center'}} />
            </View>
        );
    }

    getItems (contentData, category) {
        return contentData.results[category].map((item, index) => (
            <Text
                key={index}
                style={styles.title}
                onPress={ () => {
              this.props.navigator.push({
                component: WebViewPage,
                title: item.desc,
                url: item.url
              })
            }}>
                *  {item.desc} ( {item.who} )
            </Text>
        ))
    }

    onScroll (event) {
        const MAX = HEADER_HEIGHT - 64
        let y = event.nativeEvent.contentOffset.y
        if (y > MAX) {
            y = MAX
        }
        //貌似没有这个bug啊
        const opacity = y / MAX // 透明度，0 完全透明，1＋不透明
        this.setState({
            opacity: opacity
        })
    }
}

var styles = StyleSheet.create({
    base_container: {
        backgroundColor: '#252528',
        flex: 1
    },
    headerImage: {
        height: HEADER_HEIGHT
    },
    itemContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 8,
        padding: 15,
        borderRadius: 3
    },
    category: {
        fontSize: 18
    },
    title: {
        fontSize: 14,
        marginTop: 10,
        lineHeight: 23,
        marginLeft: 15
    },
    backIcon: {
        width: 14,
        height: 14,
        borderColor: '#777',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        transform: [{rotate: '45deg'}],
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 34.5,
        left: 14
    },
    navbar: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
})

module.exports = DailyContent;