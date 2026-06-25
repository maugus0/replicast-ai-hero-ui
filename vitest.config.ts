import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Use jsdom for DOM simulation (React testing)
    environment: 'jsdom',

    // Global test APIs (describe, it, expect) - no imports needed
    globals: true,

    // Setup files run before each test file
    setupFiles: ['./vitest.setup.ts'],

    // Allow CI to pass even with no tests (useful during initial setup)
    passWithNoTests: true,

    // Test file patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'out'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        '.next/**',
        'out/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
      ],
    },

    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
  },

  // Path aliases (match tsconfig.json)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
