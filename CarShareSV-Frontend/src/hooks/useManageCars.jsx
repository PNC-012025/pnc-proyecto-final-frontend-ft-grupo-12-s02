import { useCallback, useState, useContext } from "react";
import { postCar, setCarVisibility, deleteCar as deleteCarService } from "../services/car.service";
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

  const changeVisibility = useCallback((carId, visible) => {
    setState({ loading: true, error: false });

    setCarVisibility(carId, visible, token)
      .then(() => {
        setState({ loading: false, error: false });
        console.log(`Car visibility changed to ${visible} for carId: ${carId}`);
      })
      .catch(error => {
        setState({ loading: false, error: true });
        console.error("Error changing car visibility:", error);
      });
  }, [token]);

  const deleteCar = useCallback((carId) => {
    setState({ loading: true, error: false });

    deleteCarService(carId, token)
      .then(() => {
        setState({ loading: false, error: false });
        console.log(`Car with ID ${carId} deleted successfully`);
      })
      .catch(error => {
        setState({ loading: false, error: true });
        console.error("Error changing car visibility:", error);
      });
  }, [token]);

  return {
    uploadCar,
    changeVisibility,
    deleteCar,
    isLoading: state.loading,
    hasError: state.error
  };
}