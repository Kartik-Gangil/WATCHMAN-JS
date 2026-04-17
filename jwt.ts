const jwt = require('jsonwebtoken');

const signJWT = (payload: any, time: string) => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: time || "1h" }
  );
  return token;
}