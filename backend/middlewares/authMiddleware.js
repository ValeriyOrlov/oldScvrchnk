import ApiError from "../exceptions/ApiError.js";
import TokenService from "../service/TokenService.js";

export default (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthoraizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthoraizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthoraizedError());
    }

    req.user = userData;
    next();

  } catch(e) {
    return next(ApiError.UnauthoraizedError());
  }
}