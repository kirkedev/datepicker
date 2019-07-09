module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
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
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowExpressions": true
        }],
    },
    overrides: [{
        files: ["*.spec.ts", "*.spec.tsx"],
        rules: {
            "@typescript-eslint/no-non-null-assertion": "off"
        }
    }]
};
