import React from 'react';
import DateRange from 'moment-range';
import { Calendar } from 'calendar';
import cn from 'classnames';

const MONTH_NAMES = {
    RU: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    EN: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    DE: [
        'Januari', 'Februari', 'March', 'April', 'Kan', 'June',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ],
    FR: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Peut', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    ITA: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giu',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ],
    POR: [
        'Janeiro', 'Fevereiro', 'Março', 'April', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'November', 'Dezembro'
    ],
    ESP: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Puede', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
};

const WEEK_NAMES = {
    RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    DE: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    FR: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    IT: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    POR: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    ESP: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.']
};

const WEEK_NAMES_SHORT = {
    RU: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    EN: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    DE: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    FR: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    IT: ['D', 'L', 'Ma', 'Me', 'G', 'V', 'S'],
    POR: ['Dom', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sáb'],
    ESP: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
};

let calendar = new Calendar(1);
const DEFAULT_HANDLER = function () {};

class WeekDay extends React.Component {
    static propTypes = {
        date: React.PropTypes.instanceOf(Date).isRequired,
        range: React.PropTypes.object.isRequired,
        key: React.PropTypes.number,
        onClick: React.PropTypes.func.isRequired
    }

    inRange () {
        return this.props.range.contains(this.props.date);
    }

    onClick (e) {
        return ::this.inRange() ? this.props.onClick(this.props.date) : e.preventDefault();
    }

    render () {
        var className = cn(
            'calendar__day',
            {calendar__day_available: this.inRange()},
            {calendar__day_disabled: !this.inRange()},
            {calendar__day_current: this.props.current}
        );
        return (
            <td className="calendar__cell">
                <span className={className} onClick={::this.onClick}>{this.props.date.getDate()}</span>
            </td>
        );
    }
}

class Datepicker extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        range: React.PropTypes.instanceOf(DateRange),
        disableNavigation: React.PropTypes.bool,
        outsideNavigation: React.PropTypes.bool,
        initialDate: React.PropTypes.instanceOf(Date),
        locale: React.PropTypes.string,
        minimumDate: React.PropTypes.instanceOf(Date),
        maximumDate: React.PropTypes.instanceOf(Date),
    }

    static defaultProps = {

        // Handler which will be execute when click on day
        onClick: DEFAULT_HANDLER,

        // Instance of DateRange
        range: null,

        // If true, navigation will be hidden
        disableNavigation: false,

        // If true, navigation will be in root container
        outsideNavigation: false,

        // Available locales: RU, EN, DE, FR, IT, POR, ESP
        locale: 'RU',

        // Minimum available date
        minimumDate: new Date(1970, 0, 1),

        // Maximum available date
        maximumDate: new Date(2100, 0, 1)
    }

    constructor (props) {
        super(props);

        this.state = {
            date: null,
            month: null,
            range: null,
            year: null
        };
    }

    // Setting up default state of calendar
    componentWillMount () {
        const TODAY = new Date();

        // If we have defined 'initialDate' prop
        // we will use it also for define month and year.
        // If not it will be TODAY
        let initialDate = this.props.initialDate || TODAY;
        let initialRange = this.props.range || new DateRange(this.props.minimumDate, this.props.maximumDate);
        let state;

        state = {
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

    componentWillReceiveProps (nextProps) {
        let range;

        if (nextProps.range !== this.props.range) {
            range = props.range
        } else if (nextProps.minimumDate !== this.props.minimumDate &&
                   nextProps.maximumDate !== this.props.maximumDate) {
            range = new DateRange(nextProps.minimumDate, nextProps.maximumDate);
        }

        this.setState({range: range});
    }

    /**
     * Change month handler
     * @param {Number} direction - "1" or "-1"
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
    }

    /**
     * Calendar state setter
     * @param  {Date} date - выбранная дата
     */
    onClick (date) {
        if (date) {
            this.setState({date: date}, this.props.onClick(date));
        }
    }

    renderMonth () {

        // Array of weeks, which contains arrays of days
        // [[Date, Date, ...], [Date, Date, ...], ...]
        var month = calendar.monthDates(this.state.year, this.state.month);
        return month.map((week, i) => {
            return <tr className="calendar__week" key={i}>{this.renderWeek(week)}</tr>;
        });
    }

    /**
     * Render week
     * @param  {Array} weekDays - array of instanceof Date
     * @return {Array} - array of Components
     */
    renderWeek (weekDays) {
        return weekDays.map((day, i) => {
            var isCurrent = this.state.date.toDateString() === day.toDateString();
            return (
                <WeekDay
                    key={i}
                    date={day}
                    range={this.state.range}
                    current={isCurrent}
                    onClick={::this.onClick} />
            );
        });
    }

    renderWeekdayNames () {
        return WEEK_NAMES[this.props.locale].map((weekname, i) => {
            return <th className="calendar__weekday-name" key={i}>{weekname}</th>;
        });
    }

    renderNavigation () {
        return (
            <span className="calendar__arrows">
                <span
                    className="calendar__arrow calendar__arrow_right"
                    onClick={this.changeMonth.bind(this, 1)}>
                    {'>>'}
                </span>
                <span
                    className="calendar__arrow calendar__arrow_left"
                    onClick={this.changeMonth.bind(this, -1)}>
                    {'<<'}
                </span>
            </span>
        );
    }

    render () {
        return (
            <div className="calendar">
                <div className="calendar__head">
                    {!this.props.disableNavigation && !this.props.outsideNavigation ? this.renderNavigation() : ''}
                    <span className="calendar__month-name">
                        {MONTH_NAMES[this.props.locale][this.state.month] + ', ' + this.state.year}
                    </span>
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
                {!this.props.disableNavigation && this.props.outsideNavigation ? this.renderNavigation() : ''}
            </div>
        );
    }
}

export default Datepicker;
