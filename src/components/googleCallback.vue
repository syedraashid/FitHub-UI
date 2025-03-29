<template>
    <div>Logging you in...</div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import Api from "../Services/axios";
 import { onMounted } from "vue";
  
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
  
  
          router.push("/dashboard"); // Redirect to dashboard after login
        } catch (error) {
          console.error("Google Login Failed", error);
          router.push("/"); // Redirect back if login fails
        }
      } else {
        router.push("/"); // Redirect back if no code is present
      }
  });
  </script>
  