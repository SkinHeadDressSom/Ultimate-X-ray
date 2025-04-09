import { test, expect } from '@playwright/test';

test('TC31: viwe older report', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // search patient
    await page.getByPlaceholder('Enter patient ID').fill('93800044');
    await page.getByRole('button').click();

    // dashboard
    await page.getByRole('row', { name: '1 Schedule Aortic enlargement' }).getByLabel('').check();
    await page.getByRole('button', { name: 'Viewer' }).click();
    
    
    await page.locator('div').filter({ hasText: /^System$/ }).getByRole('button').nth(1).click();
    await expect(page.locator('div').filter({ hasText: /^Report$/ })).toBeVisible();

    await expect(page.getByText('Name:Alice BrownHN:')).toBeVisible();
    await expect(page.getByText('Phone No.:')).toBeVisible();
    await expect(page.getByText('Accession No.:')).toBeVisible();
    await expect(page.getByText('Report By:Thomas Shelby')).toBeVisible();
   
    await expect(page.locator('.result')).toBeVisible();
    await expect(page.getByText('Clinical history')).toBeVisible();
    await expect(page.getByText('Examination Details')).toBeVisible();
    await expect(page.getByText('Findings')).toBeVisible();
    await expect(page.getByText('Impression')).toBeVisible();
    await expect(page.getByText('Recommendations')).toBeVisible();
    await expect(page.getByText('Action Comment')).toBeVisible();
    await expect(page.getByText('Attached images')).toBeVisible();
    
    await page.locator('div').filter({ hasText: /^Report$/ }).getByRole('button').click();    
    });

    test('TC32: Edit report', async ({ page }) => {
        await page.goto('https://xray.phraya.net/');
        await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
        await page.getByRole('button', { name: 'Login' }).click();
    
        // search patient
        await page.getByPlaceholder('Enter patient ID').fill('93800044');
        await page.getByRole('button').click();
    
        // dashboard
        await page.getByRole('row', { name: '1 Schedule Aortic enlargement' }).getByLabel('').check();
        await page.getByRole('button', { name: 'Viewer' }).click();
        
        
        await page.locator('div').filter({ hasText: /^System$/ }).getByRole('button').nth(1).click();
        await expect(page.locator('div').filter({ hasText: /^Report$/ })).toBeVisible();
    
        await expect(page.getByText('Name:Alice BrownHN:')).toBeVisible();
        await expect(page.getByText('Phone No.:')).toBeVisible();
        await expect(page.getByText('Accession No.:')).toBeVisible();
        await expect(page.getByText('Report By:Thomas Shelby')).toBeVisible();
        await expect(page.locator('.result')).toBeVisible();
        await expect(page.getByText('Clinical history')).toBeVisible();
        await expect(page.getByText('Examination Details')).toBeVisible();
        await expect(page.getByText('Findings')).toBeVisible();
        await expect(page.getByText('Impression')).toBeVisible();
        await expect(page.getByText('Recommendations')).toBeVisible();
        
        await expect(page.getByText('Action Comment')).toBeVisible();
    

        await page.getByRole('textbox', { name: 'Enter action Comment' }).click();
        await page.getByRole('textbox', { name: 'Enter action Comment' }).fill('hello new case');
        
    
        await page.getByRole('button', { name: 'Save' }).click();
        await page.locator('div').filter({ hasText: /^Report$/ }).getByRole('button').click();

        });