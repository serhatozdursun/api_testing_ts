module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: [
        '**/src/tests/01_postPet.test.ts',
        '**/src/tests/02_getPet.test.ts',
        '**/src/tests/03_putPet.test.ts'
    ],
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: `Test Report ${new Date().toISOString()}`, // The title of the HTML page
            outputPath: './report/tests-report.html', // The path where the HTML report will be generated
            silent: true // Suppress console output
        }]
    ]
};