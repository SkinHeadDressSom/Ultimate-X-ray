import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    //  Login 
    await page.goto('http://localhost:3000/');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // search patient
    await page.getByPlaceholder('Enter patient ID').fill('93800044');
    await page.getByRole('button').click();

    // dashboard
    await page.getByRole('row', { name: '1 Complete Lung opacity 2/1/' }).click();
  });

test('TC26: check action of layout', async ({ page }) => {
  
    
    await expect(page.locator('div').filter({ hasText: /^Layout$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Layout$/ }).getByRole('button').first().click();
    await expect(page.locator('canvas').nth(1)).toBeVisible();
    await page.locator('div').filter({ hasText: /^Layout$/ }).getByRole('button').nth(1).click();
    await expect(page.getByText('Click to add image')).toBeVisible();

    await page.getByText('Click to add image').click();
    await page.getByRole('img', { name: '782318' }).click();
    await expect(page.locator('canvas').nth(1)).toBeVisible();
    await expect(page.locator('canvas').nth(3)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Layout$/ }).getByRole('button').nth(2)).toBeVisible();
    await page.locator('div').filter({ hasText: /^Layout$/ }).getByRole('button').nth(2).click();
    await expect(page.getByText('Click to add image')).toBeVisible();

    await page.getByText('Click to add image').click();
    await page.getByRole('img', { name: '782318' }).click();
    await expect(page.locator('.upper-canvas').first()).toBeVisible();
    await expect(page.locator('div:nth-child(2) > div > .canvas-container > .upper-canvas')).toBeVisible();
    await expect(page.locator('div:nth-child(3) > div > .canvas-container > .upper-canvas')).toBeVisible();

    await page.locator('div').filter({ hasText: /^Studies$/ }).getByRole('button').first().click();
    await page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AMComplete$/ }).getByLabel('').check();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AM$/ }).getByLabel('').check();
    await expect(page.locator('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)')).toBeVisible();
    await expect(page.getByText('5/1/').nth(1)).toBeVisible();
    await page.locator('div').filter({ hasText: /^Layout$/ }).getByRole('button').nth(3).click();
    await expect(page.getByText('Click to add image')).toBeVisible();
    await page.getByText('Click to add image').click();
    await page.getByRole('img', { name: '782323' }).click();
    await expect(page.locator('.upper-canvas').first()).toBeVisible();
    await expect(page.locator('div:nth-child(2) > div > .canvas-container > .upper-canvas')).toBeVisible();
    await expect(page.locator('div:nth-child(3) > div > .canvas-container > .upper-canvas')).toBeVisible();
    await expect(page.locator('div:nth-child(4) > div > .canvas-container > .upper-canvas')).toBeVisible();
});