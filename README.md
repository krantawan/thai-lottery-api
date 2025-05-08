# Thai Lottery API

API สำหรับดึงและแสดงผลสลากกินแบ่งรัฐบาลไทยแบบอัตโนมัติ  
สร้างด้วย Express, Puppeteer, Prisma, PostgreSQL และ Docker

---
![Preview](https://raw.githubusercontent.com/krantawan/thai-lottery-api/main/preview.png)
> 🖼️ รูปภาพนี้สร้างด้วยปัญญาประดิษฐ์ (AI) โดยใช้ ChatGPT เพื่อประกอบการใช้งาน
---
## ✅ Features
- ดึงผลสลากกินแบ่งอัตโนมัติผ่าน Puppeteer
- บันทึกผลลงฐานข้อมูล PostgreSQL
- REST API (`/lottery/latest`, `/lottery/:date`)
- ป้องกันด้วย CORS + API Key
- Docker

---

## 🚀 การเริ่มต้น

### 1. ติดตั้ง dependencies
```bash
npm install
```

### 2. ตั้งค่า `.env`
สร้างไฟล์ `.env` และใส่ค่าตาม `.env.example`

### 3. สั่งรัน
```bash
npm start
```

### 4. เรียก API
- `GET /lottery/latest`
- `GET /lottery/:date` (เช่น `2025-05-02`)

---

## 🐳 Docker

### ใช้งาน
```bash
docker-compose up --build
```

---

## 🔐 API Key Example
```
x-api-key: your-secret-api-key
```

---

## 📂 Usage
- `scraper.js` – ดึงผลจากเว็บไซต์
- `src/server.js` – Express API
- `prisma/schema.prisma` – โครงสร้างฐานข้อมูล
- `.env.example` – ตัวอย่างการตั้งค่า
