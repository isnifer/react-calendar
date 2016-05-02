import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { MONTH_NAMES } from './locale';

const TODAY_MONTH = new Date().getMonth();
class MonthPicker extends Component {
    constructor(props) {
        super(props);


        this.state = {
            month: parseInt(props.currentMonth, 10) || TODAY_MONTH,
        };
    }

    componentWillReceiveProps({month}) {
        if (month !== this.props.month) {
            this.setState({month});
        }
    }

    onClick = ({target}) => {
        const id = target.id.split('_')[1];
        this.props.onClick(parseInt(id, 10));
    }

    render() {
        return (
            <div className="calendar__months">
                {MONTH_NAMES[this.props.locale].map((item, i) =>(
                    <div
                        className={cn('calendar__month-item', {'calendar__month-item_current': i === this.state.month})}
                        onClick={this.onClick}
                        id={`month_${i}`}
                        key={i}>
                        {item}
                    </div>
                ))}
            </div>
        );
    }
}

MonthPicker.propTypes = {
    locale: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    currentMonth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default MonthPicker;
