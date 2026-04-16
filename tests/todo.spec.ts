import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy eggs');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy milk');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('drop kids at the pool');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByText('buy eggs')).toBeVisible();
  await expect(page.getByText('buy milk')).toBeVisible();
  await expect(page.getByText('drop kids at the pool')).toBeVisible();
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - text: This is just a demo of TodoMVC for testing, not the
      - link "real TodoMVC app.":
        - /url: https://todomvc.com/
      - heading "todos" [level=1]
      - textbox "What needs to be done?"
      - checkbox "❯Mark all as complete"
      - text: ❯Mark all as complete
      - list:
        - listitem:
          - checkbox "Toggle Todo"
          - text: buy eggs
        - listitem:
          - checkbox "Toggle Todo"
          - text: buy milk
        - listitem:
          - checkbox "Toggle Todo"
          - text: drop kids at the pool
      - strong: "3"
      - text: items left
      - list:
        - listitem:
          - link "All":
            - /url: "#/"
        - listitem:
          - link "Active":
            - /url: "#/active"
        - listitem:
          - link "Completed":
            - /url: "#/completed"
      - contentinfo:
        - paragraph: Double-click to edit a todo
        - paragraph:
          - text: Created by
          - link "Remo H. Jansen":
            - /url: http://github.com/remojansen/
        - paragraph:
          - text: Part of
          - link "TodoMVC":
            - /url: http://todomvc.com
    `);
});