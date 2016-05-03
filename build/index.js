'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _momentRange = require('moment-range');

var _momentRange2 = _interopRequireDefault(_momentRange);

var _calendar = require('calendar');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _WeekDay = require('./WeekDay');

var _WeekDay2 = _interopRequireDefault(_WeekDay);

var _YearPicker = require('./YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

var _MonthPicker = require('./MonthPicker');

var _MonthPicker2 = _interopRequireDefault(_MonthPicker);

var _locale = require('./locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Reset time of Date to 00:00:00
 * @param  {Date} date
 * @return {Date}
 */
function resetDate(date) {
    return new Date(date.toString().replace(/\d{2}:\d{2}:\d{2}/, '00:00:00'));
}

var id = 1;

var Datepicker = function (_Component) {
    _inherits(Datepicker, _Component);

    function Datepicker(props) {
        _classCallCheck(this, Datepicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Datepicker).call(this, props));

        _this.setOuterDate = function (date) {
            _this.props.onClick(date, _this.props.name || 'date_' + _this.id);
        };

        _this.onYearNameClick = function () {
            _this.setState({
                dateVisible: false,
                monthVisible: false,
                yearVisible: true
            });
        };

        _this.onYearClick = function (year) {
            _this.restoreDateVisibility({ year: year });
        };

        _this.onMonthNameClick = function () {
            _this.setState({
                dateVisible: false,
                monthVisible: true,
                yearVisible: false
            });
        };

        _this.onMonthClick = function (month) {
            _this.restoreDateVisibility({ month: month });
        };

        _this.restoreDateVisibility = function (model) {
            var month = model.month || _this.state.month;
            var year = model.year || _this.state.year;
            var day = _this.state.date.getDate();
            var date = new Date(year, month, day, 0, 0, 0);

            _this.setState(_extends({
                date: date,
                dateVisible: true,
                monthVisible: false,
                yearVisible: false
            }, model), _this.setOuterDate.bind(_this, date));
        };

        _this.state = {
            date: null,
            month: null,
            range: null,
            year: null,

            // UI: Visibility levels
            dateVisible: true,
            monthVisible: false,
            yearVisible: false
        };

        _this.id = id++;

        _this.calendar = new _calendar.Calendar(props.locale === 'RU' ? 1 : 0);

        _this.onClick = _this.onClick.bind(_this);
        _this.changeMonth = _this.changeMonth.bind(_this);
        return _this;
    }

    // Setting up default state of calendar


    _createClass(Datepicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var TODAY = new Date();

            // If we have defined 'initialDate' prop
            // we will use it also for define month and year.
            // If not it will be TODAY
            var initialDate = this.props.initialDate || TODAY;
            var initialRange = this.props.range || new _momentRange2.default(resetDate(this.props.minimumDate), resetDate(this.props.maximumDate));
            var state = {
                date: initialDate,
                month: initialDate.getMonth(),
                year: initialDate.getFullYear()
            };

            // Before set range to state we should check -
            // is range contains our initialDate.
            // If not, we will fire Error
            if (initialRange.contains(initialDate)) {
                state.range = initialRange;
            } else {
                throw new Error('Initial Range doesn\'t contains Initial Date');
            }

            this.setState(state);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var range = void 0;

            if (nextProps.range !== this.props.range) {
                range = nextProps.range;
            } else if (nextProps.minimumDate !== this.props.minimumDate || nextProps.maximumDate !== this.props.maximumDate) {
                range = new _momentRange2.default(resetDate(nextProps.minimumDate), resetDate(nextProps.maximumDate));
            }

            if (range) {
                this.setState({ range: range });
            }
        }

        /**
         * Change month handler
         * @param {Number} direction - "1" or "-1"
         */

    }, {
        key: 'changeMonth',
        value: function changeMonth(direction) {
            if (this.state.dateVisible) {
                var nextMonth = this.state.month + direction;
                var isMonthAvailable = nextMonth >= 0 && nextMonth <= 11;

                var model = void 0;
                if (!isMonthAvailable) {
                    model = {
                        month: direction === 1 ? 0 : 11,
                        year: this.state.year + direction
                    };
                } else {
                    model = { month: this.state.month + direction };
                }

                this.setState(model);
            }

            if (this.state.yearVisible) {
                this.setState({ year: this.state.year + (direction + 1 ? 12 : -12) });
            }
        }

        /**
         * Calendar state setter
         * @param  {Date} date - selected date
         */

    }, {
        key: 'onClick',
        value: function onClick(date) {
            if (date) {
                this.setState({ date: date }, this.setOuterDate.bind(this, date));
            }
        }
    }, {
        key: 'renderMonth',
        value: function renderMonth() {
            var _this2 = this;

            // Array of weeks, which contains arrays of days
            // [[Date, Date, ...], [Date, Date, ...], ...]
            var month = this.calendar.monthDates(this.state.year, this.state.month);
            return month.map(function (week, i) {
                return _react2.default.createElement(
                    'tr',
                    { className: 'calendar__week', key: i },
                    _this2.renderWeek(week)
                );
            });
        }

        /**
         * Render week
         * @param  {Array} weekDays - array of instanceof Date
         * @return {Array} - array of Components
         */

    }, {
        key: 'renderWeek',
        value: function renderWeek(weekDays) {
            var _this3 = this;

            return weekDays.map(function (day, i) {
                var isCurrent = _this3.state.date.toDateString() === day.toDateString();
                return _react2.default.createElement(_WeekDay2.default, {
                    key: i,
                    date: day,
                    range: _this3.state.range,
                    current: isCurrent,
                    onClick: _this3.onClick });
            });
        }
    }, {
        key: 'renderWeekdayNames',
        value: function renderWeekdayNames() {
            return _locale.WEEK_NAMES[this.props.locale].map(function (weekname, i) {
                return _react2.default.createElement(
                    'th',
                    { className: 'calendar__weekday-name', key: i },
                    weekname
                );
            });
        }

        // TODO: Fix direction

    }, {
        key: 'renderNavigation',
        value: function renderNavigation() {
            return _react2.default.createElement(
                'span',
                { className: 'calendar__arrows' },
                _react2.default.createElement(
                    'span',
                    {
                        className: 'calendar__arrow calendar__arrow_left',
                        onClick: this.changeMonth.bind(this, -1) },
                    '←'
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'calendar__month-name' },
                    _react2.default.createElement(
                        'span',
                        { className: 'calendar__head-month', onClick: this.onMonthNameClick },
                        _locale.MONTH_NAMES[this.props.locale][this.state.month]
                    ),
                    ', ',
                    _react2.default.createElement(
                        'span',
                        { className: 'calendar__head-year', onClick: this.onYearNameClick },
                        this.state.year
                    )
                ),
                _react2.default.createElement(
                    'span',
                    {
                        className: 'calendar__arrow calendar__arrow_right',
                        onClick: this.changeMonth.bind(this, 1) },
                    '→'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'calendar' },
                _react2.default.createElement(
                    'div',
                    { className: 'calendar__head' },
                    !this.props.disableNavigation && !this.props.outsideNavigation ? this.renderNavigation() : ''
                ),
                this.state.dateVisible && _react2.default.createElement(
                    'table',
                    { className: 'calendar__month' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            { className: 'calendar__week-names' },
                            this.renderWeekdayNames()
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.renderMonth()
                    )
                ),
                this.state.monthVisible && _react2.default.createElement(_MonthPicker2.default, {
                    currentMonth: this.props.month,
                    onClick: this.onMonthClick,
                    locale: this.props.locale,
                    range: this.state.range,
                    year: this.state.year
                }),
                this.state.yearVisible && _react2.default.createElement(_YearPicker2.default, { currentYear: this.state.year, onClick: this.onYearClick, range: this.state.range })
            );
        }
    }]);

    return Datepicker;
}(_react.Component);

Datepicker.propTypes = {
    onClick: _react.PropTypes.func,
    range: _react.PropTypes.instanceOf(_momentRange2.default),
    disableNavigation: _react.PropTypes.bool,
    outsideNavigation: _react.PropTypes.bool,
    initialDate: _react.PropTypes.instanceOf(Date),
    locale: _react.PropTypes.string,
    minimumDate: _react.PropTypes.instanceOf(Date),
    maximumDate: _react.PropTypes.instanceOf(Date),
    name: _react.PropTypes.string
};

Datepicker.defaultProps = {
    // Handler which will be execute when click on day
    onClick: function onClick() {},

    // Instance of DateRange
    range: null,

    // If true, navigation will be hidden
    disableNavigation: false,

    // If true, navigation will be in root container
    outsideNavigation: false,

    // Available locales: RU, EN, DE, FR, IT, POR, ESP
    locale: 'EN',

    // Minimum available date
    minimumDate: new Date(1970, 0, 1),

    // Maximum available date
    maximumDate: new Date(2100, 0, 1)
};

exports.default = Datepicker;