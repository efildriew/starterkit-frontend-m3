import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  async signup(user) {
    const { username, password } = user;
    const { data } = await this.auth.post('/signup', { username, password });
    return data;
  }

  async login(user) {
    const { username, password } = user;
    const { data } = await this.auth.post('/login', { username, password });
    return data;
  }

  async logout() {
    const response = await this.auth.get('/logout', {});
    return response.data;
  }

  async me(user) {
    const response = await this.auth.get('/me');
    return response.data;
  }
}

const authService = new AuthService();

export default authService;
