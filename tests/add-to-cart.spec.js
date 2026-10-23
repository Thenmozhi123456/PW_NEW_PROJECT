const { test, expect } = require('@playwright/test');
 
test('add items to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
 
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');
 
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('.inventory_item_name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
});