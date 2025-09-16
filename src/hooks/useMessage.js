import { useState, useCallback } from "react";
import { apiMethods } from "../lib/apiClient";

const useMessage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendMessage = useCallback(async (messageData) => {
    if (!messageData?.message?.trim()) {
      setError({
        message: 'Message content is required',
        canRetry: false
      });
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log(messageData)
    
    try {
      const response = await apiMethods.post("/messages", {
        message: messageData.message.trim(),
        name: messageData.name?.trim() || 'Anonymous',
        email: messageData.email?.trim() || '',
        subject: messageData.subject?.trim() || 'No Subject'
      });
      
      const responseMessage = response.data?.message || 'Message sent successfully';
      setMessage(responseMessage);
      setSuccess(true);
      
      console.log('📧 Message sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      setError({
        message: error.userMessage || 'Failed to send message',
        canRetry: true,
        originalError: error
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessage = useCallback(() => {
    setMessage("");
    setError(null);
    setSuccess(false);
  }, []);

  const retry = useCallback((messageData) => {
    return sendMessage(messageData);
  }, [sendMessage]);

  return {
    message,
    error,
    loading,
    success,
    sendMessage,
    clearMessage,
    retry
  };
};

export default useMessage;