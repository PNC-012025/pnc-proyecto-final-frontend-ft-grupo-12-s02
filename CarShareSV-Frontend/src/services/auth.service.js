import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export function register ({ firstName, lastName, username, birthdate, email, phoneNumber, password }) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      birthdate,
      email,
      phoneNumber,
      password
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
}

export function login ({ username, password }) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error en el inicio de sesión: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    const { accessToken } = response;
    console.log("Successful login");

    return accessToken;
  });
}

export async function getUser (token = null) {
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

  const { data } = await axios.get(`${BASE_URL}/auth/whoami`);

  return data;
}