import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

export default function (component, props, ...children) {
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
