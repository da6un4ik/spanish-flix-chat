import { kv } from '@vercel/kv';
import axios from 'axios';

export default async function handler(req, res) {
  const { BOT_TOKEN, PAYMENT_TOKEN } = process.env;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { action, userId } = req.query;

    if (action === 'create-invoice' && req.method === 'POST') {
      const { uid } = req.body;
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
        title: "Modismo Pro",
        description: "Acceso ilimitado",
        payload: `user_${uid}`,
        provider_token: PAYMENT_TOKEN,
        currency: "RUB",
        prices: [{ label: "Pro", amount: 19000 }]
      });
      return res.status(200).json({ link: response.data.result });
    }

    // Обработка вебхука
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
