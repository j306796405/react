var React = require('react-native');

var {
        AppRegistry,
        StyleSheet,
        View,
        Text,
        StatusBarIOS
    } = React;

//状态栏字是白色
StatusBarIOS.setStyle('light-content', true);
//StatusBarIOS.setStyle('default');
//隐藏状态栏
StatusBarIOS.setHidden(true, true);
StatusBarIOS.setNetworkActivityIndicatorVisible(true);
var MyProject = React.createClass({
    render: function(){
        return(
            <View style={styles.container}></View>
        )
    }
})

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f89ff'
    }
})
AppRegistry.registerComponent('MyProject', () => MyProject);