var React = require('react-native');

var {
        AppRegistry,
        StyleSheet,
        View,
        Text,
        NetInfo
    } = React;

var MyProject = React.createClass({
    render: function(){
        return(
            <View style={styles.base_container}>
                <Text>NetInfo</Text>
            </View>
        )
    },
    componentDidMount: function(){
        NetInfo.fetch().done(function(reachability){
            alert(reachability);
        })

        NetInfo.isConnected.fetch().done(function(isConnected){
            alert(isConnected);
        })

        NetInfo.addEventListener('change', function(reachability){
            alert(reachability);
        })

        NetInfo.addEventListener('change', function(isConnected){
            alert(isConnected);
        })
    }
})

var styles = StyleSheet.create({
    base_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1f89ff'
    }
})
AppRegistry.registerComponent('MyProject', () => MyProject);