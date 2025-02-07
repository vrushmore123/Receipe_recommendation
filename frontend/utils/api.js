import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUsers = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed.";
    throw new Error(message);
  }
};
export const LoginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("Token", response.data.token);
    return response.data; // Return the response data if login is successful
  } catch (error) {
    // Handle error and rethrow to handle it in the calling function
    if (error.response) {
      // The request was made, and the server responded with a status code outside 2xx
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      // The request was made, but no response was received
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || "An error occurred during login.");
    }
  }
};
