module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            'jsx': true
        }
    },
    rules: {
        "no-parameter-properties": "off"
    },
    overrides: [{
        files: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
        rules: {
            "no-non-null-assertion": "off"
        }
    }]
};
