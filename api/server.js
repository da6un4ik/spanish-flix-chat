import axios from 'axios';

export default async function handler(req, res) {
  const { BOT_TOKEN, PAYMENT_TOKEN } = process.env;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { action } = req.query;

    if (action === 'create-donation') {
      const { uid, amount, label } = req.body;
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
        title: `Donación: ${label}`,
        description: "Gracias por apoyar el desarrollo de Modismo",
        payload: `donation_${uid}`,
        provider_token: PAYMENT_TOKEN,
        currency: "RUB",
        prices: [{ label: label, amount: amount }]
      });
      return res.status(200).json({ link: response.data.result });
    }

    // Обработка вебхука (пре-чекаут)
    if (req.body.pre_checkout_query) {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/answerPreCheckoutQuery`, {
        pre_checkout_query_id: req.body.pre_checkout_query.id,
        ok: true
      });
      return res.status(200).send('OK');
    }

    return res.status(200).send('OK');
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
