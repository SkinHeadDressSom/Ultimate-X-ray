import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 50}, // เพิ่มจาก 1 เป็น 100 ผู้ใช้ใน 5 นาที
    { duration: '30m', target: 50}, // คงอยู่ที่ผู้ใช้ 100 คนเป็นเวลา 30 นาที
    { duration: '5m', target: 0 }, // ลดจำนวนผู้ใช้เหลือ 0 คน
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // การตั้งค่า threshold สำหรับ request ให้ใช้เวลาไม่เกิน 2 วินาที
  },
};

export default () => {
  // เพิ่มเวลา timeout ในคำขอ HTTP
  const urlRes = http.get('https://xray.phraya.net/', { timeout: '60s' }); // เพิ่มเวลารอให้มากขึ้น
  check(urlRes, {
    'Homepage loaded successfully': (r) => r.status === 200,
  });

  // 2. ทดสอบการ login
  const loginPayload = JSON.stringify({
    username: 'test',
    password: 'test',
  });

  const loginHeaders = { 'Content-Type': 'application/json' };

  const loginRes = http.post('https://xray.phraya.net/login', loginPayload, { headers: loginHeaders, timeout: '60s' });
  check(loginRes, {
    'Login request successful': (r) => r.status === 200,
  });

  sleep(1);
};
