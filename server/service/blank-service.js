const blankModel = require('../models/blank-model');

class BlankService {
    async saveBlank(reqBody) {
        return await blankModel.create({ ...reqBody });
    };

    async getBlank() {
        return await blankModel.find();
    };
}

module.exports = new BlankService();
