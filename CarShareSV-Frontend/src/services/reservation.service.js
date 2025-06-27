import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function postReservation({
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