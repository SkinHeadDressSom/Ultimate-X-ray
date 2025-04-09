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

  test('TC27: Adjust contrast using slider', async ({ page }) => {
    
    await page.locator('button:nth-child(7)').click();

    await page.getByRole('slider').fill('0');
    await expect(page.getByRole('spinbutton')).toHaveValue('0');

    await page.getByRole('slider').fill('100');
    await expect(page.getByRole('spinbutton')).toHaveValue('100');

    await page.getByRole('slider').fill('-50');
    await expect(page.getByRole('spinbutton')).toHaveValue('-50');

});
test('TC28: Adjust contrast and check image filter', async ({ page }) => {
    
    await page.locator('button:nth-child(7)').click();

    const xrayImage = page.locator('img[alt="x-ray-0"]');

    const initialFilter = await xrayImage.evaluate(el => el.style.filter);
    console.log('Initial Contrast:', initialFilter);
    await page.getByRole('slider').fill('0');
    expect(initialFilter).toContain('contrast(1)');

    await page.getByRole('slider').fill('100'); 
    await page.waitForTimeout(500);

    const increasedFilter = await xrayImage.evaluate(el => el.style.filter);
    console.log('Increased Contrast:', increasedFilter);
    expect(increasedFilter).toContain('contrast(6)');
    expect(increasedFilter).not.toBe(initialFilter);

    await page.getByRole('slider').fill('-100');
    await page.waitForTimeout(500);

    const decreasedFilter = await xrayImage.evaluate(el => el.style.filter);
    console.log('Decreased Contrast:', decreasedFilter);
    expect(decreasedFilter).toContain('contrast(0.5)');
    expect(decreasedFilter).not.toBe(increasedFilter);
});

