<template>
  
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Loading } from "quasar";

const router = useRouter();

onMounted(async () => {
  Loading.show();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      const response = await axios.post("http://localhost:8000/user/google-login", { code });
      localStorage.setItem("accessToken", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      router.push("/Home");
    } catch (error) {
      console.error("Google authentication failed", error);
    }
    finally{
      Loading.hide();
    }
  }
});
</script>