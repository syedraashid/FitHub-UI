<template>
  <div class="min-h-screen bg-black-900 text-white p-6 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1');">
    <div class="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
      
      <h2 class="text-3xl font-bold mb-6 text-center">Profile Details</h2>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Info -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Full Name</label>
          <input v-model="Fullname" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Phone</label>
          <input v-model="phone" type="tel" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Date of Birth</label>
          <input v-model="DateOfBirth" type="date" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <!-- Physical Info -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Height (cm)</label>
          <input v-model="Height" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Weight (kg)</label>
          <input v-model="weight" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <!-- Role Dropdown -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Role</label>
          <select v-model="role " class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600">
            <option>Member</option>
            <option>Trainer</option>
            <option>Nutritionist</option>
          </select>
        </div>

        <div v-if="role == 'Trainer' || role == 'Nutritionist'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Year Of Exprience</label>
          <input v-model="YearOfExprience" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <div v-if="role == 'Nutritionist'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Qualification</label>
          <input v-model="Qualification" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <div v-if="role == 'Trainer'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">specialization</label>
          <input v-model="specialization" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <div v-if="role == 'Member'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Goal</label>
          <select v-model="Purpose" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600">
            <option>WeightLoss</option>
            <option>Endurance</option>
            <option>Strength</option>
            <option>Flexibility</option>
            <option>Maintenance</option>
            <option>GeneralHealth</option>
            <option>MuscleGain</option>
          </select>
        </div>

        <!-- Certifications -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Certifications</label>
          <input v-model="Certifications" type="text" placeholder="e.g., ACE, NASM" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <!-- Address -->
        <div class="col-span-2">
          <label class="block mb-1 font-semibold">Address</label>
          <textarea v-model="Address" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"></textarea>
        </div>

        <!-- Profile Pic Upload -->
        <div class="col-span-2">
          <label class="block mb-1 font-semibold">Profile Picture</label>
          <div class="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white flex items-center justify-between">
            <input type="file" class="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-600" />
          </div>
        </div>
        <div class="col-span-2 flex justify-center mt-4">
        <button
          class="inline-block cursor-pointer uppercase bg-white text-black font-semibold px-4 py-2 rounded-md active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition"
        >
          Begin Journey!
        </button>
      </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const Fullname = ref("")
const phone = ref(null)
const DateOfBirth = ref(null)
const weight = ref(null)
const Height = ref(null)
const Certifications = ref("")
const Address = ref("")
const Purpose = ref("")
const Qualification = ref("")
const YearOfExprience = ref(null)
const specialization = ref("")
const role = ref("")
const Goal = ref("")
</script>

<style scoped>
</style>