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
    //console.log("Successful login");

    return accessToken;
  });
}

export async function getUser (token = null) {
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

  const { data } = await axios.get(`${BASE_URL}/auth/whoami`);

  return data.data;
}

//admin endpoints
export async function getAllUsers () { 
  try {
    const { data } = await axios.get(`${BASE_URL}/user/getAll`);

    return data.data;
  } catch (error) {
    throw new Error('Error fetching all users: ' + error.message);
  }
}


export function activeUser (userId, token) {
  return fetch(`${BASE_URL}/user/activate/${userId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error al activar usuario: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    //console.log("usuario activado correctamente: " + response.message);
  });
}

export function deactiveUser (userId, token) {
  return fetch(`${BASE_URL}/user/deactivate/${userId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error al desactivar usuario: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    //console.log("usuario desactivado correctamente: " + response.message);
  });
}

//sysadmin endpoints
export function grantAdminRole (userId, token) {
  return fetch(`${BASE_URL}/user/grantAdminRole/${userId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error al otorgar admin rol a usuario: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    //console.log("rol otorgado correctamente: " + response.message);
  });
}

export function revokeAdminRole (userId, token) {
  return fetch(`${BASE_URL}/user/revokeAdminRole/${userId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error al revocar admin rol a usuario: ' + response.statusText);
    }

    return response.json();
  }).then(response => {
    //console.log("rol revocado correctamente: " + response.message);
  });
}


