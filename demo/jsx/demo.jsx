import React from 'react';
import { render } from 'react-dom';
import Datepicker from '../../build/';
import DateRange from 'moment-range';

function transformDate (date) {
    var day = date.getDate();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    return [day, month, date.getFullYear()].join('.');
}

const leftRangeDate = new Date(2015, 7, 20);
const rightRangeDate = new Date(2015, 7, 27);

class Demo extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            date1: transformDate(new Date()),
            date2: transformDate(new Date(2015, 7, 8)),
            date3: transformDate(new Date(2015, 7, 12)),
            date4: leftRangeDate,
            date5: rightRangeDate
        };

        this.onClick = this.onClick.bind(this);
        this.onClickTwo = this.onClickTwo.bind(this);
        this.onClickThree = this.onClickThree.bind(this);
        this.onClickFour = this.onClickFour.bind(this);
        this.onClickFive = this.onClickFive.bind(this);
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

    onClickFour (date) {
        this.setState({date4: date});
    }

    onClickFive (date) {
        this.setState({date5: date});
    }

    render () {
        return (
            <div className="demo">
                <div className="demo__part">
                    <div className="demo__description">
                        <div className="demo__ru">
                            Самый простой вариант календаря. Ему передан только callback, <br/>
                            который в свою очередь будет возвращать дату календаря в качестве <br/>
                            единственного аргумента
                        </div>
                        <div className="demo__en">
                            Very simple calendar example. It got only callback, which will pass <br/>
                            selected date as argument.
                        </div>
                    </div>
                    <input
                        type="text"
                        name="date"
                        className="demo__input"
                        value={this.state.date1}
                        readOnly />
                    <Datepicker onClick={this.onClick} />
                    <div className="demo__props">
                        <div className="demo__title">Source</div>
                        <pre className="demo__code">{'<Datepicker onClick={this.onClick} />'}</pre>
                    </div>
                </div>
                <div className="demo__part">
                    <div className="demo__description">
                        <div className="demo__ru">
                            Чуть более сложный вариант календаря. Компонент получил три новых атрибута. <br/>
                            Атрибут <em>range</em> - instanceof 'moment-range'. Период календаря, <br/>
                            задает пределы доступности выбора дат в календаре. <br/>
                            Атрибут <em>initialDate</em> - instanceof 'Date'. Дата, которая будет выбрана
                            в календаре <br/>
                            по умолчанию. Важно! Эта дата, должна быть частью периода календаря. <br/>
                            Атрибут <em>locale</em> - instanceof 'String'. Несколько встроенных локалей на выбор: <br/>
                            RU, EN, DE, FR, ITA, POR, ESP
                        </div>
                        <div className="demo__en">
                            A little more complex version of the calendar. The component has received three
                            new attribute. <br/>
                            Attribute <em>range</em> - instanceof 'moment-range'. Period of the Calendar, <br/>
                            sets limits accessibility to select dates on the calendar. <br/>
                            Attribute <em>initialDate</em> - instanceof 'Date'. Date to be selected
                            on the calendar default. <br/>
                            Important! This date should be part of the period of the calendar. <br/>
                            Attribute <em>locale</em> - instanceof 'String'.
                            Several built-in locales to choose from: <br/>
                            RU, EN, DE, FR, ITA, POR, ESP.
                        </div>
                    </div>
                    <div className="demo__inline">
                        <input
                            type="text"
                            name="date"
                            className="demo__input"
                            value={this.state.date2}
                            readOnly />
                        <Datepicker
                            onClick={this.onClickTwo}
                            range={new DateRange(new Date(2015, 7, 1), new Date(2015, 7, 16))}
                            initialDate={new Date(2015, 7, 8)}
                            locale="EN" />
                        <div className="demo__props">
                            <div className="demo__title">Source</div>
                            <pre className="demo__code">
                                {'<Datepicker\n' +
                                 '  onClick={this.onClickTwo}\n' +
                                 '  range={new DateRange(new Date(2015, 7, 1), new Date(2015, 7, 16))}\n' +
                                 '  initialDate={new Date(2015, 7, 8)}\n' +
                                 '  locale="EN" />'}
                            </pre>
                        </div>
                    </div>
                    <div className="demo__inline">
                        <input
                            type="text"
                            name="date"
                            className="demo__input"
                            value={this.state.date3}
                            readOnly />
                        <Datepicker
                            onClick={this.onClickThree}
                            range={new DateRange(new Date(2015, 7, 4), new Date(2015, 8, 3))}
                            initialDate={new Date(2015, 7, 12)}
                            locale="DE" />
                        <div className="demo__props">
                            <div className="demo__title">Source</div>
                            <pre className="demo__code">
                                {'<Datepicker\n' +
                                 '  onClick={this.onClickThree}\n' +
                                 '  range={new DateRange(new Date(2011, 7, 3), new Date(2011, 8, 3))}\n' +
                                 '  initialDate={new Date(2011, 7, 12)}\n' +
                                 '  locale="DE" />'}
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="demo__part">
                    <div className="demo__description">
                        <div className="demo__ru">
                            Этот же вариант позволяет вам связать два календаря между собой. <br/>
                            Довольно популярный кейс, когда у пользователя есть выбор дат С и ПО. <br/>
                            Все, что необходимо - это зафиксировать изначально крайние даты, <br/>
                            в данном примере это константы leftRangeDate и rightRangeDate. <br/>
                            Передать их в качестве левого ограничения для календаря справа и <br/>
                            правого ограничения для календаря справа соотвественно. <br/>
                            Демо ниже более наглядно.
                        </div>
                        <div className="demo__en">
                            This option allows us to link the two calendars together. <br/>
                            Quite a popular case when the user has a choice of dates FROM and TO. <br/>
                            All that is needed is to fix the original Dates, <br/>
                            in this example leftRangeDate and rightRangeDate are constants. <br/>
                            Send them as the left limit for the calendar on the left and <br/>
                            right limit for the calendar to the right respectively. <br/>
                            The demo below more clearly.
                        </div>
                    </div>
                    <div className="demo__inline">
                        <input
                            type="text"
                            className="demo__input"
                            value={transformDate(this.state.date4)}
                            readOnly />
                        <Datepicker
                            onClick={this.onClickFour}
                            initialDate={leftRangeDate}
                            minimumDate={leftRangeDate}
                            maximumDate={this.state.date5}
                            locale="EN" />
                        <div className="demo__props">
                            <div className="demo__title">Source</div>
                            <pre className="demo__code">
                                {'<input\n' +
                                 '  type="text"\n' +
                                 '  className="demo__input"\n' +
                                 '  value={transformDate(this.state.date4)}\n' +
                                 '  readOnly />\n' +
                                 '<Datepicker\n' +
                                 '  onClick={this.onClickFour}\n' +
                                 '  initialDate={leftRangeDate}\n' +
                                 '  minimumDate={leftRangeDate}\n' +
                                 '  maximumDate={this.state.date5}\n' +
                                 '  locale="EN" />'}
                            </pre>
                        </div>
                    </div>
                    <div className="demo__inline">
                        <input
                            type="text"
                            className="demo__input"
                            value={transformDate(this.state.date5)}
                            readOnly />
                        <Datepicker
                            onClick={this.onClickFive}
                            initialDate={rightRangeDate}
                            minimumDate={this.state.date4}
                            maximumDate={rightRangeDate}
                            locale="EN" />
                        <div className="demo__props">
                            <div className="demo__title">Source</div>
                            <pre className="demo__code">
                                {'<input\n' +
                                 '  type="text"\n' +
                                 '  className="demo__input"\n' +
                                 '  value={transformDate(this.state.date5)}\n' +
                                 '  readOnly />\n' +
                                 '<Datepicker\n' +
                                 '  onClick={this.onClickFive}\n' +
                                 '  initialDate={rightRangeDate}\n' +
                                 '  minimumDate={this.state.date4}\n' +
                                 '  maximumDate={rightRangeDate}\n' +
                                 '  locale="EN" />'}
                            </pre>
                        </div>
                    </div>
                </div>
                <a href="https://github.com/isnifer/react-date-range-picker" className="demo__fork">
                    <img
                        src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
                        alt="Fork Me on Github" />
                </a>
            </div>
        );
    }
}

render(<Demo />, document.querySelector('.datepicker'));
