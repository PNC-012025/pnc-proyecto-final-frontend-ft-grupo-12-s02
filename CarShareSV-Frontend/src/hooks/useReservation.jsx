import { useCallback, useState, useContext } from "react";
import Context from "../context/UserContext";
import { postReservation, fetchAllCarReservedDates, fetchAllCarReservations, fetchAllUserReservations, cancelReservation as cancelReservationService } from "../services/reservation.service";

export default function useReservation() {
  const { token } = useContext(Context);
  const [carReservedDates, setCarReservedDates] = useState([]);
  const [carReservations, setCarReservations] = useState([]);
  const [userReservations, setUserReservations] = useState([]);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const createReservation = useCallback(async ({
    startDate,
    endDate,
    address,
    carPlateNumber
  }) => {
    setState({ loading: true, error: false });

    try {
      const apiResponse = await postReservation({
        startDate,
        endDate,
        address,
        carPlateNumber
      }, token);
      setState({ loading: false, error: false });
      return { success: true, apiResponse };
    } catch (error) {
      console.error("Error creating reservation:", error);
      setState({ loading: false, error: true });
      return { success: false, error };
    }
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

  const getCarReservations = useCallback(async (carId) => {
    try {
      setState({ loading: true, error: false });

      const reservations = await fetchAllCarReservations(carId);
      setCarReservations(reservations);

      setState({ loading: false, error: false });
    } catch (error) {
      console.error("Error fetching car reservations: ", error);
      setState({ loading: false, error: true });
    }
  }, []);

  const getUserReservations = useCallback(async (userId) => {
    try {
      setState({ loading: true, error: false });

      const reservations = await fetchAllUserReservations(userId);
      setUserReservations(reservations);

      setState({ loading: false, error: false });
    } catch (error) {
      console.error("Error fetching user reservations: ", error);
      setState({ loading: false, error: true });
    }
  }, []);

  const cancelReservation = useCallback((reservationId) => {
    setState({ loading: true, error: false });

    cancelReservationService(reservationId, token)
      .then(() => {
        setState({ loading: false, error: false });
      })
      .catch(error => {
        console.error("Error canceling reservation:", error);
        setState({ loading: false, error: true });
      });
  }, [token]);

  return {
    createReservation,
    getCarReservedDates,
    getCarReservations,
    getUserReservations,
    cancelReservation,
    userReservations,
    carReservations,
    reservedDates: carReservedDates,
    isLoading: state.loading,
    hasError: state.error
  };
}