import HTTP from '../../../common/enums/httpResponses.mjs'
import AnyService from '../services/test.mjs';

class TestController {
    static async Get(req, res) {
        let result = await AnyService.SendToWallet("Hello from TestController");
        res.status(HTTP.SUCCESS.OK).json(result);
    }
}

export default TestController;