import UserService from '../service/UserService.js';
import ApiError from '../exceptions/ApiError.js';
import { validationResult } from "express-validator";

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      const { username, email, password } = req.body;
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const userData = await UserService.registration(
        username,
        email,
        password,
      );
      const cookieLifeTime = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: cookieLifeTime,
        httpOnly: true,
        SameSite: 'None',
        Secure: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      const cookieLifeTime = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: cookieLifeTime, httpOnly: true, SameSite: "None", Secure: true  });
      return res.json(userData)
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
        next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      const cookieLifeTime = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: cookieLifeTime, httpOnly: true, SameSite: "None", Secure: true  });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getInitialState(req, res, next) {
    try {
      const userId = req.params.userId;
      const initialState = await UserService.getInitialState(userId);
      return res.json(initialState);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
