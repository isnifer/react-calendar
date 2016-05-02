import './utils/jsdom';
import test from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import render from './utils/render';
import Datepicker from '../build';
import DateRange from 'moment-range';

const c = render(Datepicker);

test('Calendar inited', assert => {
    const initialDate = new Date();
    const DOMComponent = TestUtils.renderIntoDocument(
        <Datepicker initialDate={initialDate} />
    );


    assert.equal(c.type, 'div', 'Should be div');
    assert.equal(c.props.className, 'calendar', 'With className "calendar"');

    assert.equal(DOMComponent.state.date, initialDate, 'Date in state should equal initialDate');

    assert.end();
});

test('Should have 3 elements: head, month, placeholder for nav', assert => {
    const children = c.props.children;

    assert.equal(children.length, 4, 'Count of children is 4');

    assert.equal(children[0].type, 'div', 'Head should be a div');
    assert.equal(children[0].props.className, 'calendar__head', 'And should have className calendar__head');

    assert.equal(children[1].type, 'table', 'Month should be a table');
    assert.equal(children[1].props.className, 'calendar__month', 'And should have className calendar__month');

    assert.false(children[2], 'Month Placeholder is false');
    assert.false(children[3], 'Year Placeholder is false');

    assert.end();
});

test('Test componentWillReceiveProps', assert => {
    const leftRangeDate = new Date(2015, 7, 4);
    const rightRangeDate = new Date(2015, 7, 27);

    const Parent = React.createClass({
        getInitialState () {
            return {
                date1: leftRangeDate,
                date2: rightRangeDate
            };
        },

        render () {
            return (
                <div>
                    <Datepicker
                        ref="datepicker1"
                        minimumDate={leftRangeDate}
                        maximumDate={this.state.date2}
                        initialDate={leftRangeDate}
                        onClick={(date) => {
                            this.setState({date1: date});
                        }} />
                    <Datepicker
                        ref="datepicker2"
                        minimumDate={this.state.date1}
                        maximumDate={rightRangeDate}
                        initialDate={rightRangeDate}
                        onClick={(date) => {
                            this.setState({date2: date});
                        }} />

                    <Datepicker
                        ref="datepicker3"
                        range={new DateRange(leftRangeDate, this.state.date2)}
                        initialDate={leftRangeDate} />
                    <Datepicker
                        ref="datepicker4"
                        range={new DateRange(this.state.date1, rightRangeDate)}
                        initialDate={rightRangeDate} />
                </div>
            );
        }
    });

    const parent = TestUtils.renderIntoDocument(
        <Parent />
    );

    const datePicker1 = parent.refs.datepicker1;
    const datePicker2 = parent.refs.datepicker2;

    const datePicker3 = parent.refs.datepicker3;
    const datePicker4 = parent.refs.datepicker4;

    let currentDay1 = TestUtils.findRenderedDOMComponentWithClass(datePicker1, 'calendar__day_current');
    // TEMP HACK
    currentDay1 = currentDay1[Object.keys(currentDay1)[0]]._currentElement;

    let currentDay2 = TestUtils.findRenderedDOMComponentWithClass(datePicker2, 'calendar__day_current');
    // TEMP HACK
    currentDay2 = currentDay2[Object.keys(currentDay2)[0]]._currentElement;

    assert.equal(currentDay1.props.children, 4, 'Initial date is 4 August in first calendar');
    assert.equal(currentDay2.props.children, 27, 'Initial date is 5 August in second calendar');

    // 4 August
    assert.equal(
        datePicker2.state.range.start.toString(),
        new DateRange(leftRangeDate, rightRangeDate).start.toString(),
        'Should set start of range 4 August'
    );

    let nextAvialableDate = TestUtils.scryRenderedDOMComponentsWithClass(datePicker1, 'calendar__day_available')[1];
    TestUtils.Simulate.click(nextAvialableDate);
    // TEMP HACK
    nextAvialableDate = nextAvialableDate[Object.keys(nextAvialableDate)[0]]._currentElement;

    assert.equal(
        nextAvialableDate.props.children,
        parent.state.date1.getDate(),
        'Should set next available date - 5 August'
    );

    // 5 August
    assert.equal(
        datePicker2.state.range.start.toString(),
        new DateRange(parent.state.date1, rightRangeDate).start.toString(),
        'Should change start of range to 5 August'
    );

    assert.equal(
        datePicker4.state.range.toString(),
        new DateRange(parent.state.date1, rightRangeDate).toString(),
        'New range for second calendar should start from August 5'
    );

    assert.end();
});

test('Date is part of Range', assert => {
    assert.doesNotThrow(function () {
        return TestUtils.renderIntoDocument(
            <Datepicker
                range={new DateRange(new Date(2015, 7, 22), new Date(2015, 7, 24))}
                initialDate={new Date(2015, 7, 23)} />
        )
    }, null, 'Shouldn\'t throws an exception');

    assert.end();
});

test('Date is not part of Range', assert => {
    assert.throws(function () {
        return TestUtils.renderIntoDocument(
            <Datepicker
                range={new DateRange(new Date(2015, 7, 22), new Date(2015, 7, 24))}
                initialDate={new Date(2015, 7, 21)} />
        )
    }, null, 'Should throws an exception');

    assert.end();
});

test('Change Month Action', assert => {
    const currentMonth = 8;
    const currentYear = 2015;
    let c = TestUtils.renderIntoDocument(
        <Datepicker initialDate={new Date(currentYear, currentMonth, 1)} />
    );


    let currentDay = TestUtils.scryRenderedDOMComponentsWithClass(c, 'calendar__day_current')[0];
    // TEMP HACK
    currentDay = currentDay[Object.keys(currentDay)[0]]._currentElement

    const prevMonthButtonInstance = TestUtils.scryRenderedDOMComponentsWithClass(c, 'calendar__arrow_left')[0];
    // TEMP HACK
    const prevMonthButton = prevMonthButtonInstance[Object.keys(prevMonthButtonInstance)[0]]._currentElement;

    const nextMonthButtonInstance = TestUtils.scryRenderedDOMComponentsWithClass(c, 'calendar__arrow_right')[0];
    // TEMP HACK
    const nextMonthButton = nextMonthButtonInstance[Object.keys(nextMonthButtonInstance)[0]]._currentElement;

    assert.equal(currentDay.props.children, 1, 'Should be first of september');
    assert.equal(prevMonthButton.props.children, '←', 'Should be left change month button');
    assert.equal(nextMonthButton.props.children, '→', 'Should be right change month button');

    assert.equal(c.state.month, currentMonth, 'Should be September');

    TestUtils.Simulate.click(prevMonthButtonInstance);
    assert.equal(c.state.month, currentMonth - 1, 'Should be August');

    TestUtils.Simulate.click(nextMonthButtonInstance);
    TestUtils.Simulate.click(nextMonthButtonInstance);
    assert.equal(c.state.month, currentMonth + 1, 'Should be October');

    TestUtils.Simulate.click(nextMonthButtonInstance);
    TestUtils.Simulate.click(nextMonthButtonInstance);
    TestUtils.Simulate.click(nextMonthButtonInstance);
    assert.equal(c.state.month, 0, 'Should be January');
    assert.equal(c.state.year, currentYear + 1, 'Should be 2016');

    assert.end();
});
