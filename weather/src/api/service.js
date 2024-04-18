import axios from "axios";

const key = '261e4e55f5154c3b901161358241704';

export const fetchData = async (city) => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${key}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};
