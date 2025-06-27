import { useState, useCallback, useContext } from "react";
import { fetchVisibleCars, fetchUserCars } from "../services/car.service";
import Context from "../context/UserContext";

export default function useCars() {
  const [cars, setCars] = useState([]);
  const [userCars, setUserCars] = useState([]);
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const getVisibleCars = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCars = await fetchVisibleCars();
      setCars(fetchedCars);
    } catch (error) {
      console.error("Error fetching visible cars:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserCars = useCallback(async () => {
    try {
      console.log("Fetching user cars for userId:", user.userId);
      setLoading(true);
      console.log("useCars - user:", user.userId);
      const fetchedUserCars = await fetchUserCars(user.userId);
      setUserCars(fetchedUserCars);
    } catch (error) {
      console.error("Error fetching user cars:", error);
    } finally {
      setLoading(false);
    }
  }, [user.userId]);


  return {
    cars,
    userCars,
    loading,
    getVisibleCars,
    getUserCars,
    setUserCars
  };
}