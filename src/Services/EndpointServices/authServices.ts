import Api from "../axios";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const responseType = "code";
const scope = "openid email profile";

export default {
    async LoginEndpoint(credential:any){
        try {
            const response = await Api.post("/User/Login", credential);
            return response.data;
          } catch (error) {
            console.log(error.response?.data?.message || "Login failed");
          }
    },
    async register(User:any){
        try {
            const response =  await Api.post("/User/SignUp",User);
             return response.data;
        } catch (error) {
            console.log(error.response?.data?.message || "Registration failed")
        }
       
    },
    async GoogleLogin(){
         window.location.href =`https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    },
    async ProfileSetupComplete(Profile:any){
        try {
            const response =  await Api.post("/User/CompleteProfileSetup",Profile);
             return response.data;
        } catch (error) {
            console.log(error.response?.data?.message || "Registration failed")
        }
    }

}