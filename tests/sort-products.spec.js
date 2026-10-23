const { test, expect } = require('@playwright/test');
 
test('sort products by price and name', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 
  // Price: low to high
  await page.selectOption('.product_sort_container', 'lohi');
  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
 
  // Name: Z to A
  await page.selectOption('.product_sort_container', 'za');
  const names = await page.locator('.inventory_item_name').allTextContents();
  expect(names).toEqual([...names].sort().reverse());
});