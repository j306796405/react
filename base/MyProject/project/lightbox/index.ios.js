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

var Lightbox = require('react-native-lightbox');

var LightboxView = React.createClass({

    render: function() {
        return (
            <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                <Lightbox underlayColor="white" navigator={this.props.navigator} renderContent={this.renderLightBoxContent.bind(this)}>
                    <Image source={require('./images/banner.jpg')} style={{height: 200, flex: 1, resizeMode: 'contain'}}/>
                </Lightbox>
            </View>
        );
    },

    renderLightBoxContent: function(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
                <Image source={require('./images/banner.jpg')} style={{flex: 1, resizeMode: 'contain'}}/>
            </View>
        )
    }
});


var Base = React.createClass({
    renderScene: function(route, navigator) {
        var Component = route.component;

        return (
            <Component navigator={navigator} route={route} {...route.passProps} />
        );
    },

    render: function() {
        return (
            <Navigator
                ref="navigator"
                style={styles.navigator}
                renderScene={this.renderScene}
                initialRoute={{
                component: LightboxView,
        }}
            />
        );
    }
});

var styles = StyleSheet.create({

});

AppRegistry.registerComponent('Base', () => Base);