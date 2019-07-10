module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
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
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-multi-spaces": "error",
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "comma-dangle": ["error", { arrays: "ignore" }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
    },
    overrides: [{
        files: ["*.spec.ts", "*.spec.tsx"],
        rules: {
            "no-multi-spaces": "off",
            "@typescript-eslint/no-non-null-assertion": "off"
        }
    }]
};
