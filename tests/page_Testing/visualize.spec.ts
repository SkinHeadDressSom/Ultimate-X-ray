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

test('TC18: Reder visualize layout', async ({ page }) => {

  await expect(page.locator('div').filter({ hasText: /^Studies2\/1\/20158:30:00 AM$/ }).locator('div').nth(2)).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .w-full')).toBeVisible();
  await expect(page.getByRole('img', { name: '782317' })).toBeVisible();
  await expect(page.getByRole('img', { name: '782318' })).toBeVisible();
  await expect(page.getByRole('img', { name: '782319' })).toBeVisible();
  await expect(page.locator('.flex > .w-full > div > button').first()).toBeVisible();
  await page.locator('.flex > .w-full > div > button').first().click();
  await expect(page.locator('div').filter({ hasText: 'Studies2/1/20158:30:00 AM' }).nth(2)).toBeVisible();
  await page.getByLabel('').check();
  await expect(page.locator('div:nth-child(2) > .w-full')).toBeVisible();
  await expect(page.locator('canvas').nth(1)).toBeVisible();
  await expect(page.getByText('SystemLayoutImage')).toBeVisible();  
  await expect(page.getByRole('main')).toContainText('Alice Brown9380004443 / 3/11/1982Female65kg / 170cmABC Hospital1339862/1/20158:30:00 AMZoom: 100%WL: 2244WW: 4400');
});

test('TC19: add another Studies', async ({ page }) => {

    await page.locator('div').filter({ hasText: /^Studies$/ }).getByRole('button').first().click();
    await page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AMComplete$/ }).getByLabel('').check();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AM$/ }).getByLabel('').check();
    await expect(page.locator('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)')).toBeVisible();
    await expect(page.getByText('5/1/').nth(1)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^2\/1\/20158:30:00 AM$/ }).nth(1)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AM$/ }).nth(1)).toBeVisible();


    await expect(page.getByText('/1/20208:30:00 AM').first()).toBeVisible();
    await expect(page.getByText('2/1/20158:30:00 AM', { exact: true }).first()).toBeVisible();
});

test('TC20: delete another Studies', async ({ page }) => {
    

    await page.locator('div').filter({ hasText: /^Studies$/ }).getByRole('button').first().click();
    await page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AMComplete$/ }).getByLabel('').check();
    await page.getByRole('button', { name: 'Open' }).click();
    await page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AM$/ }).getByLabel('').check();
    await expect(page.locator('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)')).toBeVisible();
    await expect(page.getByText('5/1/').nth(1)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^2\/1\/20158:30:00 AM$/ }).nth(1)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^5\/1\/20208:30:00 AM$/ }).nth(1)).toBeVisible();

    await page.locator('div:nth-child(2) > div > button').click();
    await expect(page.locator('div').filter({ hasText: 'Studies2/1/20158:30:00 AM5/1/' }).nth(2)).toBeVisible();

    await expect(page.getByText('/1/20208:30:00 AM')).toBeVisible();
    await expect(page.getByText('2/1/20158:30:00 AM', { exact: true }).first()).toBeVisible();
});

test('TC21: check action of Image tools', async ({ page }) => {

    await page.locator('div:nth-child(5) > .grid > button:nth-child(3)').click();
    await page.locator('div:nth-child(5) > .grid > button:nth-child(4)').click();
    
    // Zoom In
    await page.locator('button:nth-child(5)').first().click();
    // Zoom out
    await page.locator('button:nth-child(6)').first().click();

    // Contrast
    await page.locator('button:nth-child(7)').click();
    await expect(page.locator('div').filter({ hasText: /^Contrast$/ }).first()).toBeVisible();
    
    // Colors
    await page.locator('button:nth-child(8)').click();
    await expect(page.locator('div').filter({ hasText: /^Colors$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Colors$/ }).getByRole('button').nth(2).click();
    
    await page.locator('div:nth-child(5) > .grid > button').first().click();
    await page.locator('div:nth-child(5) > .grid > button:nth-child(2)').click();

  });

  test('TC22: check action of Annotation', async ({ page }) => {
  
    await page.locator('div:nth-child(7) > .grid > button').first().click();
    await expect(page.locator('div').filter({ hasText: /^Colors$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Colors$/ }).getByRole('button').nth(2).click();
  

    await page.locator('div:nth-child(7) > .grid > button:nth-child(2)').click();
    await expect(page.locator('div').filter({ hasText: /^Colors$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Colors$/ }).getByRole('button').first().click();


    await page.locator('div:nth-child(7) > div > button:nth-child(3)').click();
    await expect(page.locator('div').filter({ hasText: /^Colors$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Colors$/ }).getByRole('button').nth(3).click();


    await page.locator('div:nth-child(7) > div > button:nth-child(4)').click();
    await expect(page.locator('div').filter({ hasText: /^Colors$/ })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Colors$/ }).getByRole('button').nth(4).click();
   
    await page.locator('div:nth-child(7) > .grid > button:nth-child(5)').click();

    await page.locator('div:nth-child(7) > .grid > button:nth-child(6)').click();  
  });
    


















