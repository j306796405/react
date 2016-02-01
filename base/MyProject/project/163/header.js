var React = require('react-native');

var {
    AppRegister,
    StyleSheet,
    View,
    Text
    } = React;

var styles = StyleSheet.create({
    flex: {
        marginTop: 25,
        height: 50,
        borderBottomWidth: 3/React.PixelRatio.get(),
        borderBottomColor: '#EF2D36',
        alignItems: 'center'
    },
    font: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    font_1: {
        color: '#cd1d1c'
    },
    font_2: {
        color: '#fff',
        backgroundColor: '#cd1d1c'
    }
})

var Header = React.createClass({
    render: function(){
        return (
            <View style={styles.flex}>
                <Text style={styles.font}>
                    <Text style={styles.font_1}>网易</Text>
                    <Text style={styles.font_2}>新闻</Text>
                    <Text>有态度</Text>
                </Text>
            </View>
        )
    }
})

module.exports = Header;