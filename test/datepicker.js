import test from 'tape';
import render from './utils/render';
import component from '../src/datepicker';

const c = render(component);

test('Calendar inited', (t) => {
    t.equal(c.type, 'div', 'Should be div');
    t.equal(c.props.className, 'calendar', 'With className "calendar"');

    t.end();
});

test('Should have 3 elements: head, month, placeholder for nav', (t) => {
    let children = c.props.children;

    t.equal(children.length, 3, 'Count of children is 3');

    t.equal(children[0].type, 'div', 'Head should be a div');
    t.equal(children[0].props.className, 'calendar__head', 'And should have className calendar__head');

    t.equal(children[1].type, 'table', 'Month should be a table');
    t.equal(children[1].props.className, 'calendar__month', 'And should have className calendar__month');

    t.equal(children[2], '', 'Placeholder is empty string');

    t.end();
});
