import { AUTH } from '../../../common/config.mjs';
import crypto from 'crypto';
import JWT from 'jsonwebtoken';

class AuthService {

    static users = [];
    
    static HashPassword(password) {
        return new Promise((resolve) => {
            resolve(crypto.createHash('sha256').update(password).digest("hex"))
        })
    }

    static CreateToken(payload) {
        return new Promise((resolve, reject) => {
            JWT.sign(
                { data: payload },
                AUTH.SECRET,
                {
                    algorithm: "HS512",
                    expiresIn: "7d"
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                }
            )
        })
    }

    static async CreateUser({ username, password }){
        AuthService.users.push({ username, password: await AuthService.HashPassword(password) });
        
        return true;
    }

    static async GetUserAndToken({ username, password }){
        const user = AuthService.users.find(user => user.username === username);
        
        if(!user || user.password !== await AuthService.HashPassword(password)) return false;
        
        return { 
            username: user.username,
            token: await AuthService.CreateToken({ username })
        }
    }
}

export default AuthService;