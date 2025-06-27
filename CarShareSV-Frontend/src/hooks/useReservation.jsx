import { useCallback, useState, useContext } from "react";
import Context from "../context/UserContext";
import { postReservation } from "../services/reservation.service";

export default function useReservation() {
  const { token } = useContext(Context);
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

  return {
    createReservation,
    isLoading: state.loading,
    hasError: state.error
  };
}