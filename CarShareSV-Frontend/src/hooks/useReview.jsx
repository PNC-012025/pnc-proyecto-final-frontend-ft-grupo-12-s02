import { useState, useCallback, useContext } from 'react';
import Context from '../context/UserContext';
import { fetchAllCarReviews, postReview } from '../services/review.service';

export default function useReview() {
  const { token } = useContext(Context);
  const [carReviews, setCarReviews] = useState([]);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const createReview = useCallback(({
    comment,
    rating
  }, carId) => {
    setState({ loading: true, error: false });

    postReview({
      comment,
      rating
    }, carId, token)
    .then(() => {
      setState({ loading: false, error: false });
    })
    .catch(error => {
      console.error("Error creating review:", error);
      setState({ loading: false, error: true });
    });
  }, [token]);

  const getCarReviews = useCallback(async (carId) => {
    try {
      setState({ loading: true, error: false });

      const reviews = await fetchAllCarReviews(carId);
      setCarReviews(reviews);

      setState({ loading: false, error: false });
    } catch (error) {
      console.error("Error fetching car reviews:", error);
      setState({ loading: false, error: true });
    }
  }, []);

  return {
    createReview,
    getCarReviews,
    carReviews,
    isLoading: state.loading,
    hasError: state.error
  }
}