import { test, expect } from '@playwright/test';

test.describe('Falda SuperApp Web / Linux E2E Suite', () => {
  test('should load the homepage and check title and root elements', async ({ page }) => {
    await page.goto('/');

    // Check document title
    await expect(page).toHaveTitle(/falda-superapp/i);

    // Verify main root container rendered
    const rootElement = page.locator('#root, [data-testid="root"], div');
    await expect(rootElement.first()).toBeVisible();
  });
});
