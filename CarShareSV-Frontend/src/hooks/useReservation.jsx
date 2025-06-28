import { useCallback, useState, useContext } from "react";
import Context from "../context/UserContext";
import { postReservation, fetchAllCarReservedDates } from "../services/reservation.service";

export default function useReservation() {
  const { token } = useContext(Context);
  const [carReservedDates, setCarReservedDates] = useState([]);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const createReservation = useCallback(({
    startDate,
    endDate,
    address,
    carPlateNumber
  }) => {
    setState({ loading: true, error: false });

    console.log("ttoken: ", token);

    postReservation({
      startDate,
      endDate,
      address,
      carPlateNumber
    }, token)
      .then(() => {
        setState({ loading: false, error: false });
      })
      .catch(error => {
        console.error("Error creating reservation:", error);
        setState({ loading: false, error: true });
      });
  }, [token]);

  const getCarReservedDates = useCallback(async (carId) => {
    try {
      setState({ loading: true, error: false });

      const dates = await fetchAllCarReservedDates(carId);
      setCarReservedDates(dates);

      setState({ loading: false, error: false });
    } catch (error) {
      console.error("Error fetching reserved dates:", error);
      setState({ loading: false, error: true });
    }
  }, []);

  return {
    createReservation,
    getCarReservedDates,
    reservedDates: carReservedDates,
    isLoading: state.loading,
    hasError: state.error
  };
}