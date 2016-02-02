var React = require('react-native');

var {
        AppRegistry,
        StyleSheet,
        View,
        Text,
        NetInfo,
        CameraRoll
    } = React;

var imgURL = 'http://vczero.github.io/lvtu/img/'
var MyProject = React.createClass({
    getInitialState: function(){
        return{
            photos: []
        }
    },
    render: function(){
        return(
            <View style={styles.container}>
                <Text onPress={this.saveImg.bind(this, 'city.jpg', '3.jpeg')}>
                    保存图片到相册
                </Text>
            </View>
        )
    },
    saveImg: function(img1, img2){
        var that = this;
        //有bug啊 我擦 莫名了
        CameraRoll.saveImageWithTag(imgURL + img1, function(url){
            if(url){
                var photos = that.state.photos;
                photos.push(url);
                that.setState({
                    photos: photos
                });
                alert('图片1保存成功');
                console.log(CameraRoll.saveImageWithTag);
                CameraRoll.saveImageWithTag(imgURL + img2, function(url){
                    var photos = that.state.photos;
                    photos.push(url);
                    that.setState({
                        photos: photos
                    });
                    alert('图片2保存成功');
                }, function(){
                    alert('保存图片2失败')
                })
            }
        }, function(){
            alert('保存图片1失败');
        })
    }
})

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
AppRegistry.registerComponent('MyProject', () => MyProject);