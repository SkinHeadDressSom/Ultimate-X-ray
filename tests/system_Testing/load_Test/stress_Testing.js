import http from 'k6/http';
import { check, sleep } from 'k6';  
import { parseHTML } from 'k6/html';

export const options = {
  stages: [
    { duration: '10m', target: 100 },  
    { duration: '30m', target: 100 },  
    { duration: '5m', target: 0 },     
  ],
};

export default () => {
  const urlRes = http.get('https://xray.phraya.net/');
  check(urlRes, {
    'Homepage loaded successfully': (r) => r.status === 200,
  });

  const csrfToken = extractCsrfToken(urlRes.body);

  const loginPayload = JSON.stringify({
    username: 'test',  
    password: 'test', 
  });

  const loginHeaders = {
    'Content-Type': 'application/json',
    'csrf-token': csrfToken,  
  };

  const loginRes = http.post('https://xray.phraya.net/login', loginPayload, { headers: loginHeaders });


  check(loginRes, {
    'Login request successful': (r) => r.status === 200,
    'Login successful': (r) => r.body.includes('Login successful') || r.body.includes('token'),
  });

  
  sleep(1);
};

function extractCsrfToken(body) {
  const doc = parseHTML(body);
  const csrfMeta = doc.find('meta[name="csrf-token"]');
  return csrfMeta.length > 0 ? csrfMeta.attr('content') : '';
}
