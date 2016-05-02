'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeekDay = function (_React$Component) {
    _inherits(WeekDay, _React$Component);

    function WeekDay(props) {
        _classCallCheck(this, WeekDay);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WeekDay).call(this, props));

        _this.inRange = _this.inRange.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(WeekDay, [{
        key: 'inRange',
        value: function inRange() {
            return this.props.range.contains(this.props.date);
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            return this.inRange() ? this.props.onClick(this.props.date) : e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var inRange = this.inRange();
            var className = (0, _classnames2.default)('calendar__day', { calendar__day_available: inRange }, { calendar__day_disabled: !inRange }, { calendar__day_current: this.props.current });
            return _react2.default.createElement(
                'td',
                { className: 'calendar__cell' },
                _react2.default.createElement(
                    'span',
                    { className: className, onClick: this.onClick },
                    this.props.date.getDate()
                )
            );
        }
    }]);

    return WeekDay;
}(_react2.default.Component);

WeekDay.propTypes = {
    date: _react2.default.PropTypes.instanceOf(Date).isRequired,
    range: _react2.default.PropTypes.object.isRequired,
    onClick: _react2.default.PropTypes.func.isRequired
};

exports.default = WeekDay;