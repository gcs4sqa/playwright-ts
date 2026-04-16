import { test, expect } from '@playwright/test';

test('http status check', async ({ request }) => {
  const response = await request.get('https://playwright.dev/');
  
  // APIResponse will never be null, so no guard clause needed here
  const status: number = response.status();

  console.log(`The Status Code is: ${response.status()}`);
  
  expect(response.ok()).toBeTruthy();
});