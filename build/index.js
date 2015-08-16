'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/* Utils */

var _momentRange = require('moment-range');

var _momentRange2 = _interopRequireDefault(_momentRange);

var _calendar = require('calendar');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var calendar = new _calendar.Calendar(1);
var defaultHandler = function defaultHandler() {};
var monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

var date = new Date();

var WeekDay = _react2['default'].createClass({
    displayName: 'WeekDay',

    propTypes: {
        date: _react2['default'].PropTypes.instanceOf(Date).isRequired,
        range: _react2['default'].PropTypes.object.isRequired,
        key: _react2['default'].PropTypes.number,
        onClick: _react2['default'].PropTypes.func.isRequired
    },

    inRange: function inRange() {
        return this.props.range.contains(this.props.date);
    },

    onClick: function onClick(e) {
        return this.inRange() ? this.props.onClick(this.props.date) : e.preventDefault();
    },

    render: function render() {
        var className = (0, _classnames2['default'])('calendar__day', { calendar__day_available: this.inRange() }, { calendar__day_disabled: !this.inRange() }, { calendar__day_current: this.props.current });
        return _react2['default'].createElement(
            'td',
            { className: className, onClick: this.onClick },
            this.props.date.getDate()
        );
    }
});

var Datepicker = _react2['default'].createClass({
    displayName: 'Datepicker',

    getInitialState: function getInitialState() {
        return {
            range: null,
            date: null,
            month: null,
            year: null
        };
    },

    propTypes: {
        onClick: _react2['default'].PropTypes.func,
        range: _react2['default'].PropTypes.object,
        disableNavigation: _react2['default'].PropTypes.bool,
        initialDate: _react2['default'].PropTypes.instanceOf(Date),
        initialMonth: _react2['default'].PropTypes.number,
        initialYear: _react2['default'].PropTypes.number,
        minimumDate: _react2['default'].PropTypes.instanceOf(Date),
        maximumDate: _react2['default'].PropTypes.instanceOf(Date)
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onClick: defaultHandler,
            range: null,
            disableNavigation: false,
            initialMonth: date.getMonth(),
            initialYear: date.getFullYear(),
            minimumDate: new Date(2000, 0, 1), // Дата начала учета
            maximumDate: new Date(2019, 0, 1) // Доступная дата вперед
        };
    },

    componentWillMount: function componentWillMount() {
        var state = {
            month: this.props.initialDate ? this.props.initialDate.getMonth() : this.props.initialMonth,
            year: this.props.initialYear,
            range: this.props.range || _momentRange2['default'].range(this.props.minimumDate, this.props.maximumDate),
            date: this.props.initialDate || date
        };

        this.setState(state);
    },

    componentWillReceiveProps: function componentWillReceiveProps(props) {
        var state = {
            range: props.range || _momentRange2['default'].range(props.minimumDate, props.maximumDate)
        };
        this.setState(state);
    },

    /**
     * Хэндлер смены месяца
     * @param  {Number} direction - направление движения (1, -1)
     */
    changeMonth: function changeMonth(direction) {
        var nextMonth = this.state.month + direction;
        var isMonthAvailable = nextMonth >= 0 && nextMonth <= 11;

        if (!isMonthAvailable) {
            this.setState({
                month: direction === 1 ? 0 : 11,
                year: this.state.year + direction
            });
        } else {
            this.setState({
                month: this.state.month + direction
            });
        }
    },

    /**
     * Сеттер состояния календаря. А еще он выполняет переданный коллбэк
     * @param  {Date} date - выбранная дата
     */
    onClick: function onClick(date) {
        if (date) {
            this.setState({ date: date });
            this.props.onClick(date);
        }
    },

    // Рендерим месяц
    renderMonth: function renderMonth() {
        var _this = this;

        // Двумерный массив, где на верхнем уровне недели
        // [[Date, Date, ...], [Date, Date, ...], ...]
        var month = calendar.monthDates(this.state.year, this.state.month);
        return month.map(function (e, i) {
            return _react2['default'].createElement(
                'tr',
                { className: 'calendar__week', key: i },
                _this.renderWeek(e)
            );
        });
    },

    /**
     * Рендерим неделю
     * @param  {Array} weekDays - массив из дат недели (instanceof Date)
     * @return {Array} - массив дней недели (React Component)
     */
    renderWeek: function renderWeek(weekDays) {
        var _this2 = this;

        return weekDays.map(function (day, i) {
            var isCurrent = _this2.state.date.toDateString() === day.toDateString();
            return _react2['default'].createElement(WeekDay, { key: i, date: day, range: _this2.state.range, current: isCurrent,
                onClick: _this2.onClick });
        });
    },

    // Рендерим названия дней недели в шапке
    renderWeekdayNames: function renderWeekdayNames() {
        return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(function (e, i) {
            return _react2['default'].createElement(
                'th',
                { className: 'calendar__weekday-name', key: i },
                e
            );
        });
    },

    // Рендерим кнопки управления месяцами
    renderNavigation: function renderNavigation() {
        return _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(
                'span',
                { className: 'calendar__arrow calendar__arrow_right',
                    onClick: this.changeMonth.bind(null, 1) },
                '>>'
            ),
            _react2['default'].createElement(
                'span',
                { className: 'calendar__arrow calendar__arrow_left',
                    onClick: this.changeMonth.bind(null, -1) },
                '<<'
            )
        );
    },

    render: function render() {
        return _react2['default'].createElement(
            'div',
            { className: 'calendar' },
            _react2['default'].createElement(
                'div',
                { className: 'calendar__head clearfix' },
                !this.state.disableNavigation && this.renderNavigation(),
                _react2['default'].createElement(
                    'span',
                    { className: 'calendar__month-name' },
                    monthNames[this.state.month] + ', ' + this.state.year
                )
            ),
            _react2['default'].createElement(
                'table',
                { className: 'calendar__month' },
                _react2['default'].createElement(
                    'thead',
                    null,
                    _react2['default'].createElement(
                        'tr',
                        { className: 'calendar__week-names' },
                        this.renderWeekdayNames()
                    )
                ),
                _react2['default'].createElement(
                    'tbody',
                    null,
                    this.renderMonth()
                )
            )
        );
    }
});

exports['default'] = Datepicker;
module.exports = exports['default'];
