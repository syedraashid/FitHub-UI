import axios from 'axios';
import router from '../router/router';

const Api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
})

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
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
   console.log(error.response.status,"sts");
   console.log(error.response.request.status,"sstsre");
   if(error.response.status == '401' && !originalUrl.retry){
    originalUrl.retry = true;   
    try{
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8000/User/Refresh', JSON.stringify(refreshToken), {
            headers:{
                'Content-Type':'application/json'
            }
        });
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
        
        originalUrl.headers.Authorization = `Bearer ${response.data.access_token}`;
        return Api(originalUrl);
        }
        catch(refresh_error){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push("/");
            return Promise.reject(refresh_error);
        }
    }
        return Promise.reject(error);
    }
)


export default Api;