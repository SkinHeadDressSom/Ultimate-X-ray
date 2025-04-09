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

});

test('TC11: Reder dashboard', async ({ page }) => {

  await expect(page.getByText('Ultimate X-rayHNLogout')).toBeVisible();
  await expect(page.getByRole('button', { name: 'HN' })).toBeVisible();
  await expect(page.getByPlaceholder('Enter patient ID')).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  await expect(page.locator('div').filter({ hasText: 'Worklist' }).nth(3)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Patient informationPatient ID' }).nth(3)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Patient informationPatient ID' }).nth(2)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Patient information$/ })).toBeVisible();
  await expect(page.getByRole('complementary').locator('div').nth(2)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Patient ID :' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Name : Alice Brown' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Age :' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'DOB : 3/11/' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Sex : Female' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Weight :' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Height :' }).getByRole('cell').nth(1)).toBeVisible();
  await expect(page.getByRole('row', { name: 'Phone :' }).getByRole('cell').nth(1)).toBeVisible();

  await expect(page.getByText('StudiesViewer')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Viewer' })).toBeVisible();
  await expect(page.getByText('Studies', { exact: true })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'No.StatusDescriptionStudy' }).nth(4)).toBeVisible();
  await expect(page.locator('thead').getByRole('cell').filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'No.', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
  await page.getByRole('cell', { name: 'Status' }).getByRole('button').click();
  await expect(page.getByText('CompleteSchedule')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Complete$/ }).first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Schedule$/ }).first()).toBeVisible();
  await page.locator('#check-complete').check();
  await page.locator('#check-schedule').check();
  await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Study date' })).toBeVisible();
  await page.getByRole('cell', { name: 'Study date' }).getByRole('button').click();
  await expect(page.getByText('Sort ascendingSort descending')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Sort ascending$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Sort descending$/ })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Time' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Accession No.' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Images' })).toBeVisible();
  await page.getByRole('cell', { name: 'No.', exact: true }).click();
  await expect(page.getByText('StudiesViewerNo.')).toBeVisible();
});


test('TC12: search by name ', async ({ page }) => {
  

  await page.getByRole('button', { name: 'HN' }).click();
  await page.getByRole('button', { name: 'HN Name' }).click();
  await page.getByRole('textbox', { name: 'Enter patient name' }).click();
  await page.getByRole('textbox', { name: 'Enter patient name' }).fill('Davis Hall');
  await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).click();
  await expect(page.getByRole('cell', { name: 'Patient ID' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '93800048' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Davis Hall' })).toBeVisible();
});

test('TC13: search by empty name', async ({ page }) => {
 

  await page.getByRole('button', { name: 'HN' }).click();
  await page.getByRole('button', { name: 'HN Name' }).click();
  await page.getByRole('textbox', { name: 'Enter patient name' }).click();
  await page.getByRole('textbox', { name: 'Enter patient name' }).fill('');
  await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).click();
  await expect(page.getByRole('main').filter({ hasText: 'WorklistPatient' })).toBeVisible();
});

test('TC14: search by HN ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByPlaceholder('Enter patient ID').click();
  await page.getByPlaceholder('Enter patient ID').fill('93800044');
  await page.getByRole('button').click();

  await page.getByPlaceholder('Enter patient ID').click();
  await page.getByPlaceholder('Enter patient ID').fill('93800048');
  await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).click();
  await expect(page.getByRole('cell', { name: 'Patient ID' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '93800048' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Davis Hall' })).toBeVisible();
});

test('TC15: select case  ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByPlaceholder('Enter patient ID').click();
  await page.getByPlaceholder('Enter patient ID').fill('93800044');
  await page.getByRole('button').click();

  await page.getByRole('cell', { name: 'Lung opacity' }).click();
  await expect(page.locator('canvas').nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: 'Studies2/1/20158:30:00 AM2/1/' }).nth(2)).toBeVisible();
  await expect(page.getByText('SystemLayoutImage')).toBeVisible();

});

test('TC16:Show patients with no cases  ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Enter your username' }).click();
  await page.getByRole('textbox', { name: 'Enter your username' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByPlaceholder('Enter patient ID').click();
  await page.getByPlaceholder('Enter patient ID').fill('93800048');
  await page.getByRole('button').click();

  await expect(page.locator('div').filter({ hasText: /^No\.StatusDescriptionStudy dateTimeAccession No\.ImagesNo data available$/ })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await expect(page.getByText('Total 0 studies')).toBeVisible();
  
});



test('TC17: logout  ', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.locator('div').filter({ hasText: 'Welcome to Ultimate X-rayLogin' }).nth(1)).toBeVisible();
  
});










