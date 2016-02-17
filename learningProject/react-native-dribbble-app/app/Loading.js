var React = require("react-native");
var {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} = React;

var Loading = React.createClass({
  render: function() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <ActivityIndicatorIOS
            //前面没传值 这里夏几把乱写有鸟用啊
            animating={this.props.isLoading}
            style={styles.spinner}
            size="small"
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    flexDirection: "column",
    justifyContent: "center",
  },
  centerText: {
    alignItems: "center",
  },
  spinner: {
    height: 50,
    width: 50,
    backgroundColor: 'yellow'
  }
});

module.exports = Loading;
