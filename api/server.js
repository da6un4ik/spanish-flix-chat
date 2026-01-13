import axios from 'axios';

export default async function handler(req, res) {
  const { BOT_TOKEN, PAYMENT_TOKEN } = process.env;

  // Настройка CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { action } = req.query;

    // 1. Создание ссылки на оплату
    if (action === 'create-invoice' && req.method === 'POST') {
      const { uid } = req.body;
      
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
        title: "Modismo Pro",
        description: "Acceso total a todas las expresiones y videos",
        payload: `user_${uid}`,
        provider_token: PAYMENT_TOKEN,
        currency: "RUB",
        prices: [{ label: "Acceso Pro", amount: 19000 }] // 190.00 RUB
      });

      return res.status(200).json({ link: response.data.result });
    }

    // 2. Обработка уведомлений об оплате (Webhook)
    if (req.body.update_id) {
      const update = req.body;

      // Подтверждение готовности к оплате
      if (update.pre_checkout_query) {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`, {
          pre_checkout_query_id: update.pre_checkout_query.id,
          ok: true
        });
      }

      // Если оплата прошла успешно — отправляем код
      if (update.message?.successful_payment) {
        const chatId = update.message.chat.id;
        
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          chat_id: chatId,
          text: "✅ ¡Pago recibido!\n\nTu código de activación es: ESP2026\n\nIntrodúcelo en la aplicación para desbloquear todo el contenido.",
          parse_mode: "Markdown"
        });
      }

      return res.status(200).send('OK');
    }

    return res.status(404).json({ error: "Not found" });

  } catch (e) {
    console.error("API Error:", e.message);
    return res.status(500).json({ error: e.message });
  }
}
