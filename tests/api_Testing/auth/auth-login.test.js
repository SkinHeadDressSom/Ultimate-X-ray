const { test, expect, request } = require('@playwright/test');

test.describe('POST /api/login', () => {
  let api;

  test.beforeAll(async () => {
    api = await request.newContext({
      baseURL: 'http://localhost:3001', // backend ต้องรันอยู่ก่อน
    });
  });

  test('should return 400 if username or password is missing', async () => {
    const res = await api.post('/api/login', {
      data: {}, // ไม่ส่งข้อมูล
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe('Username and Password are required');
  });

  test('should return 404 if user is not found', async () => {
    const res = await api.post('/api/login', {
      data: {
        username: 'nonexistentuser',
        password: 'somepassword',
      },
    });

    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe('Invalid Username or Password');
  });

  test('should return 401 if password is incorrect', async () => {
    const res = await api.post('/api/login', {
      data: {
        username: 'test', // สมมุติว่าผู้ใช้นี้มีในฐานข้อมูล
        password: 'wrongtest',
      },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toBe('Invalid Username or Password');
  });

  test('should login successfully and set cookie', async () => {
    const res = await api.post('/api/login', {
      data: {
        username: 'test',
        password: 'test', // สมมุติว่าถูกต้อง
      },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();

    expect(body.message).toBe('Login successfully');
    expect(body.user).toHaveProperty('username');
    expect(res.headers()['set-cookie']).toBeDefined(); // ตรวจสอบว่า cookie ถูกเซ็ต
  });
});
