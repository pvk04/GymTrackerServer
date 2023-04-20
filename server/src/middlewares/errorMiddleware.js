import { ApiError } from "../exeptions/apiError.js";

export function errorMiddleware(err, req, res, next) {
	console.log(err);
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}

	return res.json({ message: "Непридвиденная ошибка" });
}
