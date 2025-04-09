import { test, expect } from '@playwright/test';

test('TC30:saveAnnotatio', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // search patient
    await page.getByPlaceholder('Enter patient ID').fill('93800044');
    await page.getByRole('button').click();

    // dashboar
    await page.getByRole('row', { name: '1 Schedule Aortic enlargement' }).getByLabel('').check();
    await page.getByRole('button', { name: 'Viewer' }).click();


    await page.getByRole('img', { name: '782320' }).click();
    await page.getByRole('heading', { name: 'Annotation' }).click();
    await page.locator('div:nth-child(7) > .grid > button:nth-child(2)').click();
    await page.locator('div').filter({ hasText: /^Colors$/ }).getByRole('button').nth(4).click();
    await page.locator('div:nth-child(7) > .grid > button:nth-child(5)').click();
    await page.locator('div').filter({ hasText: /^System$/ }).getByRole('button').first().click();
    await expect(page.getByRole('img', { name: 'annotation' }).nth(1)).toBeVisible();
    await expect(page.locator('div:nth-child(2) > div > .absolute')).toBeVisible();
    });