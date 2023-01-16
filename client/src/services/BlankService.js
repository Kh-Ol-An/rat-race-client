import api from "../api/index.js";

export default class BlankService {
    static async saveBlank(blank) {
        console.log('BlankService blank: ', blank);
        return api.post('/blank', blank);
    };

    static async getBlank() {
        return api.get('/blank');
    };
};
