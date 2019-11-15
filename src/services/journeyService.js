import axios from 'axios';

class JourneyService {
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

  async createJourney(journey) {
    console.log('journeyservices body', journey);
    return this.journeys.post('/journeys', journey);
  }

  async getJourney(id) {
    const { data } = await this.journeys.get(`/journeys/${id}`);
    return data;
  }

  async updateJourney(journey, id) {
    return this.journeys.put(`/journeys/${id}`, journey).then(response => console.log(response));
  }

  async deleteJourney(id) {
    return this.journeys.delete(`/journeys/${id}`);
  }
}

const journeyService = new JourneyService();

export default journeyService;
