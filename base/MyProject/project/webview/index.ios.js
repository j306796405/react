var React = require('react-native'),
    Dimensions = require('Dimensions');

var {
        AppRegistry,
        StyleSheet,
        View,
        Text,
        WebView,
    } = React;

var width = Dimensions.get('window').width,
    height = Dimensions.get('window').height;

var MyProject = React.createClass({
    render: function(){
        return(
            <View style={styles.container}>
                <WebView
                    injectedJavaScript="alert('欢迎使用React Native')"
                    bounces={true}
                    url="http://weibo.com/vczero"
                    style={{width: width, height: height}}
                >
                </WebView>
            </View>
        )
    }
})

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
AppRegistry.registerComponent('MyProject', () => MyProject);