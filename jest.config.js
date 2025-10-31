import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  // Optimisations pour la vitesse
  maxWorkers: '50%', // Utilise la moitié des CPU disponibles
  cache: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  // Pas de couverture pour accélérer
  collectCoverage: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Transformations optimisées
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // Ignorer les modules lourds
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)

