import antfu from '@antfu/eslint-config';

// TODO: Add tailwindcss plugin when it supports v4.

export default antfu({
    type: 'app',
    typescript: true,
    formatters: true,
    stylistic: {
        indent: 4,
        semi: true,
        quotes: 'single',
    },
    ignores: ['**/migrations/*'],
}, {
    rules: {
        'ts/no-redeclare': 'off',
        'ts/consistent-type-definitions': ['error', 'type'],
        'no-console': ['warn'],
        'antfu/no-top-level-await': ['off'],
        'node/prefer-global/process': ['off'],
        'node/no-process-env': ['error'],
        'perfectionist/sort-imports': ['error', {
            tsconfigRootDir: '.',
        }],
        'unicorn/filename-case': ['error', {
            case: 'kebabCase',
            ignore: ['README.md'],
        }],
        'style/brace-style': ['error', '1tbs'],
    },
});
