const { test, expect } = require('@playwright/test');
 
test('full checkout flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
 
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '600001');
  await page.click('#continue');
 
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await page.click('#finish');
 
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});