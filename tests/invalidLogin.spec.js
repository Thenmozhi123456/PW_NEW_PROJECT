const { test, expect } = require('@playwright/test');
 
test('wrong password shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');
 
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match'
  );
  await expect(page).not.toHaveURL(/inventory\.html/);
});
 
test('locked out user shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Sorry, this user has been locked out'
  );
});