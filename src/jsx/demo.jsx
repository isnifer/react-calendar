import React from 'react';
import Datepicker from './datepicker';

function transformDate (date) {
    var day = date.getDate();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    return [day, month, date.getFullYear()].join('.');
}

const Demo = React.createClass({
    getInitialState () {
        return {date: null};
    },

    onClick (date) {
        this.setState({date: transformDate(date)});
    },

    render () {
        return (
            <div className="demo">
                <input type="text" name="date" value={this.state.date} readOnly />
                <Datepicker onClick={this.onClick} />
            </div>
        );
    }
});

React.render(<Demo />, document.querySelector('.datepicker'));
