export default function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Specify the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Specify the allowed headers

  // Call the next middleware
  next();
}
