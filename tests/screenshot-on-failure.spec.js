const { test, expect } = require('@playwright/test');
const fs = require('fs');
 
// Manual screenshot on failure (config also has screenshot: 'only-on-failure',
// which does this automatically - this shows how it works under the hood).
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    fs.mkdirSync('screenshots', { recursive: true });
    const file = `screenshots/${testInfo.title.replace(/\W+/g, '_')}-${Date.now()}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log('Screenshot saved:', file);
  }
});
 
test('screenshot on failure', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 
  // Change 'Products' to 'Wrong Title' to force a failure and see the screenshot.
  await expect(page.locator('.title')).toHaveText('Products');
});