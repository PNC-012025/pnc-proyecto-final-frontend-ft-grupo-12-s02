import { useCallback, useState, useContext } from "react";
import { postCar } from "../services/car.service";
import Context from "../context/UserContext";

export default function useManageCars() {
  const { token } = useContext(Context);
  const [state, setState] = useState({
    loading: false,
    error: false
  });
  

  const uploadCar = useCallback(({
    doors,
    capacity,
    dailyPrice,
    plateNumber,
    description,
    location,
    year,
    model,
    brand,
    transmission,
    images
  }) => {
    setState({ loading: true, error: false });

    postCar({
      doors,
      capacity,
      dailyPrice,
      plateNumber,
      description,
      location,
      year,
      model,
      brand,
      transmission,
      images
    }, token)
      .then(() => {
        setState({ loading: false, error: false });
      })
      .catch(error => {
        console.error("Error uploading car:", error);
        setState({ loading: false, error: true });
      });
  }, [token]);

  return {
    uploadCar,
    isLoading: state.loading,
    hasError: state.error
  };
}