module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:react/recommended"
    ],
    parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            "jsx": true
        }
    },
    rules: {
        "arrow-parens": ["error", "as-needed"],
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "comma-dangle": ["error", { arrays: "ignore" }],
        "object-curly-spacing": ["error", "always"],
        "no-multi-spaces": "error",
        "no-use-before-define": "error",
        "quotes": ["error", "double"],
        "array-bracket-newline": ["error", "consistent"],
        "array-bracket-spacing": "error",
        "block-spacing": "error",
        "camelcase": "error",
        "comma-spacing": "error",
        "comma-style": "error",
        "computed-property-spacing": "error",
        "eol-last": "error",
        "func-call-spacing": "error",
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "no-negated-condition": "error",
        "no-trailing-spaces": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-template": "error",
        "@typescript-eslint/indent": ["error", 4, { "SwitchCase": 1 }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
    },
    overrides: [{
        files: ["*.spec.ts", "*.spec.tsx"],
        rules: {
            "@typescript-eslint/no-non-null-assertion": "off"
        }
    }]
};
