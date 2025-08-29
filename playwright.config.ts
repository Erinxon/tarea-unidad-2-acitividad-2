import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: [['html'], ['junit', { outputFile: 'test-results/junit-e2e.xml' }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    headless: true
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});