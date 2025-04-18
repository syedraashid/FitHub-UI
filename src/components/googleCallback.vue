<template>
 <HealthSpinner/>
</template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import Api from "../Services/axios";
 import { onMounted } from "vue";
 import HealthSpinner from "./HealthSpinner.vue";
  
  onMounted(async () =>{
    const router = useRouter();
      const urlParams = new URLSearchParams(window.location.search);
      const Code = urlParams.get("code"); // Extract Google auth code
  
      if (Code) {
        try {
          const response = await Api.post("/User/Google-Login", { code:Code });
  
          const { user , accessToken, refreshToken} = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user.isProfileSetupComplete)
          if(user?.isProfileSetupComplete){
                router.push("/dashboard");
                return response;
            }
            router.push("/CompleteProfileSetup");
            return;
        } catch (error) {
          console.error("Google Login Failed", error);
          router.push("/"); // Redirect back if login fails
        }
      } else {
        router.push("/"); // Redirect back if no code is present
      }
  });
  </script>
