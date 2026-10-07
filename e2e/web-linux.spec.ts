import { test, expect } from '@playwright/test';

test.describe('Falda SuperApp Web / Linux E2E Suite', () => {
  test('should load the homepage and render the root application', async ({ page }) => {
    await page.goto('/');

    // Verify main root container rendered
    const rootElement = page.locator('#root');
    await expect(rootElement).toBeVisible();
  });
});
