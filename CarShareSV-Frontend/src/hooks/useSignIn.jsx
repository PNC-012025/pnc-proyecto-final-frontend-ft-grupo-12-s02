import { useState } from "react";
import { register } from "../services/auth.service";

export default function useSignIn() {
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const registerUser = ({
    firstName,
    lastName,
    username,
    birthdate,
    email,
    phoneNumber,
    password
  }) => {
    setState({ loading: true, error: false });

    register({
      firstName,
      lastName,
      username,
      birthdate,
      email,
      phoneNumber,
      password
    }).then(() => {
      setState({ loading: false, error: false });
    }).catch((error) => {
      setState({ loading: false, error: true });
      console.error("Error en el registro:", error);
    });
  };

  return { 
    isLoading: state.loading,
    hasError: state.error,
    registerUser
  };
}