import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

// API call for user signup
export const signup = async (userData) => {
  try {
    console.log(API_URL)
    const response = await axios.post(`${API_URL}/users/new`, userData,  {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// API call for user login
export const login = async (credentials) => {
  try {
    console.log(API_URL)

    const response = await axios.post(`${API_URL}/users/login`, credentials,  {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("response",response)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const logout = async () => {
  try {
    console.log(API_URL)

    const response = await axios.get(`${API_URL}/users/logout`,  {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("response",response)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};