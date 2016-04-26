'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var DateRange = _interopDefault(require('moment-range'));
var calendar = require('calendar');
var cn = _interopDefault(require('classnames'));

var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

var WeekDay = function (_React$Component) {
    babelHelpers.inherits(WeekDay, _React$Component);

    function WeekDay(props) {
        babelHelpers.classCallCheck(this, WeekDay);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(WeekDay).call(this, props));

        _this.inRange = _this.inRange.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    babelHelpers.createClass(WeekDay, [{
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
            var className = cn('calendar__day', { calendar__day_available: inRange }, { calendar__day_disabled: !inRange }, { calendar__day_current: this.props.current });
            return React.createElement(
                'td',
                { className: 'calendar__cell' },
                React.createElement(
                    'span',
                    { className: className, onClick: this.onClick },
                    this.props.date.getDate()
                )
            );
        }
    }]);
    return WeekDay;
}(React.Component);

WeekDay.propTypes = {
    date: React.PropTypes.instanceOf(Date).isRequired,
    range: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

var MONTH_NAMES = {
    RU: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    DE: ['Januari', 'Februari', 'March', 'April', 'Kan', 'June', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    FR: ['Janvier', 'Février', 'Mars', 'Avril', 'Peut', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    ITA: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giu', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    POR: ['Janeiro', 'Fevereiro', 'Março', 'April', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'November', 'Dezembro'],
    ESP: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Puede', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
};

var WEEK_NAMES = {
    RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    DE: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    FR: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    IT: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    POR: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    ESP: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.']
};

/**
 * Reset time of Date to 00:00:00
 * @param  {Date} date
 * @return {Date}
 */
function resetDate(date) {
    return new Date(date.toString().replace(/\d{2}:\d{2}:\d{2}/, '00:00:00'));
}

var Datepicker = function (_React$Component) {
    babelHelpers.inherits(Datepicker, _React$Component);

    function Datepicker(props) {
        babelHelpers.classCallCheck(this, Datepicker);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Datepicker).call(this, props));

        _this.state = {
            date: null,
            month: null,
            range: null,
            year: null
        };

        _this.calendar = new calendar.Calendar(props.locale === 'RU' ? 1 : 0);

        _this.onClick = _this.onClick.bind(_this);
        _this.changeMonth = _this.changeMonth.bind(_this);
        return _this;
    }

    // Setting up default state of calendar


    babelHelpers.createClass(Datepicker, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var TODAY = new Date();

            // If we have defined 'initialDate' prop
            // we will use it also for define month and year.
            // If not it will be TODAY
            var initialDate = this.props.initialDate || TODAY;
            var initialRange = this.props.range || new DateRange(resetDate(this.props.minimumDate), resetDate(this.props.maximumDate));
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
                range = new DateRange(resetDate(nextProps.minimumDate), resetDate(nextProps.maximumDate));
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

        /**
         * Calendar state setter
         * @param  {Date} date - выбранная дата
         */

    }, {
        key: 'onClick',
        value: function onClick(date) {
            if (date) {
                this.setState({ date: date }, this.props.onClick(date));
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
                return React.createElement(
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
                return React.createElement(WeekDay, {
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
            return WEEK_NAMES[this.props.locale].map(function (weekname, i) {
                return React.createElement(
                    'th',
                    { className: 'calendar__weekday-name', key: i },
                    weekname
                );
            });
        }
    }, {
        key: 'renderNavigation',
        value: function renderNavigation() {
            return React.createElement(
                'span',
                { className: 'calendar__arrows' },
                React.createElement(
                    'span',
                    {
                        className: 'calendar__arrow calendar__arrow_right',
                        onClick: this.changeMonth.bind(this, 1) },
                    '>>'
                ),
                React.createElement(
                    'span',
                    {
                        className: 'calendar__arrow calendar__arrow_left',
                        onClick: this.changeMonth.bind(this, -1) },
                    '<<'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'calendar' },
                React.createElement(
                    'div',
                    { className: 'calendar__head' },
                    !this.props.disableNavigation && !this.props.outsideNavigation ? this.renderNavigation() : '',
                    React.createElement(
                        'span',
                        { className: 'calendar__month-name' },
                        MONTH_NAMES[this.props.locale][this.state.month] + ', ' + this.state.year
                    )
                ),
                React.createElement(
                    'table',
                    { className: 'calendar__month' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            { className: 'calendar__week-names' },
                            this.renderWeekdayNames()
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.renderMonth()
                    )
                ),
                !this.props.disableNavigation && this.props.outsideNavigation ? this.renderNavigation() : ''
            );
        }
    }]);
    return Datepicker;
}(React.Component);

Datepicker.propTypes = {
    onClick: React.PropTypes.func,
    range: React.PropTypes.instanceOf(DateRange),
    disableNavigation: React.PropTypes.bool,
    outsideNavigation: React.PropTypes.bool,
    initialDate: React.PropTypes.instanceOf(Date),
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.instanceOf(Date),
    maximumDate: React.PropTypes.instanceOf(Date)
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

module.exports = Datepicker;