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
        "object-curly-spacing": ["error", "always"],
        "no-multi-spaces": "error",
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "comma-dangle": ["error", { arrays: "ignore" }],
        "quotes": ["error", "double"],
        "@typescript-eslint/indent": ["error", 4, { "SwitchCase": 1 }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
    },
    overrides: [{
        files: ["*.spec.ts", "*.spec.tsx"],
        rules: {
            "no-multi-spaces": "off",
            "indent": "off",
            "@typescript-eslint/no-non-null-assertion": "off"
        }
    }]
};
