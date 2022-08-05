import { AUTH } from '../config.mjs';
import HTTP from '../enums/httpResponses.mjs';
import JWT from 'jsonwebtoken';

class AuthMiddleware {
    static VerifyToken(token) {
        return new Promise((resolve, reject) => {
            JWT.verify(
                token,
                AUTH.SECRET,
                {
                    algorithms: ["HS512"]
                },
                (err, decoded) => {
                    if (err) {
                        resolve(false);
                    } else {
                        resolve(decoded);
                    }
                }
            )
        })
    }

    static async JWTFromCookie(req, res, next) {
        try {
            const token = req?.cookies?.token;
            
            if (!token) { 
                return res
                .setHeader('WWW-Authenticate', 'Bearer')
                .sendStatus(HTTP.CLIENT_ERROR.UNAUTHORIZED) 
            }

            const decoded = await AuthMiddleware.VerifyToken(token);
            
            if(!decoded) { return res.sendStatus(HTTP.CLIENT_ERROR.UNAUTHORIZED) }
            
            req.user = decoded.data;
            
            next();
        
        } catch (err) {
            console.log(err)
            return res.sendStatus(HTTP.SERVER_ERROR.INTERNAL_SERVER_ERROR)
        }
    }

    static async BearerFromHeader(req, res, next) {
        try {
            const token = req?.headers?.authorization?.split(' ')[1];
            
            if (!token) { return res.sendStatus(HTTP.CLIENT_ERROR.UNAUTHORIZED) }
            
            const decoded = await AuthMiddleware.VerifyToken(token);

            if(!decoded) { return res.sendStatus(HTTP.CLIENT_ERROR.UNAUTHORIZED) }
            
            req.user = decoded.data;
            
            next();
        } catch (err) {
            console.log(err)
            return res.sendStatus(HTTP.SERVER_ERROR.INTERNAL_SERVER_ERROR)
        }
    }
}

export default AuthMiddleware;