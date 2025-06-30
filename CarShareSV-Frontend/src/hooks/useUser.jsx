import { useCallback, useContext, useEffect, useState } from "react";
import Context from "../context/UserContext";
import { login as loginService, getUser, 
  getAllUsers as getAllUsersService, 
  activeUser as activateUserService, 
  deactiveUser as deactivateUserService, 
  grantAdminRole as grantAdminRoleService, 
  revokeAdminRole as revokeAdminRoleService } from "../services/auth.service";

export default function useUser() {
  const { token, setToken, user, setUser } = useContext(Context);
  const [allUsers, setAllUsers] = useState([]);
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
    //console.log("useUser - user:", user);
  }, [token, setUser]);

 const login = useCallback(async ({ username, password }) => {
  setState({ loading: true, error: false });

  try {
    const token = await loginService({ username, password });
    window.sessionStorage.setItem("token", token);
    setToken(token);
    setState({ loading: false, error: false });
    return token;
  } catch (err) {
    window.sessionStorage.removeItem("token");
    setState({ loading: false, error: true });
    console.error(err);
    throw err;
  }
  }, [setToken]);

  
  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    setToken(null);
    setUser({});
  }, [setToken, setUser]); 
  
  //ADMIN FUNCTIONS:
  const getAllUsers = useCallback(async () => {
    try {
      setState({ loading: true, error: false });
      const fetchedUsers = await getAllUsersService();
      setAllUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching all users: ", error);
      setState({ loading: false, error: true });
    } finally {
      setState({ loading: false, error: false });
    }
  }, []);

    const activateUser = useCallback((userId) => {
      setState({ loading: true, error: false });
      
      activateUserService(userId, token)
        .then(() => {
          setState({ loading: false, error: false });
          //console.log(`User activated`);
        })
        .catch(error => {
          setState({ loading: false, error: true });
          console.error("Error activating user: ", error);
        });
    }, [token]);

    const deactivateUser = useCallback((userId) => {
      setState({ loading: true, error: false });
      
      deactivateUserService(userId, token)
        .then(() => {
          setState({ loading: false, error: false });
          //console.log(`User deactivated`);
        })
        .catch(error => {
          setState({ loading: false, error: true });
          console.error("Error deactivating user: ", error);
        });
    }, [token]);

    //SYSADMIN FUNCTIONS

    const grantAdminRole = useCallback((userId) => {
      setState({ loading: true, error: false });
      
      grantAdminRoleService(userId, token)
        .then(() => {
          setState({ loading: false, error: false });
          //console.log(`granted admin role to user`);
        })
        .catch(error => {
          setState({ loading: false, error: true });
          console.error("Error granting admin role to user: ", error);
        });
    }, [token]);

    
    const revokeAdminRole = useCallback((userId) => {
      setState({ loading: true, error: false });
      
      revokeAdminRoleService(userId, token)
        .then(() => {
          setState({ loading: false, error: false });
          //console.log(`Revoked admin role to user`);
        })
        .catch(error => {
          setState({ loading: false, error: true });
          console.error("Error revoking admin role to user: ", error);
        });
    }, [token]);


  return {
    isLogged: Boolean(token),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    getAllUsers,
    activateUser,
    deactivateUser,
    grantAdminRole,
    revokeAdminRole,
    allUsers,
    user
  };
}