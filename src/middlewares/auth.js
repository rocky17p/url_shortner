import { getUser } from "../services/auth.js";

function checkforauthentication(req, res, next) {
  const tokencookie = req.cookies?.token;
  req.user = null;
  if (!tokencookie) {
    return next();
  }
  const token = tokencookie;
  const user = getUser(token);

  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
}

export { checkforauthentication, restrictTo };
