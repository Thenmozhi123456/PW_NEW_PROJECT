const { test, expect } = require('@playwright/test');
 
test('logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
 
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
 
  await expect(page.locator('#login-button')).toBeVisible();
 
  // protected page is blocked after logout
  await page.goto('/inventory.html');
  await expect(page.locator('[data-test="error"]')).toContainText(
    'You can only access \'/inventory.html\' when you are logged in'
  );
});
 