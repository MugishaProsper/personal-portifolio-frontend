import { useEffect, useState } from "react"
import apiClient from "../lib/apiClient";

const useTestimonials = () => {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get("/testimonials");
        const testimonials = res.data.testimonials;
        setTestimonials(testimonials)
      } catch (error) {
        setError(error);
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, []);

  return { loading, error, testimonials }
};

export default useTestimonials
