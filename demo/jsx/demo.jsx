import React from 'react';
import Datepicker from '../../build/index.js';
import DateRange from 'moment-range';

function transformDate (date) {
    var day = date.getDate();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    return [day, month, date.getFullYear()].join('.');
}

class Demo extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            date: transformDate(new Date()),
            date2: transformDate(new Date(2015, 7, 8)),
            date3: transformDate(new Date(2011, 7, 12))
        };
    }

    onClick (date) {
        this.setState({date: transformDate(date)});
    }

    onClickTwo (date) {
        this.setState({date2: transformDate(date)});
    }

    onClickThree (date) {
        this.setState({date3: transformDate(date)});
    }

    render () {
        return (
            <div className="demo">
                <div className="demo__part">
                    <input
                        type="text"
                        name="date"
                        className="demo__input"
                        value={this.state.date}
                        readOnly />
                    <Datepicker onClick={::this.onClick} />
                    <div className="demo__props">
                        <div className="demo__title">Source</div>
                        <pre className="demo__code">{'<Datepicker onClick={::this.onClick} />'}</pre>
                    </div>
                </div>
                <div className="demo__part">
                    <input
                        type="text"
                        name="date"
                        className="demo__input"
                        value={this.state.date2}
                        readOnly />
                    <Datepicker
                        onClick={::this.onClickTwo}
                        range={new DateRange(new Date(2015, 7, 1), new Date(2015, 7, 16))}
                        initialDate={new Date(2015, 7, 8)}
                        locale="EN" />
                    <div className="demo__props">
                        <div className="demo__title">Source</div>
                        <pre className="demo__code">
                            {'<Datepicker\n' +
                             '  onClick={::this.onClickTwo}\n' +
                             '  range={new DateRange(new Date(2015, 7, 1), new Date(2015, 7, 16))}\n' +
                             '  initialDate={new Date(2015, 7, 8)}\n' +
                             '  locale="EN" />'}
                        </pre>
                    </div>
                </div>
                <div className="demo__part">
                    <input
                        type="text"
                        name="date"
                        className="demo__input"
                        value={this.state.date3}
                        readOnly />
                    <Datepicker
                        onClick={::this.onClickThree}
                        range={new DateRange(new Date(2011, 7, 3), new Date(2011, 8, 3))}
                        initialDate={new Date(2011, 7, 12)}
                        locale="DE" />
                    <div className="demo__props">
                        <div className="demo__title">Source</div>
                        <pre className="demo__code">
                            {'<Datepicker\n' +
                             '  onClick={::this.onClickThree}\n' +
                             '  range={new DateRange(new Date(2011, 7, 3), new Date(2011, 8, 3))}\n' +
                             '  initialDate={new Date(2011, 7, 12)}\n' +
                             '  locale="DE" />'}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

React.render(<Demo />, document.querySelector('.datepicker'));
