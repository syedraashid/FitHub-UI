import { defineStore } from "pinia";
import authServices from "../Services/authServices";

interface LoginCredential{
    Email:string,
    Password:string
}

export const authStore = defineStore('auth', {
    state: ()=> ({
        user:null,
        isAuthenticated : false,
    }),
    actions: {
        async Login(Logincred:LoginCredential) {
            const response = await authServices.LoginEndpoint(Logincred);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            
            this.user = response.data.user;
            this.isAuthenticated = true;
            
            return response;
            },
        async Register(Logincred:LoginCredential) {
            const response = await authServices.register(Logincred);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            
            this.user = response.data.user;
            this.isAuthenticated = true;
            
            return response;
            },
        async Logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.isAuthenticated = false;
            this.user = null;
        }
    },
    getters:{
        currentUser: (state) => state.user,
        isAuthenticated : (state) => state.isAuthenticated
    }

})

