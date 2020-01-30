module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
      "@typescript-eslint",
    ],
    extends: [
        "airbnb-typescript/base",
    ],
    rules: {
        "import/no-cycle": [
            3,
            { maxDepth: 1 }
        ],
        "max-len": [
            "warn",
            200
        ],
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "@typescript-eslint/indent": [
            "error",
            4
        ],
        "@typescript-eslint/no-unused-vars": [
            "error", 
            { "argsIgnorePattern": "^_" }
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true
            }
        ],
        "@typescript-eslint/quotes": [
            "error",
            "double"
        ]
    }
};