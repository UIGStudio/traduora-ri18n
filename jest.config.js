module.exports = {
    roots: ['<rootDir>/__tests__'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '__tests__.*test.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
