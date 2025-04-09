import { test, expect } from '@playwright/test';


test('TC06:Render search', async ({ page }) => {
await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Find Patient')).toBeVisible();
  await expect(page.getByPlaceholder('Enter patient ID')).toBeVisible();
  await expect(page.getByRole('button')).toBeVisible();

  await expect(page.getByText('Find Patient')).toBeVisible();
  await expect(page.getByPlaceholder('Enter patient ID')).toBeVisible();
  await expect(page.getByRole('button')).toBeVisible();
});

test('TC07: Valid Patient ID', async ({ page }) => {
    await page.goto('http://localhost:3000/');
      await page.getByRole('textbox', { name: 'Enter your username' }).click();
      await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
      await page.getByRole('textbox', { name: 'Enter your password' }).click();
      await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
      await page.getByRole('button', { name: 'Login' }).click();
   
      await page.getByPlaceholder('Enter patient ID').click();
      await page.getByPlaceholder('Enter patient ID').fill('93800044');
      await page.getByRole('button').click();
      
      await expect(page.getByRole('main').filter({ hasText: 'WorklistPatient' })).toBeVisible();
      await expect(page.locator('div').filter({ hasText: /^Patient information$/ })).toBeVisible();
      await expect(page.getByRole('cell', { name: '93800044' })).toBeVisible();
      await expect(page.getByRole('row', { name: 'Patient ID :' }).getByRole('cell').nth(1)).toBeVisible();
      await expect(page.getByRole('row', { name: 'Name : Alice Brown' }).getByRole('cell').nth(1)).toBeVisible();
      await expect(page.getByRole('row', { name: 'Age :' }).getByRole('cell').nth(1)).toBeVisible();
      await expect(page.getByRole('cell', { name: 'DOB' })).toBeVisible();
      await expect(page.getByRole('row', { name: 'Sex : Female' }).getByRole('cell').nth(1)).toBeVisible();
      await expect(page.getByRole('row', { name: 'Weight :' }).getByRole('cell').nth(1)).toBeVisible();
      await expect(page.getByRole('row', { name: 'Height :' }).getByRole('cell').nth(1)).toBeVisible();
      await expect(page.getByRole('row', { name: 'Phone :' }).getByRole('cell').nth(1)).toBeVisible();
    });
    test('TC08:fail search', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('textbox', { name: 'Enter your username' }).click();
        await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
        await page.getByRole('button', { name: 'Login' }).click();
        
        await expect(page.getByText('Find Patient')).toBeVisible();
        await expect(page.getByPlaceholder('Enter patient ID')).toBeVisible();
        await page.getByPlaceholder('Enter patient ID').click();
        await page.getByPlaceholder('Enter patient ID').click();
        await page.getByPlaceholder('Enter patient ID').fill('12345678');
        await page.getByRole('button').click();
        await expect(page.getByText('Invalid patient ID')).toBeVisible();
        await expect(page.getByText('Find PatientInvalid patient ID')).toBeVisible();
    });
    
    test('TC09:fail pattern search', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('textbox', { name: 'Enter your username' }).click();
        await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByPlaceholder('Enter patient ID').click();
        await page.getByPlaceholder('Enter patient ID').fill('123');
        await page.getByRole('button').click();
        await expect(page.getByText('Invalid patient ID')).toBeVisible();
        await expect(page.getByText('Find PatientInvalid patient ID')).toBeVisible();
    });

    test('TC10:empty search', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('textbox', { name: 'Enter your username' }).click();
        await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
        await page.getByRole('textbox', { name: 'Enter your password' }).click();
        await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByPlaceholder('Enter patient ID').click();
        await page.getByPlaceholder('Enter patient ID').fill('');
        await page.getByRole('button').click();
        await expect(page.getByText('Patient ID cannot be empty')).toBeVisible();
        await expect(page.getByText('Find PatientPatient ID cannot')).toBeVisible();
    });

    