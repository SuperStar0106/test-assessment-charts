import { type PlaywrightTestConfig, devices } from '@playwright/test'

const opts = {
    headless: !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS,
}
const config: PlaywrightTestConfig = {
    testDir: './playwright',
    timeout: 60000,
    outputDir: './playwright/test-results',
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        ...devices['Desktop Chrome'],
        headless: opts.headless,
        video: 'on',
    },
    retries: process.env.CI ? 3 : 0,
    webServer: {
        command: 'npm run dev',
        reuseExistingServer: Boolean(process.env.TEST_LOCAL === '1'),
        port: 3000,
    },
}

export default config