import { defineStore } from "pinia";
import authServices from "../Services/EndpointServices/authServices";
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
interface ProfileSetup{
    Email:string,
    FullName:string
    Age:number,
    Weight:number,
    Height:number,
    Goal:string,
    Role:string,
    Certification:string,
    Qualifications:string,
    YearsOfExperience:number,
    Specialization:string
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
            console.log(this.user?.isProfileSetupComplete);
            if(this.user?.isProfileSetupComplete){
                router.push("/dashboard");
                return response;
            }
               router.push("/CompleteProfileSetup");
               return;
            },
        async Register(signupcred:SignUpCredential) {
            const response = await authServices.register(signupcred);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.accessToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            
            this.user = response.user;
            this.isAuthenticated = true;
            router.push("/CompleteProfileSetup");
            return response;
            },
        async Logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem("user");
            this.isAuthenticated = false;
            this.user = null;
        },
        async ProfileSetup(profile:ProfileSetup) {
            const response = await authServices.ProfileSetupComplete(profile);
            if(response.includes("Success")){
                localStorage.setItem('Role', profile.Role);
                router.push("/dashboard");
                return;
            }
            router.push("/");
        }
    },
    getters:{
        currentUser: () => {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        },
        getAuthStatus : (state) => state.isAuthenticated
    }

})

