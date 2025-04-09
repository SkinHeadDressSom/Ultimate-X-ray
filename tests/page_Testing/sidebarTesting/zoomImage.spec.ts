import { test, expect } from '@playwright/test';

test.describe('Zoom In and Zoom Out Test on X-ray Image', () => {

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

  
  test('TC23:should start at normal scale (1)', async ({ page }) => {
    const xrayImage = page.locator('img[alt="x-ray-0"]');
    const initialScale = await xrayImage.evaluate(el => el.style.transform);
    
    console.log('Initial Scale:', initialScale);
    expect(initialScale).toBe('translate(0px, 0px) scale(1)');
await expect(page.getByRole('main')).toContainText('Alice Brown9380004443 / 3/11/1982Female65kg / 170cmABC Hospital1339862/1/20158:30:00 AMZoom: 100%WL: 2244WW: 4400');
  });


  test('TC24:should zoom in 3 times and update scale', async ({ page }) => {
    const xrayImage = page.locator('img[alt="x-ray-0"]');

    const zoomInButton = page.locator('button:has(svg[id="zoomin"])');
    await zoomInButton.click();
    await zoomInButton.click();
    await zoomInButton.click();
    await page.waitForTimeout(500); 

    const updatedScale = await xrayImage.evaluate(el => el.style.transform);
    console.log('Zoomed In Scale:', updatedScale);
    
    expect(updatedScale).toBe('translate(0px, 0px) scale(1.331)');
    await expect(page.getByRole('main')).toContainText('Alice Brown9380004443 / 3/11/1982Female65kg / 170cmABC Hospital1339862/1/20158:30:00 AMZoom: 133%WL: 2244WW: 4400');
  });

  test('TC25:should zoom out 3 times and update scale', async ({ page }) => {
    const xrayImage = page.locator('img[alt="x-ray-0"]');

    const zoomOutButton = page.locator('button:has(svg[id="zoomout"])');
    await zoomOutButton.click();
    await zoomOutButton.click();
    await zoomOutButton.click();
    await page.waitForTimeout(500); 

    // Check Scale After Zoom Out
    const updatedScale = await xrayImage.evaluate(el => el.style.transform);
    console.log('Zoomed Out Scale:', updatedScale);
    
    expect(updatedScale).toBe('translate(0px, 0px) scale(0.729)');
    await expect(page.getByRole('main')).toContainText('Alice Brown9380004443 / 3/11/1982Female65kg / 170cmABC Hospital1339862/1/20158:30:00 AMZoom: 73%WL: 2244WW: 4400');
  });

});
