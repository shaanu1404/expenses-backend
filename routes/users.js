const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const BlacklistedToken = require("../models/blacklisttoken");
const {
  generateToken,
  generateAccessFromRefresh,
  logoutWithRefresh,
} = require("../utils/generateToken");

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 5);
    await User.create({ name, username, email, password: hash });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User with this email not found!");
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = { userId: user.id, name: user.name, active: user.active };
      const tokens = generateToken(payload);
      user.token = tokens.accessToken;
      await user.save();
      return res.status(200).json(tokens);
    }
    throw new Error("Invalid credentials!");
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refresh } = req.body;
    const isTokenBlacklisted = await BlacklistedToken.findOne({
      where: { token: refresh }
    });
    if (isTokenBlacklisted) {
      throw new Error("Invalid token!");
    }

    const { accessToken, userId } = generateAccessFromRefresh(refresh);
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User with this email not found!");
    }
    user.token = accessToken;
    await user.save();
    return res.status(200).json({ accessToken });
  } catch (e) {
    return res.status(401).json({
      error: e.message,
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { refresh } = req.body;
    const userId = logoutWithRefresh(refresh);
    await User.update({ token: null }, { where: { id: userId } });
    await BlacklistedToken.findOrCreate({
      where: { token: refresh },
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (e) {
    return res.status(401).json({
      error: e.message,
    });
  }
});

module.exports = router;
