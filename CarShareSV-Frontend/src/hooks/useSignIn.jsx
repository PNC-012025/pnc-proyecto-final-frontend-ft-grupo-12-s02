import { useState } from "react";
import { register } from "../services/auth.service";
import useUser from "./useUser";

export default function useSignIn() {
  const { isLogged, isLoginLoading, hasLoginError, login, user } = useUser();
  
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const registerUser = async ({
    firstName,
    lastName,
    username,
    birthdate,
    email,
    phoneNumber,
    password
  }) => {
    setState({ loading: true, error: false });
try {
    register({
      firstName,
      lastName,
      username,
      birthdate,
      email,
      phoneNumber,
      password
    });
    await new Promise (res => setTimeout(res, 500));
    await login({username, password});
    setState({loading : false, error: false});
    return true;
  } catch(error){
    setState({loading : false, error: true});
    console.error("Error en el registro:", error);
    throw error;
  }
    //.then(() => {
      //setState({ loading: false, error: false });
    //}).catch((error) => {
      //setState({ loading: false, error: true });
      //console.error("Error en el registro:", error);
    //});
  };

  return { 
    isLoading: state.loading,
    hasError: state.error,
    registerUser,
    isLogged
  };
}