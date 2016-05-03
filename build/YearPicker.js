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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var range = function range(currentYear) {
    var year = parseInt(currentYear, 10);
    var tmpArray = [];

    for (var i = currentYear - 5; i <= currentYear + 6; i++) {
        tmpArray = tmpArray.concat(i);
    }

    return tmpArray;
};

var TODAY_YEAR = new Date().getFullYear();

var YearPicker = function (_Component) {
    _inherits(YearPicker, _Component);

    function YearPicker(props) {
        _classCallCheck(this, YearPicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YearPicker).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            year: parseInt(props.currentYear, 10) || TODAY_YEAR
        };
        return _this;
    }

    _createClass(YearPicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var currentYear = _ref.currentYear;

            if (parseInt(currentYear, 10) !== this.props.year) {
                this.setState({ year: parseInt(currentYear, 10) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'calendar__years' },
                range(this.state.year).map(function (item, i) {
                    var range = new _momentRange2.default(new Date(item, 0, 1), new Date(item, 11, 31));
                    var disabled = !range.overlaps(_this2.props.range);
                    return _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)('calendar__year', { calendar__year_current: item === _this2.state.year }, { calendar__year_disabled: disabled }),
                            onClick: _this2.onClick,
                            id: 'year_' + i + '_' + disabled,
                            key: item },
                        item
                    );
                })
            );
        }
    }]);

    return YearPicker;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onClick = function (_ref2) {
        var _ref2$target = _ref2.target;
        var textContent = _ref2$target.textContent;
        var id = _ref2$target.id;

        var props = id.split('_');
        if (props[2] === 'true') {
            return false;
        }

        _this3.props.onClick(parseInt(textContent, 10));
    };
};

YearPicker.propTypes = {
    onClick: _react.PropTypes.func.isRequired,
    range: _react2.default.PropTypes.instanceOf(_momentRange2.default).isRequired,
    currentYear: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

exports.default = YearPicker;