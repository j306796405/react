/**
 * React Native App
 * https://github.com/facebook/react-native
 */


import Home from './app/Home';
import DateUtils from './app/utils/DateUtils';

import React, {
    AppRegistry,
    StyleSheet,
    Navigator,
    Component
} from 'react-native';

class Gank extends Component {
    // 构造
    constructor(props) {
        super(props);
        DateUtils.extendDate();
    }

    render() {
        return (
            <Navigator
                style={styles.base_container}
                initialRoute={{
                    component: Home
                }}
                renderScene={
                    //还需要进一步理解
                    (route, navigator) => {
                        return <route.component navigator={navigator} {...route} {...route.passProps} />
                    }
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    base_container: {
        flex: 1
    }
})

AppRegistry.registerComponent('Gank', () => Gank);
