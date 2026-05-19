import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import db from "../db/index.js";
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";

class UserService {

  async registration(username, email, password) {
    const candidate = await db.query(
      `SELECT email FROM users WHERE email = '${email}'`
    );
    if (candidate.rows.length !== 0) {
      throw ApiError.BadRequest(`A user with this e-mail address: ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    await db.query(`INSERT INTO users (username, email, password, activation_link)
    VALUES ('${username}', '${email}', '${hashPassword}', '${activationLink}')`); // create new user

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    const userDto = new UserDto(user.rows[0]);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
  
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await db.query(`SELECT activation_link FROM users WHERE activation_link = '${activationLink}'`);
    if (user.rows.length === 0) {
      throw new ApiError.BadRequest(`Incorrect activation link`);
    }
    await db.query(`UPDATE users SET is_activated = '${true}' WHERE activation_link = '${activationLink}'`);
  }

  async login(email, password) {
    const user = await db.query(`SELECT * FROM User WHERE email = '${email}'`);
    if (user.rows.length === 0) {
      throw ApiError.BadRequest(`User with email: ${email} not found`);
    }
    const userPswd = user.rows[0].password;
    const isPassEquals = await bcrypt.compare(password, userPswd);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect password`);
    }
    const userDto = new UserDto(user.rows[0]);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthoraizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || tokenFromDb.length === 0) {
      throw ApiError.UnauthoraizedError();
    }
    const user = await db.query(`SELECT * FROM users WHERE id = '${userData.id}'`)
    const userDto = new UserDto(user.rows[0]);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getInitialState(userId) {
    return `initial user${userId} state initiated`;
  }
}

export default new UserService();
