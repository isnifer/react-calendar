import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

function render (component, props, ...children) {
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

export default { render, TestUtils }
