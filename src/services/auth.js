// service/auth.js — improved
import jwt from "jsonwebtoken";
const secret = "12";

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret,
    { expiresIn: "6h" }
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; // handle invalid/expired token gracefully
  }
}

export { setUser, getUser };
