import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export function postReview({comment, rating}, carId, token) {
  return fetch(`${BASE_URL}/reviews/create/${carId}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify({
        comment,
        rating
    })
  }).then(async (response) => {
        const text = await response.text();
        if (!response.ok) {
            throw new Error('Error creating review: ' + response.statusText + " - " + text);
        }
        return JSON.parse(text);
    }).then(response => {
        const {message} = response;
        return message;
    });
}

export async function fetchAllCarReviews(carId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/getAllReviewByCarId/${carId}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}