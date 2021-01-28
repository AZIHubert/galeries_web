module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
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
    '#components/(.*)': '<rootDir>/src/components/$1',
    '#containers/(.*)': '<rootDir>/src/containers/$1',
    '#helpers/(.*)': '<rootDir>/src/helpers/$1',
    '#ressources/(.*)': '<rootDir>/src/ressources/$1',
  },
};
