const blankModel = require('../models/blank-model');

class BlankService {
    async saveBlank(reqBody) {
        return await blankModel.update({}, { ...reqBody });
    };

    async getBlank() {
        return await blankModel.find();
    };
}

module.exports = new BlankService();
