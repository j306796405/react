/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Navigator,
    ScrollView,
    Image,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    } = React;


var Base = React.createClass({

    render: function() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
                <Image source={require('./images/banner.jpg')} style={{backgroundColor: 'red', flex: 1, resizeMode: Image.resizeMode.contain}} />
            </View>
        );
    }
});

var styles = StyleSheet.create({

});

AppRegistry.registerComponent('Base', () => Base);