import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";

export default {
    input: 'src/react/index.js',
    output: {
        file: 'dist/react-datepicker.js',
        format: 'iife',
        name: 'DatePicker'
    },
    plugins: [
        nodeResolve({
            next: true,
        }),
        commonjs({
            namedExports: {
                'node_modules/react/index.js': ['React', 'useReducer'],
            }
        })
    ]
};
