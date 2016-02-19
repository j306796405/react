var React = require('react-native'),
    Dimensions = require('Dimensions');

var {
        AppRegistry,
        StyleSheet,
        View,
        Text,
        WebView,
        PixelRatio
    } = React;

var MyProject = React.createClass({
    render: function(){
        return(
            <View style={styles.base_container}>
                <View style={{borderWidth: 1, borderColor: 'red', height: 40,
                 marginBottom: 20}}></View>
                <View style={{borderWidth: 1/PixelRatio.get(), borderColor: 'red', height: 40}}></View>
            </View>
        )
    }
})

var styles = StyleSheet.create({
    base_container: {
        flex: 1,
        marginTop: 25
    }
})
AppRegistry.registerComponent('MyProject', () => MyProject);