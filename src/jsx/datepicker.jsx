import React from 'react';
import moment from 'moment-range';
import { Calendar } from 'calendar';
import cn from 'classnames';

const calendar = new Calendar(1);
const defaultHandler = function () {};
const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

let date = new Date();

const WeekDay = React.createClass({
    propTypes: {
        date: React.PropTypes.instanceOf(Date).isRequired,
        range: React.PropTypes.object.isRequired,
        key: React.PropTypes.number,
        onClick: React.PropTypes.func.isRequired
    },

    inRange () {
        return this.props.range.contains(this.props.date);
    },

    onClick (e) {
        return this.inRange() ? this.props.onClick(this.props.date) : e.preventDefault();
    },

    render () {
        var className = cn(
            'calendar__day',
            {calendar__day_available: this.inRange()},
            {calendar__day_disabled: !this.inRange()},
            {calendar__day_current: this.props.current}
        );
        return (
            <td className="calendar__cell" onClick={this.onClick}>
                <span className={className}>{this.props.date.getDate()}</span>
            </td>
        );
    }
});

const Datepicker = React.createClass({

    getInitialState () {
        return {
            range: null,
            date: null,
            month: null,
            year: null
        };
    },

    propTypes: {
        onClick: React.PropTypes.func,
        range: React.PropTypes.object,
        disableNavigation: React.PropTypes.bool,
        initialDate: React.PropTypes.instanceOf(Date),
        initialMonth: React.PropTypes.number,
        initialYear: React.PropTypes.number,
        minimumDate: React.PropTypes.instanceOf(Date),
        maximumDate: React.PropTypes.instanceOf(Date)
    },

    getDefaultProps () {
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

    componentWillMount () {
        var state = {
            month: this.props.initialDate ? this.props.initialDate.getMonth() : this.props.initialMonth,
            year: this.props.initialYear,
            range: this.props.range || moment.range(this.props.minimumDate, this.props.maximumDate),
            date: this.props.initialDate || date
        };

        this.setState(state);
    },

    componentWillReceiveProps (props) {
        var state = {
            range: props.range || moment.range(props.minimumDate, props.maximumDate)
        };
        this.setState(state);
    },

    /**
     * Хэндлер смены месяца
     * @param  {Number} direction - направление движения (1, -1)
     */
    changeMonth (direction) {
        var nextMonth = this.state.month + direction;
        var isMonthAvailable = nextMonth >= 0 && nextMonth <= 11;

        if (!isMonthAvailable) {
            this.setState({
                month: direction === 1 ? 0 : 11,
                year: this.state.year + direction
            });
        } else {
            this.setState({
                month: this.state.month + direction,
            });
        }
    },

    /**
     * Сеттер состояния календаря. А еще он выполняет переданный коллбэк
     * @param  {Date} date - выбранная дата
     */
    onClick (date) {
        if (date) {
            this.setState({date: date});
            this.props.onClick(date);
        }
    },

    // Рендерим месяц
    renderMonth () {

        // Двумерный массив, где на верхнем уровне недели
        // [[Date, Date, ...], [Date, Date, ...], ...]
        var month = calendar.monthDates(this.state.year, this.state.month);
        return month.map((e, i) => {
            return <tr className="calendar__week" key={i}>{this.renderWeek(e)}</tr>;
        });
    },

    /**
     * Рендерим неделю
     * @param  {Array} weekDays - массив из дат недели (instanceof Date)
     * @return {Array} - массив дней недели (React Component)
     */
    renderWeek (weekDays) {
        return weekDays.map((day, i) => {
            var isCurrent = this.state.date.toDateString() === day.toDateString();
            return <WeekDay key={i} date={day} range={this.state.range} current={isCurrent}
                            onClick={this.onClick} />;
        });
    },

    // Рендерим названия дней недели в шапке
    renderWeekdayNames () {
        return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(function (e, i) {
            return <th className="calendar__weekday-name" key={i}>{e}</th>;
        });
    },

    // Рендерим кнопки управления месяцами
    renderNavigation () {
        return (
            <span className="calendar__arrows">
                <span className="calendar__arrow calendar__arrow_right"
                      onClick={this.changeMonth.bind(null, 1)}>{'>>'}</span>
                <span className="calendar__arrow calendar__arrow_left"
                      onClick={this.changeMonth.bind(null, -1)}>{'<<'}</span>
            </span>
        );
    },

    render () {
        return (
            <div className="calendar">
                <div className="calendar__head clearfix">
                    {!this.props.disableNavigation && !this.props.outsideNavigation && this.renderNavigation()}
                    <span className="calendar__month-name">
                        {monthNames[this.state.month] + ', ' + this.state.year}</span>
                </div>
                <table className="calendar__month">
                    <thead>
                        <tr className="calendar__week-names">
                            {this.renderWeekdayNames()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMonth()}
                    </tbody>
                </table>
                {!this.props.disableNavigation && this.props.outsideNavigation && this.renderNavigation()}
            </div>
        );
    }
});

export default Datepicker;
