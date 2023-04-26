import { ApiError } from "../exeptions/apiError";
import { tokenService } from "../services/tokenService";

export function authMiddleware(req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedUser());
		}

		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedUser());
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnauthorizedUser());
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.UnauthorizedUser());
	}
}
