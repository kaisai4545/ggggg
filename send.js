
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const { image, filename } = req.body;

    if (!image || !filename) {
      return res.status(400).send('Missing data');
    }

    const buffer = Buffer.from(image.split(',')[1], 'base64');
    const formData = new FormData();
    formData.append('file', buffer, filename);

    await fetch('https://discordapp.com/api/webhooks/1367027670747054090/Ly_aL2bZb9wSduF_lZJPCU9cWu1LgqYH5Q0eOqIO6BVP5hameSc6aFQvgdYXSmFETyEv', {
      method: 'POST',
      body: formData
    });

    res.status(200).send('Sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
}
