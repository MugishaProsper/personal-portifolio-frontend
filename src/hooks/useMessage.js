import { useState } from "react";
import api from "../lib/api";

const useMessage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await api.post("/messages", { message });
      const response = res.data.message;
      setMessage(response);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return { message, error, loading, sendMessage };
}

export default useMessage;