import api from "../api/index.js";

export default class UserService {
    static async fetchUsers() {
        return api.get('/users');
    };
};
