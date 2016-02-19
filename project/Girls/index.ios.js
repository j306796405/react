/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import Home from './app/Home';
import DateUtils from './app/utils/DateUtils';

class Girls extends Component {
    // 构造
    constructor(props) {
        super(props);
        DateUtils.extendDate();
    }

    render() {
        return (
            //用的对象需要[], 写的行内样式不需要[]需要{} 类似于写在一个对象里了所以不需要[]
            <View style={[styles.base_container]}>
                <Navigator
                    initialRoute={{
                        component: Home
                    }}
                    renderScene={
                        //还需要再理解下?????????
                        (route, navigator) => {
                            return <route.component navigator={navigator} {...route} {...route.passProps} />
                        }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base_container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('Girls', () => Girls);
