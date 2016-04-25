import React from 'react';
import cn from 'classnames';

class WeekDay extends React.Component {
    constructor(props) {
        super(props);

        this.inRange = this.inRange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    inRange () {
        return this.props.range.contains(this.props.date);
    }

    onClick (e) {
        return this.inRange() ? this.props.onClick(this.props.date) : e.preventDefault();
    }

    render () {
        const inRange = this.inRange();
        const className = cn(
            'calendar__day',
            {calendar__day_available: inRange},
            {calendar__day_disabled: !inRange},
            {calendar__day_current: this.props.current}
        );
        return (
            <td className="calendar__cell">
                <span className={className} onClick={this.onClick}>{this.props.date.getDate()}</span>
            </td>
        );
    }
}

WeekDay.propTypes = {
    date: React.PropTypes.instanceOf(Date).isRequired,
    range: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default WeekDay;
