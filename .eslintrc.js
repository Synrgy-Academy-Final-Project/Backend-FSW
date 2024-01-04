module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint'],
    extends: [
        'standard-with-typescript',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {},
}
