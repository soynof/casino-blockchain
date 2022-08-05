import HTTP from '../../../common/enums/httpResponses.mjs'
import AnyService from '../services/anyservice.mjs';

class AnyController {
    static async Get(req, res) {
        let result = await AnyService.DoSomething();
        res.status(HTTP.SUCCESS.OK).json(result);
    }
}

export default AnyController;