import { useState, useCallback } from "react";
import { fetchVisibleCars, fetchUserCars, fetchCarById } from "../services/car.service";

export default function useCars() {
  const [cars, setCars] = useState([]);
  const [userCars, setUserCars] = useState([]);

  const [loading, setLoading] = useState(false);

  const getVisibleCars = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCars = await fetchVisibleCars();
      //console.log("Fetched Cars:", fetchedCars);
      setCars(fetchedCars);
    } catch (error) {
      console.error("Error fetching visible cars:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserCars = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedUserCars = await fetchUserCars();
      setUserCars(fetchedUserCars);
    } catch (error) {
      console.error("Error fetching user cars:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    cars,
    userCars,
    loading,
    getVisibleCars,
    getUserCars,
  };
}