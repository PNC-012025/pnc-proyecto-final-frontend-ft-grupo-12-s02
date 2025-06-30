import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchVisibleCars () {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/getAllVisible`);

    return data.data;
  } catch (error) {
    throw new Error('Error fetching visible cars: ' + error.message);
  }
}

export async function fetchUserCars (userId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/getCarByUserId/${userId}`);

    return data.data;
  } catch (error) {
    throw new Error('Error fetching user cars: ' + error.message);
  }
}

export async function fetchCarById (carId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/getCarById/${carId}`);

    return data.data;
  } catch (error) {
    throw new Error('Error fetching car by ID: ' + error.message);
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
  transmission,
  images
 }, token ) {
  return fetch(`${BASE_URL}/cars/create`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
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
      transmission,
      images
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

 export function setCarVisibility (carId, visible, token ) {
  return fetch(`${BASE_URL}/cars/setCarVisibility/${carId}?visible=${visible}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error en setCarVisibility: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    const { message } =  response;
    console.log("API RESPONSE: ", message);

    return message;
  });
 };

 export function deleteCar(carId, token) {
  return fetch(`${BASE_URL}/cars/delete/${carId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }).then(async response => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Error en deleteCar: ' + response.statusText);
    }
    console.log("API RESPONSE: ", data.message);
    return data.message;
  });
}

 export async function fetchAllCars () {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/getAll`);
    const hiddenCars = Array.isArray(data.data)
      ? data.data.filter(car => car.visible === false)
      : [];
    return hiddenCars;
  } catch (error) {
    throw new Error('Error fetching hidden cars: ' + error.message);
  }
}