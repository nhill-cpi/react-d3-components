'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _DefaultPropsMixin = require('./DefaultPropsMixin');

var _DefaultPropsMixin2 = _interopRequireDefault(_DefaultPropsMixin);

var _HeightWidthMixin = require('./HeightWidthMixin');

var _HeightWidthMixin2 = _interopRequireDefault(_HeightWidthMixin);

var _ArrayifyMixin = require('./ArrayifyMixin');

var _ArrayifyMixin2 = _interopRequireDefault(_ArrayifyMixin);

var _StackAccessorMixin = require('./StackAccessorMixin');

var _StackAccessorMixin2 = _interopRequireDefault(_StackAccessorMixin);

var _StackDataMixin = require('./StackDataMixin');

var _StackDataMixin2 = _interopRequireDefault(_StackDataMixin);

var _DefaultScalesMixin = require('./DefaultScalesMixin');

var _DefaultScalesMixin2 = _interopRequireDefault(_DefaultScalesMixin);

var _TooltipMixin = require('./TooltipMixin');

var _TooltipMixin2 = _interopRequireDefault(_TooltipMixin);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var array = _propTypes2.default.array,
    func = _propTypes2.default.func,
    string = _propTypes2.default.string;


var DataSet = (0, _createReactClass2.default)({
    displayName: 'DataSet',

    propTypes: {
        data: array.isRequired,
        xScale: func.isRequired,
        yScale: func.isRequired,
        colorScale: func.isRequired,
        values: func.isRequired,
        label: func.isRequired,
        x: func.isRequired,
        y: func.isRequired,
        y0: func.isRequired
    },

    render: function render() {
        var _props = this.props,
            data = _props.data,
            xScale = _props.xScale,
            yScale = _props.yScale,
            colorScale = _props.colorScale,
            values = _props.values,
            label = _props.label,
            x = _props.x,
            y = _props.y,
            y0 = _props.y0,
            barWidth = _props.barWidth,
            onMouseEnter = _props.onMouseEnter,
            onMouseLeave = _props.onMouseLeave,
            groupedBars = _props.groupedBars,
            colorByLabel = _props.colorByLabel;
        // console.log("bar chart props", this.props);

        console.log("xScale is", xScale);
        console.log("xScalerange is", xScale.range());

        var bars = void 0;
        if (groupedBars) {
            bars = data.map(function (stack, serieIndex) {
                return values(stack).map(function (e, index) {
                    var yVal = y(e) < 0 ? yScale(0) : yScale(y(e));
                    return _react2.default.createElement(_Bar2.default, {
                        key: label(stack) + '.' + index,
                        width: xScale.rangeBand() / data.length,
                        height: Math.abs(yScale(0) - yScale(y(e))),
                        x: xScale(x(e)) + xScale.rangeBand() * serieIndex / data.length,
                        y: yVal,
                        fill: colorScale(label(stack)),
                        data: e,
                        onMouseEnter: onMouseEnter,
                        onMouseLeave: onMouseLeave
                    });
                });
            });
        } else {
            bars = data.map(function (stack) {

                return values(stack).map(function (e, index) {
                    var color = colorByLabel ? colorScale(label(stack)) : colorScale(x(e));
                    var yVal = y(e) < 0 ? yScale(y0(e)) : yScale(y0(e) + y(e));
                    console.log("e is", e);

                    return _react2.default.createElement(_Bar2.default, {
                        key: label(stack) + '.' + index,
                        // barWidth: xScale.rangeBand(),
                        width: 11,
                        xValue: x(e),

                        height: Math.abs(yScale(y0(e) + y(e)) - yScale(y0(e))),
                        // x: xScale(x(e)),
                        x: xScale.range()[index],
                        // x: 15 * index,
                        y: yVal,
                        fill: color,
                        data: e,
                        onMouseEnter: onMouseEnter,
                        onMouseLeave: onMouseLeave
                    });
                });
            });
        }

        return _react2.default.createElement(
            'g',
            null,
            bars
        );
    }
});

