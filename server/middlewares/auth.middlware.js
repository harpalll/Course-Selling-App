export const JWT_SECRET = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ message: "Token Missing." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) return res.status(400).json({ message: "Invalid Token." });

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token." });
  }
};
