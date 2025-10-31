import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

// Configuration ultra-rapide
const fastJestConfig = {
  // Environnement minimal
  testEnvironment: 'jsdom',
  
  // Tests uniquement dans lib/ (plus rapides)
  testMatch: [
    '**/__tests__/lib/**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  
  // Ignorer tout le reste
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/components/',
    '<rootDir>/__tests__/api/',
  ],
  
  // Optimisations maximales
  maxWorkers: 1, // Un seul worker
  cache: false, // Pas de cache
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Pas de couverture
  collectCoverage: false,
  
  // Mapping minimal
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Timeout court
  testTimeout: 5000,
  
  // Pas de transformations lourdes
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
}

export default createJestConfig(fastJestConfig)

