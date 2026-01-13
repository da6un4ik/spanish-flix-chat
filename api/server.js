import axios from 'axios';

export default async function handler(req, res) {
  const { BOT_TOKEN, PAYMENT_TOKEN } = process.env;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { action } = req.query;

    // 1. Создание счета
    if (action === 'create-invoice') {
      const { uid } = req.body;
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
        title: "Modismo Pro",
        description: "Acceso total + Código de activación",
        payload: `user_${uid}`,
        provider_token: PAYMENT_TOKEN,
        currency: "RUB",
        prices: [{ label: "Pro", amount: 19000 }]
      });
      return res.status(200).json({ link: response.data.result });
    }

    // 2. Вебхук: отправка кода после оплаты
    if (req.body.update_id) {
      const update = req.body;
      
      if (update.pre_checkout_query) {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`, {
          pre_checkout_query_id: update.pre_checkout_query.id, ok: true
        });
      }

      if (update.message?.successful_payment) {
        const chatId = update.message.chat.id;
        // Бот отправляет секретный код пользователю в личку
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          chat_id: chatId,
          text: "✅ ¡Pago recibido! Su código de activación es: ESP2026\n\nIntrodúzcalo en la aplicación para desbloquear todo."
        });
      }
      return res.status(200).send('OK');
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
