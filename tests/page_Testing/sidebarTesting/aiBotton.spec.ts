import { test, expect } from '@playwright/test';

test('TC29:should display AI button', async ({ page }) => {
    await page.goto('https://xray.phraya.net/');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // search patient
    await page.getByPlaceholder('Enter patient ID').fill('93800044');
    await page.getByRole('button').click();

    // dashboard
    await page.getByRole('row', { name: '2 Complete Aortic enlargement' }).getByLabel('').check();
    await page.getByRole('button', { name: 'Viewer' }).click();

    await expect(page.getByText('Alice Brown9380004443 Years / 3/11/1982Female65kg / 170cmABC HospitalZoom: 100%')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^AI$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^AI$/ }).getByRole('button').click();
    await page.waitForSelector('div', { state: 'attached' });
    const consoleText = await page.locator('text=Fetched annotations successfully').isVisible();
    });