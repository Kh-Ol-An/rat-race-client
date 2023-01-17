const blankService = require('../service/blank-service');
const UserDto = require("../dtos/user-dto");
const userModel = require("../models/user-model");

class BlankController {
    async setBlank(req, res, next) {
        try {
            const email = req.user.email;
            const user = await userModel.findOne({ email });
            const userDto = new UserDto(user);
            const blank = await blankService.saveBlank({ ...req.body, user: userDto.id });
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
