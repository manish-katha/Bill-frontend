import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

// Function to fetch all bills
export const getBills = async (phone='') => {
  try {
    const response = await axios.get(`${API_URL}/tasks/gettask`, {

        params: { phone }, // Sending 'days' as a query parameter
      
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bills", error);
    throw error;
  }
};

export const getBillbyid = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/gettask/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bills", error);
    throw error;
  }
};



// Function to create a new bill
export const createBill = async (billData) => {
  try {
    console.log("billdata",billData);
    const response = await axios.post(`${API_URL}/tasks/new`, billData, {
      withCredentials: true,
    });
    console.log("billdatarespone",response);

    return response.data;
  } catch (error) {
    console.error("Error creating bill", error);
    throw error;
  }
};
