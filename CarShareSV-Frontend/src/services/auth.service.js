
const BASE_URL = import.meta.env.VITE_API_URL;

export function register ({ firstName, lastName, username, birthdate, email, phoneNumber, password }) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
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
      throw new Error('Error en el registro');
    }

    return response.json();
  }).then(response => {
    const { message } =  response;
    console.log("API RESPONSE: ", message);

    return message;
  });
}