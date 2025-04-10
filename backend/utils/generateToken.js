import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../constants/index.js";

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent client side js from accessing the cookie
    sameSite: "strict", // prevent csrf attacks
    secure: NODE_ENV !== "development", // only send the cookie in https in production
  });
};

export default generateTokenAndSetCookie;
