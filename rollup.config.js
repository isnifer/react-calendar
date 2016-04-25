const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const npm = require('rollup-plugin-npm');
const uglify = require('rollup-plugin-uglify');

module.exports = {
    entry: "./src/datepicker.jsx",
    format: 'cjs',
    external: ['react', 'moment-range', 'calendar', 'classnames'],
    globals: {
        react: 'React'
    },
    dest: './build/index.js',
    moduleName: 'react-date-range-picker',
    plugins: [
        babel({
            babelrc: false,
            presets: ['es2015-rollup', 'react'],
            exclude: 'node_modules/**'
        }),
        npm({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**'
        })/*,
        uglify()*/
    ]
};
