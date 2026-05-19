import jwt from 'jsonwebtoken';
import db from '../db/index.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await db.query(
      `SELECT user_id FROM tokens WHERE user_id = ${userId}`,
    );

    if (tokenData.rows.length !== 0) {
      await db.query(
        `UPDATE tokens SET refresh_token = '${refreshToken}' WHERE user_id = ${userId}`,
      );
      return;
    }
    const token = await db.query(
      `INSERT INTO tokens (user_id, refresh_token) VALUES (${userId}, '${refreshToken}')`,
    );
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await db.query(`DELETE FROM tokens WHERE refresh_token = '${refreshToken}'`);
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch(e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch(e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await db.query(`SELECT * FROM tokens WHERE refresh_token = '${refreshToken}'`);
    return tokenData.rows;
  }
}

export default new TokenService();
