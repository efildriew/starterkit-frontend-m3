import axios from 'axios';
import UpdateJourney from '../components/UpdateJourney';

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
    console.log(journey);
    return this.journeys.post('/journeys', journey);
  }

  async updateJourney(journey) {
    return this.journeys.put(`/journeys/${journey.id}`, journey);
  }

  async deleteJourney(id) {
    return this.journeys.delete(`/journeys/${id}`);
  }
}

const journeyService = new JourneyService();

export default journeyService;
