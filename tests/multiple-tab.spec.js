const { test, expect } = require('@playwright/test');
 
test('two tabs share the same session', async ({ context }) => {
  // pages in the same context share cookies + localStorage
  const tab1 = await context.newPage();
  await tab1.goto('https://www.saucedemo.com/');
  await tab1.fill('#user-name', 'standard_user');
  await tab1.fill('#password', 'secret_sauce');
  await tab1.click('#login-button');
  await tab1.click('#add-to-cart-sauce-labs-backpack');
 
  // tab 2 is already logged in
  const tab2 = await context.newPage();
  await tab2.goto('/cart.html');
  await expect(tab2.locator('.cart_item')).toHaveCount(1);
 
  // change in tab 2, verify in tab 1
  await tab2.click('#remove-sauce-labs-backpack');
  await tab1.reload();
  await expect(tab1.locator('.shopping_cart_badge')).toHaveCount(0);
 
  expect(context.pages()).toHaveLength(2);
});