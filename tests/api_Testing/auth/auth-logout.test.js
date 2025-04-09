const { test, expect, request } = require('@playwright/test');

test.describe('POST /api/logout', () => {
  let api;

  test('should login and then logout successfully', async () => {
    const apiContext = await request.newContext({
      baseURL: 'http://localhost:3001',
    });

    const loginRes = await apiContext.post('/api/login', {
      data: {
        username: 'test',
        password: 'test',
      },
    });

    expect(loginRes.status()).toBe(200);

    const logoutRes = await apiContext.post('/api/logout');
    expect(logoutRes.status()).toBe(200);

    const body = await logoutRes.json();
    expect(body.message).toBe('Logout successfully');

    const setCookieHeader = logoutRes.headers()['set-cookie'];
    expect(setCookieHeader).toMatch(/token=;/);
  });
});
