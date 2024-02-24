import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "invalid auth header !" });
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(404).json({ error: "Access Denied !" });
  jwt.verify(token, process.env.JWT_SECRET, (error, tokenData) => {
    if (error) return res.status(403).json({ error: error.message });
    req.userId = tokenData.userId;
    next();
  });
};
