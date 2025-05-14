
# Thai Lottery API

API สำหรับดึงและแสดงผลสลากกินแบ่งรัฐบาลไทยแบบอัตโนมัติ  
สร้างด้วย Express, Puppeteer, Prisma, PostgreSQL และ Docker

An API for fetching and displaying official Thai Government Lottery results  
Built with Express, Puppeteer, Prisma, PostgreSQL, and Docker.

---

![Preview](https://raw.githubusercontent.com/krantawan/thai-lottery-api/main/preview.png)  
> 🖼️ รูปภาพนี้สร้างด้วยปัญญาประดิษฐ์ (AI) โดยใช้ ChatGPT เพื่อประกอบการใช้งาน

---

## ✅ Features
- ดึงผลสลากกินแบ่งอัตโนมัติผ่าน Puppeteer (Automated scraping of lottery results using Puppeteer)
- บันทึกผลลงฐานข้อมูล PostgreSQL (Stores data into PostgreSQL using Prisma)
- ป้องกันด้วย CORS + API Key (Secured via CORS and API Key)
- ใช้งานได้ผ่าน Docker (Runs on Docker)

---

## 🚀 Getting Started

### 1. Clone and install dependencies
```bash
git clone https://github.com/krantawan/thai-lottery-api.git
cd thai-lottery-api
npm install
```

### 2. Configure  `.env`
สร้างไฟล์ `.env` และใส่ค่าตาม `.env.example`

---

## 🐳 3. Start PostgreSQL and pgAdmin using Docker
```bash
docker-compose up -d
```

---

### 4. Run Prisma Migrate and Seed
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

---

### 5. Start API server and scraper
```bash
npm start
```

---

## 🌐 API Endpoints

- `GET api/lottery/latest` → ดึงผลล่าสุด (Get latest lottery result)
- `GET api/lottery/:date` → ดึงผลตามวันที่ (Get result for a specific date) (เช่น `/lottery/2025-05-02`) 

### 🔐 Required Header:
```
x-api-key: your-secret-api-key
```

---

## 📂 Project Structure

| File | Description |
|------|-------------|
| `scraper.js` | ดึงผลหวยจากเว็บไซต์ |
| `src/server.js` | Express API |
| `src/routes/lottery.js` | Routes ของ API |
| `prisma/schema.prisma` | โครงสร้างฐานข้อมูล |
| `prisma/seed.js` | ข้อมูลตัวอย่าง |
| `.env.example` | ตัวอย่างไฟล์ตั้งค่า |

---

> 📌 ใช้สำหรับศึกษาและฝึกฝนการเขียนโปรแกรมเท่านั้น
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U21EYMRR)
