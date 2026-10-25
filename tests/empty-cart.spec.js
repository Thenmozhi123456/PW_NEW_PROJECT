const { test, expect } = require('@playwright/test');
 
test('empty cart, then add and remove an item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 
  // fresh cart
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(0);
 
  // add then remove
  await page.click('#continue-shopping');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(1);
 
  await page.click('#remove-sauce-labs-backpack');
  await expect(page.locator('.cart_item')).toHaveCount(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});