# วิธี setup Docker และ Database สำหรับโปรเจค

## วิธี setup Database

ต้องสร้าง build docker-compose ขึ้นมาก่อน
ส่วน schema สามารถดูได้ที่ schema.sql

## วิธี setup Docker

1. เปิด โปรแกรม Docker Desktop ขึ้นมา
2. ไปที่ visual code เปิดโปรเจคขึ้นมาและหา terminal
3. ไปที่ Backend directory

cd Ultimate-X-ray/Backend

4. เริ่ม Build docker-compose

docker compose up -d --build

5. หา terminal ใน program Docker desktop แล้วพิมพ์

docker-compose run --rm kong kong migrations bootstrap

## วิธี setup Kong API Gateway

### จะต้องทำการ create service และ route ของ service กันก่อน จึงจะเชื่อมหน้าบ้านหลังบ้านได้

1. ไปที่ wsl หรือ terminal ที่ docker ก็ได้
2. สร้าง service auth (ถ้าสร้างสำเร็จ status จะขึ้น 201 created)

   > curl -i -X POST http://localhost:8001/services --data "name=auth-service" --data "url=http://auth-service:3001/"

3. สร้าง route auth (ถ้าสร้างสำเร็จ status จะขึ้น 201 created)

   > curl -i -X POST http://localhost:8001/services/auth-service/routes --data "paths[]=/auth"

4. สร้าง service fetch-data (ถ้าสร้างสำเร็จ status จะขึ้น 201 created)

   > curl -i -X POST http://localhost:8001/services --data "name=fetch-data-service" --data "url=http://fetch-data-service:3002/"

5. สร้าง route fetch-data (ถ้าสร้างสำเร็จ status จะขึ้น 201 created)

   > curl -i -X POST http://localhost:8001/services/fetch-data-service/routes --data "paths[]=/fetch-data"
