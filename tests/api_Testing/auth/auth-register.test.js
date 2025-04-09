const { test, expect, request } = require('@playwright/test');

function generateUsername() {
  return 'user_' + Math.random().toString(36).substring(2, 8);
}

test.describe('POST /api/register', () => {
  let api;

  test.beforeAll(async () => {
    api = await request.newContext({
      baseURL: 'http://localhost:3001',
    });
  });

  test('should return 201 when registration is successful', async () => {
    const res = await api.post('/api/register', {
      data: {
        username: generateUsername(),
        password: 'password123',
      },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.message).toBe('Register successfully');
  });

  test('should return 400 when username or password is missing', async () => {
    const res = await api.post('/api/register', {
      data: {
        username: '',
        password: '',
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.message).toBe('Username and Password are required'); // ต้องตรงกับ RESPONSE_MESSAGES.missingArguments
  });

  test('should return 409 when username already exists', async () => {
    const username = generateUsername();
  
    // 🔁 สมัครครั้งแรก
    await api.post('/api/register', {
      data: { username, password: 'password123' },
    });
  
    // ✅ เพิ่ม delay เพื่อรอ DB
    await new Promise((resolve) => setTimeout(resolve, 200));
  
    // 🔁 สมัครซ้ำ
    const secondRes = await api.post('/api/register', {
      data: { username, password: 'password123' },
    });
  
    expect(secondRes.status()).toBe(409);
    const body = await secondRes.json();
    expect(body.message).toBe('User already exists');
  });
  
});
