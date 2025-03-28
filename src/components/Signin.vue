<template>
 <form @submit.prevent="handleSignin" class="space-y-4">
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
                placeholder="Enter Password"
                class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <button
                  type="button"
                  @click="() => showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500"
                >
                  <font-awesome-icon 
                    :icon="showPassword ? 'eye' : 'eye-slash'" 
                    class="h-5 w-5"
                  />
                </button>
            </div>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Re Enter Password"
                class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <button
                  type="button"
                  @click="() => showConfirmPassword = !showConfirmPassword "
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500"
                >
                  <font-awesome-icon 
                    :icon="showConfirmPassword ? 'eye' : 'eye-slash'" 
                    class="h-5 w-5"
                  />
                </button>
            </div>
          <button
            class="w-full pt-3 pb-3 cursor-pointer text-white font-semibold flex justify-center items-center  gap-2 items-center bg-black px-4 py-2 rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group"
          >
            SIGN IN
          </button>

        </form>
</template>

<script lang="ts" setup>
import { ref} from "vue";

// Signin state
const isLoggedIn = ref(false);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const confirmPassword = ref("");

const handleSignin = () => {
  if (email.value && password.value) {
    isLoggedIn.value = true;
  }
};

</script>