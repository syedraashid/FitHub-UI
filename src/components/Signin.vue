<template>
  <form @submit.prevent="handleSignin" class="space-y-4">
         <div>
            <input
              type="text"
              v-model="Credential.Username"
              placeholder="User Name"
              class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <p v-if="errors.Username" class="text-red-500 text-sm mt-1">{{ errors.Username }}</p>
          </div>
          <div>
              <input
                type="email"
                v-model="Credential.Email"
                placeholder="Email address"
                class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <p v-if="errors.Email" class="text-red-500 text-sm mt-1">{{ errors.Email }}</p>
            </div>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="Credential.Password"
                placeholder="Password"
                class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500"
              >
                <font-awesome-icon 
                  :icon="showPassword ? 'eye' : 'eye-slash'" 
                  class="h-5 w-5"
                />
              </button>
              <p v-if="errors.Password" class="text-red-500 text-sm mt-1">{{ errors.Password }}</p>
            </div>
            <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500"
            >
              <font-awesome-icon 
                :icon="showConfirmPassword ? 'eye' : 'eye-slash'" 
                class="h-5 w-5"
              />
            </button>
            <p v-if="errors.Password" class="text-red-500 text-sm mt-1">{{ errors.Password }}</p>
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
import { authStore } from "../stores/authStore";
// Signin state
const Credential = ref({
  Username:"",
  Email:"",
  Password:""
})
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const confirmPassword = ref("");
const auth = authStore();

const errors = ref({
  Username:'',
  Email: '',
  Password: ''
})

const validateForm = () => {
  let valid = true
  errors.value.Username = ''
  errors.value.Email = ''
  errors.value.Password = ''

  if (!Credential.value.Email) {
    errors.value.Email = 'Email is required'
    valid = false
  } else if (!/^\S+@\S+\.\S+$/.test(Credential.value.Email)) {
    errors.value.Email = 'Invalid email address'
    valid = false
  }
  
  if (!confirmPassword.value) {
    errors.value.Password = 'Confirm Password is required'
    valid = false
  }

  if (!Credential.value.Username) {
    errors.value.Email = 'UserName is required'
    valid = false
  }

  if (!Credential.value.Password) {
    errors.value.Password = 'Password is required'
    valid = false
  }else if(Credential.value.Password !== confirmPassword.value){
    errors.value.Password = 'Password not matched with Confirm Password'
    valid = false
  }

  return valid
}

const handleSignin = () => {
  if (!validateForm()) return
    auth.Register({
      Username:Credential.value.Username,
      Email:Credential.value.Email,
      Password: Credential.value.Password,
    })
};

</script>