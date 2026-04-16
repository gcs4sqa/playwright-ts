import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../helpers/playwright-dev-page';

test.describe('navigation', () => {
   test.beforeEach(async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);
    await playwrightDev.goto();
  });

  test('main navigation', async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});