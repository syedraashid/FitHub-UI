import { defineStore } from "pinia";
import authServices from "../Services/authServices";
import router from "../router/router";

interface LoginCredential{
    Email:string,
    Password:string
}
interface SignUpCredential{
    Username:string
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
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            this.user = response.user;
            this.isAuthenticated = true;
            
            router.push("/dashboard");
            return response;
            },
        async Register(signupcred:SignUpCredential) {
            const response = await authServices.register(signupcred);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.accessToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            
            this.user = response.user;
            this.isAuthenticated = true;
            router.push("/dashboard");
            return response;
            },
        async Logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem("user");
            this.isAuthenticated = false;
            this.user = null;
        }
    },
    getters:{
        currentUser: (state) => state.user,
        getAuthStatus : (state) => state.isAuthenticated
    }

})

