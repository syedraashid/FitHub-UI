<script lang="ts" setup>
import { ref} from "vue";
// Background image
const backgroundImage =
  "https://public.readdy.ai/ai/img_res/901168aa2f895fc6c3fca2d01f40ea75.jpg";
// Login state
const isLoggedIn = ref(false);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const socialProviders = [
  { name: "Google", icon: "fab fa-google" },
  { name: "Facebook", icon: "fab fa-facebook-f" },
  { name: "Apple", icon: "fab fa-apple" },
];
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const handleLogin = () => {
  if (email.value && password.value) {
    isLoggedIn.value = true;
  }
};
const socialLogin = (provider: string) => {
  console.log(`Logging in with ${provider}`);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Login Page -->
    <div
      v-if="!isLoggedIn"
      class="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div class="absolute inset-0 z-0">
        <img
          :src="backgroundImage"
          alt="Fitness Background"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div
        class="bg-gray-900/95 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-[420px] z-10 border border-gray-700"
      >
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2 font-['Orbitron']">
            FitHub
          </h1>
          <p class="text-gray-400">Push Your Limits. Break Barriers.</p>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <input
              type="email"
              v-model="email"
              placeholder="Email address"
              class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="rememberMe"
                class="rounded bg-gray-800 border-gray-700 text-red-500"
              />
              <span class="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <a href="#" class="text-sm text-red-500 hover:text-red-400"
              >Forgot Password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors !rounded-button font-bold tracking-wider"
          >
            POWER UP
          </button>
        </form>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-900 text-gray-400"
                >Or continue with</span
              >
            </div>
          </div>
          <div class="mt-6 grid grid-cols-3 gap-3">
            <button
              v-for="(provider, index) in socialProviders"
              :key="index"
              @click="socialLogin(provider.name)"
              class="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors !rounded-button text-gray-400 hover:text-white"
            >
              <i :class="provider.icon" class="text-xl"></i>
            </button>
          </div>
        </div>
        <p class="mt-6 text-center text-sm text-gray-400">
          Ready to start your journey?
          <a href="#" class="text-red-500 hover:text-red-400 font-bold"
            >Join the elite</a
          >
        </p>
      </div>
    </div>
  </div>
  <router-view>

  </router-view>
</template>

<style scoped>

</style>