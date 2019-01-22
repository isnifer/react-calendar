'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _momentRange = require('moment-range');

var _momentRange2 = _interopRequireDefault(_momentRange);

var _locale = require('./locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TODAY_MONTH = new Date().getMonth();

var MonthPicker = function (_Component) {
    _inherits(MonthPicker, _Component);

    function MonthPicker(props) {
        _classCallCheck(this, MonthPicker);

        var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            month: parseInt(props.currentMonth, 10) || TODAY_MONTH
        };
        return _this;
    }

    _createClass(MonthPicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var month = _ref.month;

            if (month !== this.props.month) {
                this.setState({ month: month });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'calendar__months' },
                _locale.MONTH_NAMES[this.props.locale].map(function (item, i) {
                    var range = new _momentRange2.default(new Date(_this2.props.year, i, 1), new Date(_this2.props.year, i, 31));
                    var disabled = !range.overlaps(_this2.props.range);
                    return _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)('calendar__month-item', { 'calendar__month-item_current': i === _this2.state.month }, { 'calendar__month-item_disabled': disabled }),
                            onClick: _this2.onClick,
                            id: 'month_' + i + '_' + disabled,
                            key: i },
                        item
                    );
                })
            );
        }
    }]);

    return MonthPicker;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onClick = function (_ref2) {
        var target = _ref2.target;

        var props = target.id.split('_');
        if (props[2] === 'true') {
            return false;
        }

        var id = props[1];
        _this3.props.onClick(parseInt(id, 10));
    };
};

MonthPicker.propTypes = {
    locale: _react.PropTypes.string.isRequired,
    onClick: _react.PropTypes.func.isRequired,
    range: _react.PropTypes.instanceOf(_momentRange2.default).isRequired,
    year: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    currentMonth: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

exports.default = MonthPicker;