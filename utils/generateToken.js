const jwt = require("jsonwebtoken");
const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = process.env;

module.exports = {
  generateToken: (payload) => {
    try {
      const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS, {
        expiresIn: '1h'
      });
      const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, {
        expiresIn: "2d",
      });
      return { accessToken, refreshToken };
    } catch (err) {
      throw new Error(err);
    }
  },
  generateAccessFromRefresh: (refreshToken) => {
    try {
      const { userId, name, active } = jwt.decode(
        refreshToken,
        JWT_SECRET_REFRESH
      );
      const payload = { userId, name, active };
      return {
        accessToken: jwt.sign(payload, JWT_SECRET_ACCESS, {
          expiresIn: 60 * 60,
        }),
        userId,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  logoutWithRefresh: (refreshToken) => {
    try {
      const { userId } = jwt.decode(refreshToken, JWT_SECRET_REFRESH);
      return userId;
    } catch (err) {
      throw new Error(err);
    }
  },
};