var BarChart = (0, _createReactClass2.default)({
    displayName: 'BarChart',

    mixins: [_DefaultPropsMixin2.default, _HeightWidthMixin2.default, _ArrayifyMixin2.default, _StackAccessorMixin2.default, _StackDataMixin2.default, _DefaultScalesMixin2.default, _TooltipMixin2.default],

    getDefaultProps: function getDefaultProps() {
        return {
            colorByLabel: true
        };
    },
    _tooltipHtml: function _tooltipHtml(d) {
        var xScale = this._xScale;
        var yScale = this._yScale;

        var data = this.props.data,
            x = this.props.x,
            y = this.props.y,
            y0 = this.props.y0,
            label;

        data.map(function (dataObj, i) {
            for (var j in dataObj) {
                if (j == 'values') {
                    dataObj[j].map(function (value, i) {
                        if (value.x == x(d) && value.y == y(d) && value.y0 == y0(d)) label = dataObj['label']
                    })
                }
            }
        })

        var html = this.props.tooltipHtml(this.props.x(d), this.props.y0(d), this.props.y(d), label);

        // var html = this.props.tooltipHtml(this.props.x(d), this.props.y0(d), this.props.y(d));

        // @todo: var midPoint = xScale.rangeBand() / 2;
        var midPoint = 500;
        var xPos = midPoint + xScale(this.props.x(d));

        var topStack = this._data[this._data.length - 1].values;
        var topElement = null;

        // TODO: this might not scale if dataset is huge.
        // consider pre-computing yPos for each X
        for (var i = 0; i < topStack.length; i++) {
            if (this.props.x(topStack[i]) === this.props.x(d)) {
                topElement = topStack[i];
                break;
            }
        }
        var yPos = yScale(this.props.y0(topElement) + this.props.y(topElement));

        return [html, xPos, yPos, label];
    },
    render: function render() {
        var _props2 = this.props,
            xAxis = _props2.xAxis,
            yAxis = _props2.yAxis,
            height = _props2.height,
            width = _props2.width,
            margin = _props2.margin,
            viewBox = _props2.viewBox,
            preserveAspectRatio = _props2.preserveAspectRatio,
            colorScale = _props2.colorScale,
            values = _props2.values,
            label = _props2.label,
            y = _props2.y,
            y0 = _props2.y0,
            x = _props2.x,
            barWidth = _props2.barWidth,
            dataLength = _props2.dataLength,
            groupedBars = _props2.groupedBars,
            colorByLabel = _props2.colorByLabel,
            tickFormat = _props2.tickFormat;

        // console.log("bar width is ", this.props);
        // console.log(x);
        // console.log(dataLength);
        // x = function(e) {return e.x - 8;};
        // console.log(x);

        var data = this._data;
        var innerWidth = this._innerWidth;
        var innerHeight = this._innerHeight;
        var xScale = this._xScale;
        var yScale = this._yScale;
        var yIntercept = this._yIntercept;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _Chart2.default,
                {
                    height: height,
                    width: width,
                    margin: margin,
                    viewBox: viewBox,
                    preserveAspectRatio: preserveAspectRatio
                },
                _react2.default.createElement(DataSet, {
                    data: data,
                    xScale: xScale,
                    yScale: yScale,
                    colorScale: colorScale,
                    values: values,
                    label: label,
                    y: y,
                    y0: y0,
                    x: x,
                    barWidth: barWidth,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave,
                    groupedBars: groupedBars,
                    colorByLabel: colorByLabel
                }),
                _react2.default.createElement(_Axis2.default, _extends({
                    className: 'x axis',
                    orientation: 'bottom',
                    scale: xScale,
                    height: innerHeight,
                    width: innerWidth,
                    zero: yIntercept,
                    tickFormat: tickFormat
                }, xAxis)),
                _react2.default.createElement(_Axis2.default, _extends({
                    className: 'y axis',
                    orientation: 'left',
                    scale: yScale,
                    height: innerHeight,
                    width: innerWidth,
                    tickFormat: tickFormat
                }, yAxis)),
                this.props.children
            ),
            _react2.default.createElement(_Tooltip2.default, this.state.tooltip)
        );
    }
});

exports.default = BarChart;
