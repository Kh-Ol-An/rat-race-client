const blankService = require('../service/blank-service');

class BlankController {
    async setBlank(req, res, next) {
        try {
            const blank = await blankService.saveBlank(req.body);
            return res.json(blank);
        } catch (err) {
            next(err);
        }
    };

    async getBlank(req, res, next) {
        try {
            const blank = await blankService.getBlank();
            res.json(blank);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new BlankController();
