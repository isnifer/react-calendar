import React from 'react';
import TestUtils from 'react-addons-test-utils';

export default function render (component, props, ...children) {
    const shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
        React.createElement(
            component,
            props,
            ...children
        )
    );

    return shallowRenderer.getRenderOutput();
}
