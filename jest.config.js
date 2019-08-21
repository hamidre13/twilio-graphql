module.exports = {
  globals: {
    NODE_ENV: 'test'
  },
  verbose: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  testMatch: ['<rootDir>/src/**/?(*.)spec.js'],
  testEnvironment: 'node',
  testURL: 'http://localhost:4000',
  transform: {
    
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|my-project|redux-persist)/)'
  ],
  moduleDirectories: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'json','ts','tsx','node'],
  testPathIgnorePatterns: ['<rootDir>/node_modules']
};
