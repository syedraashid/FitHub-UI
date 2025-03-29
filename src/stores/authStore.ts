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
            localStorage.setItem('accesstoken', response.data.access_token);
            localStorage.setItem('Refreshtoken', response.data.refresh_token);
            
            this.user = response.data.user;
            this.isAuthenticated = true;
            
            return response;
            },
        async Register(Logincred:LoginCredential) {
            const response = await authServices.register(Logincred);
            localStorage.setItem('accesstoken', response.data.access_token);
            localStorage.setItem('Refreshtoken', response.data.refresh_token);
            
            this.user = response.data.user;
            this.isAuthenticated = true;
            
            return response;
            },
        async Logout() {
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('Refreshtoken');
            this.isAuthenticated = false;
            this.user = null;
        }
    },

    getters:{
        currentUser: (state) => state.user,
    }

})

