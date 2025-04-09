import { test, expect } from '@playwright/test';

test('TC01: Reder login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('Welcome to Ultimate X-rayLogin')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Ultimate X-ray' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome to Ultimate X-ray' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Enter your username' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await expect(page.getByRole('textbox', { name: 'Enter your password' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
  await page.getByRole('button', { name: 'Toggle Password Visibility' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();    
});

test('TC02: login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Find Patient')).toBeVisible();

  });


test('TC03: wrong login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('wrongtest');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('wrongtest');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Invalid username or password')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Welcome to Ultimate X-' }).nth(1)).toBeVisible();
  });


test('TC04: empty password login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('div').filter({ hasText: 'Welcome to Ultimate X-' }).nth(1)).toBeVisible();
        });

test('TC05: empty login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('div').filter({ hasText: 'Welcome to Ultimate X-' }).nth(1)).toBeVisible();
        });

