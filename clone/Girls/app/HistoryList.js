'use strict'

import React from 'react-native';
import DateUtils from './utils/DateUtils';
import RequestUtils from './utils/RequestUtils';
import DailyContent from './DailyContent';
import NavigationBar from './custom-views/react-native-navigationbar/index';
import Animation from './custom-views/Animation';
import About from './About';

var {
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    RefreshControl,
    Image,
    Text,
    Component
} = React;

class HistoryList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 先初始化一个空的数据集合
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.contentDataGroup),
            dataArray: this.props.contentDataGroup,
            loadMore: false,
            isRefreshing: false
        };
    }

    render() {
        let loadMoreAnimation = this.state.loadMore
        ? (<View style={[styles.indicatorWrapper]}>
            <Animation timingLength = {50} duration = {500} bodyColor = {'#aaa'} />
        </View>)
        : (<View/>) ;

        return (
            <View style={styles.base_container}>
                <NavigationBar
                    backHidden={false}
                    barTintColor='white'
                    barStyle={styles.navbar}
                    title='History'
                    actionName='About'
                    backFunc={() => {
                        this.props.navigator.pop();
                      }}
                    actionFunc={() => {
                        this.props.navigator.push({
                          component: About
                        })
                      }}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold = {30}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refresh.bind(this)}
                            tintColor='#aaaaaa'
                            title='强势插入更多美女...'
                            progressBackgroundColor='#aaaaaa'/>
                        }
                />
                {loadMoreAnimation}
            </View>
        )
    }

    renderItem(rowData, sectionId, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress= {
                () => this.skipIntoContent(rowData)
            }>
                <View style={styles.itemContainer}>
                    <Text style={styles.date}>{rowData.date}</Text>
                    <Text style={[styles.title]}>{rowData.results.休息视频[0].desc}</Text>
                    <Image source={{uri: rowData.results.福利[0].url}} style={styles.thumbnail}/>
                </View>
            </TouchableHighlight>
        )
    }

    async loadMore(){
        console.log('== loadmore');
        if (this.state.loadMore) {
            return;
        }
        this.setState({loadMore: true});
        //获取该天之前的所有数据
        var lastDate = this.state.dataArray[this.state.dataArray.length - 1].date;
        let loadedContentGroup;
        try{
            loadedContentGroup = await RequestUtils.getContents(DateUtils.convertDate(lastDate));
        }catch (error){
            console.log(error);
            return;
        }
        let newContent = [...this.state.dataArray, ...loadedContentGroup];
        // var newContent = this.state.dataArray
        // // newContent.push(loadedContent)//???居然不能直接push一个数组
        // for (let element of loadedContentGroup) {
        //   newContent.push(element)
        // }

        this.setState({
            dataArray: newContent,
            dataSource: this.state.dataSource.cloneWithRows(newContent),
            loadMore: false
        })

    }

     async refresh() {
        if (this.state.isRefreshing) {
            return
        }
        this.setState({isRefreshing: true});
        this.getLastDate();
        var contentDataGroup = await RequestUtils.getContents(this.LAST_DATE);
        this.setState({
            dataArray: contentDataGroup,
            dataSource: this.state.dataSource.cloneWithRows(contentDataGroup),
            isLoading: false,
            isRefreshing: false
        })
    }

    getLastDate() {
        this.LAST_DATE = DateUtils.getCurrentDate();
    }

    skipIntoContent(rowData) {
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            component: DailyContent,
            passProps: {rowData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })// push一个route对象到navigator中
    }
}

var styles = StyleSheet.create({
    base_container: {
        flex: 1,
        backgroundColor: '#252528'
    },
    indicatorWrapper: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#252528'
    },
    itemContainer: {
        flexDirection: 'column',
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    date: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    title: {// alignSelf 默认是center
        fontSize: 15,
        marginBottom: 10,
        marginRight: 35,
        marginLeft: 35,
        // letterSpacing: 10,//字间距
        lineHeight: 22, // 行距＋字高，0表示和字高一样，没效果
        color: 'white',
        textAlign: 'center' // 字的对其方式：center每行都居中；left，right；auto ＝＝＝ justify ＝＝＝ left
    },
    thumbnail: {
        width: null, // 配合alignSelf实现宽度上 match_parent
        height: 260,
        alignSelf: 'stretch'
    },
})

module.exports = HistoryList;