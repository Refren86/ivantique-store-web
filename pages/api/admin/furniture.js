export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;

    console.log(`body >>>`, body);

    res.status(200).json({ name: 'John Doe' });
  }
}
