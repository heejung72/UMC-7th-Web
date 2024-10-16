import axios from 'axios';
const axiosInstance = axios.create({
    headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APL_URL}`,
          },
          baseURL : import.meta.env.VITE_MOVIE_ARI_URL,
})
export {axiosInstance}