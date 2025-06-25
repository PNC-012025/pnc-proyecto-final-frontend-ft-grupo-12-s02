import { useState, useCallback } from "react";
import { fetchVisibleCars } from "../services/car.service";

export default function useCars() {
  const [cars, setCars] = useState([]);

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

  return {
    cars,
    loading,
    getVisibleCars
  };
}