import axios from 'axios';
import router from '../router/router';

const Api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
})

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accesstoken");
    if(token){
        config.headers.Authorization =  `Bearer ${token}`
    }
    return config;
},
(error)=>{
    return Promise.reject(error)
}
);

Api.interceptors.response.use((response) => response ,
     async(error) => {
   const originalUrl = error.config;
   if(error.response.status === '401' && !originalUrl.retry){
    originalUrl.retry = true;   
    try{
        const refreshToken = localStorage.getItem('Refreshtoken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        localStorage.setItem('accesstoken', response.data.access_token);
        localStorage.setItem('Refreshtoken', response.data.refresh_token);
        
        originalUrl.headers.Authorization = `Bearer ${response.data.access_token}`;
        return Api(originalUrl);
        }
        catch(refresh_error){
            localStorage.removeItem('acccesstoken');
            localStorage.removeItem('Refreshtoken');
            router.push("/Login");
            return Promise.reject(refresh_error);
        }
    }
        return Promise.reject(error);
    }
)


export default Api;