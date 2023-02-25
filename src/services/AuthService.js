import api from '../api/index.js'

export default class AuthService {
    static async registration(name, email, password) {
        return api.post('/registration', { name, email, password })
    }

    static async login(email, password) {
        return api.post('/login', { email, password })
    }

    static async logout() {
        return api.post('/logout')
    }
}
