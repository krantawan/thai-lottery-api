import puppeteer from 'puppeteer';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const URL = process.env.LOTTERY_URL;

export async function fetchLotteryResults() {
  console.log('⏳ กำลังโหลดเว็บผ่าน Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.textContent.trim() : '';
    };

    const getMultiple = (selector) => {
      return [...document.querySelectorAll(selector)].map((el) =>
        el.textContent.trim()
      );
    };

    const rawDateText = document.querySelector('h2.topic')?.textContent || '';
    const match = rawDateText.match(/(\d{1,2})\s(\S+)\s(\d{4})/);
    let parsedDate = '';
    if (match) {
      const [_, day, monthThai, yearThai] = match;
      const monthMap = {
        มกราคม: '01',
        กุมภาพันธ์: '02',
        มีนาคม: '03',
        เมษายน: '04',
        พฤษภาคม: '05',
        มิถุนายน: '06',
        กรกฎาคม: '07',
        สิงหาคม: '08',
        กันยายน: '09',
        ตุลาคม: '10',
        พฤศจิกายน: '11',
        ธันวาคม: '12',
      };
      const month = monthMap[monthThai] || '01';
      const year = (parseInt(yearThai) - 543).toString();
      parsedDate = `${year}-${month}-${day.padStart(2, '0')}`;
    }

    return {
      date: parsedDate,
      firstPrize: getText('.award1 .award-number p'),
      nearFirst: getMultiple('.award-near1 .award-number-nomal.--first p'),
      front3Digits: getMultiple('.award-3first .award-number p'),
      last3Digits: getMultiple('.award-3last .award-number p'),
      last2Digits: getText('.award-2last .award-number p'),
      secondPrize: getMultiple('.award2 .award-number-nomal p'),
      thirdPrize: getMultiple(
        '.award3 .award-number-nomal-list .box-list p'
      ),
      fourthPrize: getMultiple(
        '.award4 .award-number-nomal-list .box-list p'
      ),
      fifthPrize: getMultiple(
        '.award5 .award-number-nomal-list .box-list p'
      ),
    };
  });

  //console.log('🎯 ดึงผลสำเร็จ:', result);
  console.log('🎯 ดึงผลสำเร็จ');

  try {
    const parsedDate = new Date(result.date);

    const existing = await prisma.lotteryResult.findUnique({
      where: { date: parsedDate },
    });

    if (existing) {
      console.log(`⚠️ ข้อมูลของวันที่ ${result.date} มีอยู่แล้วในฐานข้อมูล`);
    } else {
      await prisma.lotteryResult.create({
        data: {
          date: parsedDate,
          firstPrize: result.firstPrize,
          nearFirst: result.nearFirst,
          front3Digits: result.front3Digits,
          last3Digits: result.last3Digits,
          last2Digits: result.last2Digits,
          secondPrize: result.secondPrize,
          thirdPrize: result.thirdPrize,
          fourthPrize: result.fourthPrize,
          fifthPrize: result.fifthPrize,
        },
      });
      console.log(`✅ บันทึกข้อมูลวันที่ ${result.date} ลงฐานข้อมูลเรียบร้อยแล้ว`);
    }
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดระหว่างบันทึก:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

fetchLotteryResults();
cron.schedule('*/5 * * * *', fetchLotteryResults);
