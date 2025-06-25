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

export async function fetchUserCars (userId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/getCarByUserId/${userId}`);

    return data;
  } catch (error) {
    throw new Error('Error fetching user cars: ' + error.message);
  }
}

export function postCar ({ 
  doors,
  capacity,
  dailyPrice,
  plateNumber,
  description,
  location,
  year,
  model,
  brand,
  transmission
 }) {
  return fetch(`${BASE_URL}/cars/create`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doors,
      capacity,
      dailyPrice,
      plateNumber,
      description,
      location,
      year,
      model,
      brand,
      transmission
    })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error en el registro: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    const { message } =  response;
    console.log("API RESPONSE: ", message);

    return message;
  });
 };
