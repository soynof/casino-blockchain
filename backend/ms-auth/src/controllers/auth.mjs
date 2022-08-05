import HTTP from '../../../common/enums/httpResponses.mjs'
import AuthService from '../services/auth.mjs';
import CONFIG from '../config.mjs';

class AuthController {
    static async SignIn(req, res) {
        let signedIn = await AuthService.GetUserAndToken(req.body);
        return signedIn ? res
            .cookie('user_data', JSON.stringify({ username: signedIn.username }), CONFIG.COOKIES.USER_DATA)
            .cookie('token', signedIn.token, CONFIG.COOKIES.SESSION)
            .sendStatus(HTTP.SUCCESS.NO_CONTENT) : res.sendStatus(HTTP.CLIENT_ERROR.BAD_REQUEST);
    }

    static async SignUp(req, res) {
        let newUser = await AuthService.CreateUser(req.body)
        return newUser ? res.sendStatus(HTTP.SUCCESS.NO_CONTENT) : res.sendStatus(HTTP.CLIENT_ERROR.BAD_REQUEST);
    }

    static async SignOut(req, res, next) {

    }
}

export default AuthController;