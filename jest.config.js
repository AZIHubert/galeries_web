module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  testMatch: null,
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@sequelize/(.*)': '<rootDir>/sequelize/$1',
    '@root/(.*)': '<rootDir>/$1',
  },
};
