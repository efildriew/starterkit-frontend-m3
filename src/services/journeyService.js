import axios from 'axios';

class journeyService {
  constructor() {
    this.journeys = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  async getAllJourneys() {
    const { data } = await this.journeys.get('/journeys');
    return data;
  }
}

export default journeyService;
