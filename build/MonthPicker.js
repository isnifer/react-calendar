'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MonthPicker).call(this, props));

        _this.onClick = function (_ref) {
            var target = _ref.target;

            var id = target.id.split('_')[1];
            _this.props.onClick(parseInt(id, 10));
        };

        _this.state = {
            month: parseInt(props.currentMonth, 10) || TODAY_MONTH
        };
        return _this;
    }

    _createClass(MonthPicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var month = _ref2.month;

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
                    return _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)('calendar__month-item', { 'calendar__month-item_current': i === _this2.state.month }),
                            onClick: _this2.onClick,
                            id: 'month_' + i,
                            key: i },
                        item
                    );
                })
            );
        }
    }]);

    return MonthPicker;
}(_react.Component);

MonthPicker.propTypes = {
    locale: _react.PropTypes.string.isRequired,
    onClick: _react.PropTypes.func.isRequired,
    currentMonth: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

exports.default = MonthPicker;