import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export function postReservation({
  startDate, 
  endDate, 
  address, 
  carPlateNumber 
}, token) {
return fetch(`${BASE_URL}/reservation/create`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify({
        startDate,
        endDate,
        address,
        carPlateNumber
    })
}).then((response) => {
        if (!response.ok) {
            throw new Error('Error creating reservation: ' + response.statusText);
        }
        return response.json();
    }).then(response => {
        const {message} = response;
        console.log("API RESPONSE:", message);

        return message;
    });
};

export async function fetchAllCarReservedDates(carId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reservation/getAllCarReservedDates?id=${carId}`);

    return data.data;
  } catch (error) {
    console.error("Error fetching reserved dates:", error);
    throw error;
  }
}

export async function fetchAllCarReservations(carId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reservation/getAll?id=${carId}`);

    return data.data;
  } catch (error) {
    console.error("Error fetching car reservations:", error);
    throw error;
  }
}


export async function fetchAllUserReservations(userId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reservation/getAllByUser?id=${userId}`);

    return data.data;
  } catch (error) {
    console.error("Error fetching car reservations:", error);
    throw error;
  }
}

export function cancelReservation(reservationId, token) {
return fetch(`${BASE_URL}/reservation/cancel/${reservationId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    }
}).then((response) => {
        if (!response.ok) {
            throw new Error('Error canceling reservation: ' + response.statusText);
        }
        return response.json();
    }).then(response => {
        const {message} = response;
        console.log("API RESPONSE:", message);

        return message;
    });
};