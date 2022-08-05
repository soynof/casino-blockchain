import LogService from '../../authentication/src/services/log.js';

class LogMiddleware{
    static logger(err, req, res, next) {
        if (err) {
            LogService.in({
                endpoint: req?.originalUrl,
                error: err,
                body: req?.body,
                query: req?.query
            })
            res.sendStatus(500);
            console.log(err)
        }
    }
}

export { LogMiddleware };