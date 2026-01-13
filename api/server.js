import { kv } from '@vercel/kv';
import axios from 'axios';

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const PAYMENT_TOKEN = process.env.PAYMENT_TOKEN; // Твой 381764678:TEST:158881

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, userId } = req.query;

  try {
    // 1. Создание инвойса
    if (action === 'create-invoice' && req.method === 'POST') {
      const { uid } = req.body;
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
        title: "Modismo Pro",
        description: "Acceso ilimitado a expresiones y videos",
        payload: `user_${uid}`,
        provider_token: PAYMENT_TOKEN,
        currency: "RUB",
        prices: [{ label: "Modismo Pro", amount: 19000 }] // 190 рублей
      });
      return res.status(200).json({ link: response.data.result });
    }

    // 2. Получение данных (синхронизация прогресса и Pro)
    if (action === 'get-user-data' && req.method === 'GET') {
      const isPro = await kv.get(`user:${userId}:isPro`);
      const progress = await kv.get(`user:${userId}:progress`);
      return res.status(200).json({ isPro: !!isPro, progress: progress || {} });
    }

    // 3. Сохранение прогресса (идиома закрыта)
    if (action === 'save-progress' && req.method === 'POST') {
      const { uid, progressMap } = req.body;
      await kv.set(`user:${uid}:progress`, progressMap);
      return res.status(200).json({ success: true });
    }

    // 4. Вебхук оплаты
    if (req.body.update_id) {
      const update = req.body;
      if (update.pre_checkout_query) {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`, {
          pre_checkout_query_id: update.pre_checkout_query.id, ok: true
        });
      }
      if (update.message?.successful_payment) {
        const uid = update.message.successful_payment.invoice_payload.split('_')[1];
        await kv.set(`user:${uid}:isPro`, true);
      }
      return res.status(200).send('OK');
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
