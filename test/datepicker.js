import test from 'tape';
import React from 'react';
import { render, TestUtils } from './utils/render';
import Datepicker from '../src/datepicker';
import './utils/jsdom';
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
    let children = c.props.children;

    assert.equal(children.length, 3, 'Count of children is 3');

    assert.equal(children[0].type, 'div', 'Head should be a div');
    assert.equal(children[0].props.className, 'calendar__head', 'And should have className calendar__head');

    assert.equal(children[1].type, 'table', 'Month should be a table');
    assert.equal(children[1].props.className, 'calendar__month', 'And should have className calendar__month');

    assert.equal(children[2], '', 'Placeholder is empty string');

    assert.end();
});

test('Two calendar\'s inited', assert => {
    const leftRangeDate = new Date(2015, 7, 4);
    const rightRangeDate = new Date(2015, 7, 27);

    let state = {
        date1: leftRangeDate,
        date2: rightRangeDate
    };

    let c1 = TestUtils.renderIntoDocument(
        <Datepicker
            minimumDate={leftRangeDate}
            maximumDate={state.date2}
            initialDate={leftRangeDate}
            onClick={function (date) {
                state.date1 = date;

                c2 = TestUtils.renderIntoDocument(
                    <Datepicker
                        minimumDate={state.date1}
                        maximumDate={rightRangeDate} />
                );
            }} />
    );
    let c2 = TestUtils.renderIntoDocument(
        <Datepicker
            minimumDate={state.date1}
            maximumDate={rightRangeDate}
            initialDate={rightRangeDate}
            onClick={function (date) {
                state.date2 = date;
            }} />
    );

    let currentDay1 = TestUtils.findRenderedDOMComponentWithClass(c1, 'calendar__day_current');
    let currentDay2 = TestUtils.findRenderedDOMComponentWithClass(c2, 'calendar__day_current');

    assert.equal(currentDay1.props.children, 4, 'Initial date is 4 August in first calendar');
    assert.equal(currentDay2.props.children, 27, 'Initial date is 5 August in second calendar');

    // 4 August
    assert.equal(
        c2.state.range.start.toString(),
        new DateRange(leftRangeDate, rightRangeDate).start.toString(),
        'Should set start of range 4 August'
    );

    let nextAvialableDate = TestUtils.scryRenderedDOMComponentsWithClass(c1, 'calendar__day_available')[1];
    TestUtils.Simulate.click(nextAvialableDate);

    assert.equal(
        nextAvialableDate.props.children,
        state.date1.getDate(),
        'Should set next available date - 5 August'
    );

    // 5 August
    assert.equal(
        c2.state.range.start.toString(),
        new DateRange(state.date1, rightRangeDate).start.toString(),
        'Should change start of range to 5 August'
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
