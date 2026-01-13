import { kv } from '@vercel/kv';
import axios from 'axios';

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const PAYMENT_TOKEN = process.env.PAYMENT_TOKEN; // Твой токен: 381764678:TEST:158881

  // Настройка CORS для работы с фронтендом
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, userId } = req.query;

  try {
    // 1. СОЗДАНИЕ СЧЕТА ЮKASSA
    if (action === 'create-invoice' && req.method === 'POST') {
      const { uid } = req.body;
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
        title: "Modismo Pro",
        description: "Acceso ilimitado a todos los modismos и видео",
        payload: `user_${uid}`, // Здесь ID пользователя привязывается к платежу
        provider_token: PAYMENT_TOKEN,
        currency: "RUB",
        prices: [{ label: "Acceso Pro", amount: 19000 }] // Сумма в копейках: 190 рублей
      });
      return res.status(200).json({ link: response.data.result });
    }

    // 2. ПОЛУЧЕНИЕ ДАННЫХ (СИНХРОНИЗАЦИЯ)
    if (action === 'get-user-data' && req.method === 'GET') {
      const isPro = await kv.get(`user:${userId}:isPro`);
      const progress = await kv.get(`user:${userId}:progress`);
      return res.status(200).json({ 
        isPro: !!isPro, 
        progress: progress || {} 
      });
    }

    // 3. СОХРАНЕНИЕ ПРОГРЕССА
    if (action === 'save-progress' && req.method === 'POST') {
      const { uid, progressMap } = req.body;
      await kv.set(`user:${uid}:progress`, progressMap);
      return res.status(200).json({ success: true });
    }

    // 4. WEBHOOK (ОБРАБОТКА УВЕДОМЛЕНИЙ ОТ TELEGRAM)
    if (req.body.update_id) {
      const update = req.body;
      
      // Шаг А: Предварительная проверка (обязательно для ЮKassa)
      if (update.pre_checkout_query) {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`, {
          pre_checkout_query_id: update.pre_checkout_query.id, 
          ok: true
        });
      }

      // Шаг Б: Подтверждение успешной оплаты и выдача Pro
      if (update.message?.successful_payment) {
        const payload = update.message.successful_payment.invoice_payload;
        const uid = payload.split('_')[1]; // Достаем ID из payload 'user_12345'
        await kv.set(`user:${uid}:isPro`, true);
      }
      return res.status(200).send('OK');
    }

    return res.status(400).json({ error: "Unknown action" });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
