import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  
  //Verification if the product was in the cart.
  const cartItems = page.locator('[data-test="inventory-item"]');
  const cartQuantity = page.locator('[data-test="item-quantity"]');
  await expect(cartItems).toHaveCount(1);
  await expect(cartQuantity).toHaveText('1'); 
  const itemTitle = page.locator('[data-test="item-4-title-link"]');
  await expect(itemTitle).toHaveText('Sauce Labs Backpack'); 

  //Verification if the product wasn't in the cart.
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(cartItems).toHaveCount(0);
});