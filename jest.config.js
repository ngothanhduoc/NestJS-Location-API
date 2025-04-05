module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node', // Ensure the test environment is Node.js
  setupFiles: ['./jest.setup.ts'], // Ensure this line is present
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
