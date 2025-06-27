import { useCallback, useContext, useEffect, useState } from "react";
import Context from "../context/UserContext";
import { login as loginService, getUser } from "../services/auth.service";

export default function useUser() {
  const { token, setToken, user, setUser } = useContext(Context);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  useEffect(() => {
    const getUserFromApi = async() => {
      setUser(await getUser(token));
    }

    if(token) getUserFromApi();

    window.sessionStorage.setItem("user", user);
    console.log("useUser - user:", user);
  }, [token, setUser]);

  const login = useCallback(({ username, password }) => {
    setState({ loading: true, error: false });

    loginService({ username, password })
      .then(async (token) => {
        window.sessionStorage.setItem("token", token);
        setState({ loading: false, error: false });
        setToken(token); 
      })
      .catch(err => {
        window.sessionStorage.removeItem("token");
        setState({ loading: false, error: true });
        console.error(err);
      });
  }, [setToken]);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    setToken(null);
    setUser({});
  }, [setToken, setUser]); 

  return {
    isLogged: Boolean(token),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    user
  };
}