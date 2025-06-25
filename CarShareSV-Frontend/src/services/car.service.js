import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchVisibleCars () {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/getAllVisible`);

    return data;
  } catch (error) {
    throw new Error('Error fetching visible cars: ' + error.message);
  }
}