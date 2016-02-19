/**
 * loading.js
 * @author jianglj
 * @create 2016-02-18 13:55
 */
'use strict'
import React, {
    Component,
    Animated,
    PropTypes,
    View
} from 'react-native';

class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loadingAnimValue: new Animated.Value(0)
        };
    }

    static propTypes = {
        distance: PropTypes.number,
        duration: PropTypes.number,
        bgColor: PropTypes.string,
        radius: PropTypes.number
    };

    static defaultProps = {
        distance: 50,
        duration: 500,
        bgColor: '#fff',
        radius: 5
    };

    componentDidMount() {
        this._createAnim(this);
    }

    _createAnim(that) {
        Animated.timing(
            this.state.loadingAnimValue,
            {
                toValue: 1,
                duration: this.props.duration
            }).start(() => {
            Animated.timing(
                this.state.loadingAnimValue,
                {
                    toValue: 0,
                    duration: this.props.duration
                }).start(() => {
                that._createAnim(that)
            })
        })
    }

    render() {
        //这里的style不需要[]吗?
        return (
            <Animated.View
                style={{
                    width: this.props.radius * 2,
                    height: this.props.radius * 2,
                    borderRadius: this.props.radius,
                    backgroundColor: this.props.bgColor,
                    transform: [{
                        translateX: this.state.loadingAnimValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-this.props.distance, this.props.distance]
                        })
                    }]
                }}
            />
        )
    }
}

module.exports = Loading;