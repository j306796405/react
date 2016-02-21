/**
 * HistoryList
 * @author Jeffery
 * @create 2016-02-20 15:18
 */
import React from 'react-native';
import DateUtils from './utils/DateUtils';
import RequestUtils from './utils/RequestUtils';
import Loading from './views/Loading';
import NavigatorBar from './views/NavigatorBar';
import DailyContent from './DailyContent';
import About from './About';

var {
    StyleSheet,
    Component,
    View,
    Text,
    Image,
    ListView,
    TouchableHighlight,
    RefreshControl
    } = React;

class HistoryList extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listData: this.props.listData,
            dataSource: ds.cloneWithRows(this.props.listData),
            isLoading: false
        };
    }

    render() {
        let loadingStructure = this.state.isLoading
            ? (<View style={styles.indicatorWrapper}>
                {<Loading distance= {20} duration = {450} bgColor= {'#999'}/>}
                </View>)
            : (<View />);
        return (
            <View style={styles.base_container}>
                <NavigatorBar
                    backHidden={false}
                    barTintColor='#fff'
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
                    renderRow={this._renderRow.bind(this)}
                    onEndReached={this._loadMore.bind(this)}
                    onEndReachedThreshold={30}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._refresh.bind(this)}
                        tintColor="red"
                        title="强势插入更多美女..."
                      />
                    }
                />
                {loadingStructure}
            </View>
        )
    }

    //bind(this) 很重要
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress= {
                () => this._skipToDetail(rowData)
            }>
                <View style={styles.itemContainer}>
                    <Text style={styles.date}>{rowData.date}</Text>
                    <Text style={styles.title}>{rowData.results.休息视频[0].desc}</Text>
                    <Image source={{uri: rowData.results.福利[0].url}} style={styles.thumbnail}/>
                </View>
            </TouchableHighlight>
        )
    }

    async _loadMore() {
        //如果不绑定bind this的对象代表ListView
        this.setState({
            isLoading: true
        })
        //获取该天之前的所有数据
        var lastDate = this.state.listData[this.state.listData.length - 1].date;
        let loadedData;
        try{
            loadedData = await RequestUtils.getContents(DateUtils.convertDate(lastDate));
        }catch(error){
            console.log(error);
            return;
        }
        let newData = [...this.state.listData, ...loadedData];
        this.setState({
            listData: newData,
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(newData),
            isRefreshing: false
        })
    }

    getLastDate() {
        this.LAST_DATE = DateUtils.getCurrentDate();
    }

    async _refresh() {
        if(this.state.isRefreshing){
            return;
        }
        this.setState({
            isRefreshing: true
        })
        this.getLastDate();
        var refreshData = await RequestUtils.getContents(this.LAST_DATE);
        this.setState({
            listData: refreshData,
            dataSource: this.state.dataSource.cloneWithRows(refreshData),
            isRefreshing: false
        })
    }

    _skipToDetail(rowData) {
        this.props.navigator.push({
            component: DailyContent,
            passProps: {rowData}
        })
    }
}

var styles = StyleSheet.create({
    base_container: {
        flex: 1,
        backgroundColor: '#252528'
    },
    itemContainer: {
        paddingTop: 20,
        alignItems: 'flex-start'
    },
    date: {
        paddingLeft: 6,
        fontSize: 17,
        color: '#fff',
    },
    title: {
        paddingLeft: 6,
        fontSize: 15,
        marginBottom: 10,
        //letterSpacing: 10,
        color: '#fff',
    },
    /*cover: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸
    （如果容器有padding内衬的话，则相应减去）。译注：这样图片完全覆盖甚至超出容器，容器中不留任何空白。
    contain: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸
    （如果容器有padding内衬的话，则相应减去）。译注：这样图片完全被包裹在容器中，容器中可能留有空白
    stretch: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。*/
    thumbnail: {
        height: 260,
        //bug???????? 容器设置了alignItems Image如果不设置alignSelf:'stretch' 图片不显示
        alignSelf: 'stretch',
        resizeMode: Image.resizeMode.cover
    },
    indicatorWrapper: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#252528'
    }
})

module.exports = HistoryList;