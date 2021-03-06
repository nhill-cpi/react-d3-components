'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = _propTypes2.default.number,
    string = _propTypes2.default.string,
    array = _propTypes2.default.array,
    object = _propTypes2.default.object,
    func = _propTypes2.default.func,
    oneOfType = _propTypes2.default.oneOfType;


var Bar = (0, _createReactClass2.default)({
    displayName: 'Bar',

    // propTypes: {
    //     width: number.isRequired,
    //     height: number.isRequired,
    //     x: number.isRequired,
    //     y: number.isRequired,
    //     fill: string.isRequired,
    //     data: oneOfType([array, object]).isRequired,
    //     onMouseEnter: func,
    //     onMouseLeave: func
    // },
    // },

    render: function render() {
        var _props = this.props,
            x = _props.x,
            y = _props.y,
            width = _props.width,
            height = _props.height,
            fill = _props.fill,
            data = _props.data,
            onMouseEnter = _props.onMouseEnter,
            _onMouseLeave = _props.onMouseLeave;
        // console.log("x is", x);



        return _react2.default.createElement('rect', {
            className: 'bar',
            x: x,
            y: y,
            width: width,
            height: height,
            fill: fill,
            onMouseMove: function onMouseMove(e) {
                return onMouseEnter(e, data);
            },
            onMouseLeave: function onMouseLeave(e) {
                return _onMouseLeave(e);
            }
        });
    }
});

exports.default = Bar;
