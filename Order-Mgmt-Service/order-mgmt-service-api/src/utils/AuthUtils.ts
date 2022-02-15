import { APIError } from "apilove";
export class AuthUtils {
    private static _needsAuth(req): boolean {
        return !req.isAuthenticated;
    }

    static apiKeyMiddleware(key:string, headerName = "api-key"): (request, response, next) => void
    {
        return ((request, response, next) => {
            if(request.get(headerName) !== key)
            {
                throw APIError.create401UnauthorizedError();
            }
            next();
        });
    }
}