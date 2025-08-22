import axios from "axios";

const API_URL = "http://127.0.0.1:5000/predict";  

export const predictReadmission = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error making prediction:", error);
        throw error; // Propagate the error to be handled by the component
    }
};
