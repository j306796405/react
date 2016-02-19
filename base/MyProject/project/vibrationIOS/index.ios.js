var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    VibrationIOS
    } = React;

var MyProject = React.createClass({

    render() {
        return (
            <View>
                <Text onPress={this.vibration} style={styles.btn}>
                    振动一下
                </Text>
            </View>
        );
    },
    vibration: function(){
        VibrationIOS.vibrate();
    }
});


var styles = StyleSheet.create({
    base_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        height: 35,
        backgroundColor: '#3bc1ff',
        color: '#fff',
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

AppRegistry.registerComponent('MyProject', () => MyProject);