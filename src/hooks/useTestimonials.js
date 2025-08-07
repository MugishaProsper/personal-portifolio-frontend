import { useEffect, useState } from "react"
import api from "../lib/api"

const useTestimonials = () => {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true)
      try {
        const res = await api.get("/testimonials");
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
