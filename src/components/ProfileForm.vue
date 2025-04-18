<template>
  <div class="min-h-screen bg-black-900 text-white p-6 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1');">
    <div class="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
      
      <h2 class="text-3xl font-bold mb-6 text-center">Profile Details</h2>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Info -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Full Name</label>
          <input v-model="Fullname" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
          <p v-if="formErrors.Fullname" class="text-red-500 text-sm mt-1">{{ formErrors.Fullname }}</p>
        </div>
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Age</label>
          <input v-model="Age" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
          <p v-if="formErrors.Age" class="text-red-500 text-sm mt-1">{{ formErrors.Age }}</p>
        </div>

        <!-- Physical Info -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Height (cm)</label>
          <input v-model="Height" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
          <p v-if="formErrors.Height" class="text-red-500 text-sm mt-1">{{ formErrors.Height }}</p>
        </div>
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Weight (kg)</label>
          <input v-model="weight" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
          <p v-if="formErrors.weight" class="text-red-500 text-sm mt-1">{{ formErrors.weight }}</p>
        </div>

        <!-- Role Dropdown -->
        <div class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Role</label>
          <p v-if="formErrors.role" class="text-red-500 text-sm mt-1">{{ formErrors.role }}</p>
          <select v-model="role " class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600">
            <option>Member</option>
            <option>Trainer</option>
            <option>Nutritionist</option>
          </select>
        </div>

        <div v-if="role == 'Trainer' || role == 'Nutritionist'" class="col-span-2 md:col-span-1">
          <p v-if="formErrors.YearOfExprience" class="text-red-500 text-sm mt-1">{{ formErrors.YearOfExprience }}</p>
          <label class="block mb-1 font-semibold">Year Of Exprience</label>
          <input v-model="YearOfExprience" type="number" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
        </div>

        <div v-if="role == 'Nutritionist'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Qualification</label>
          <input v-model="Qualification" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
          <p v-if="formErrors.Qualification" class="text-red-500 text-sm mt-1">{{ formErrors.Qualification }}</p>
        </div>

        <div v-if="role == 'Trainer'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">specialization</label>
          <input v-model="specialization" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600" />
          <p v-if="formErrors.specialization" class="text-red-500 text-sm mt-1">{{ formErrors.specialization }}</p>
        </div>

        <div v-if="role == 'Member'" class="col-span-2 md:col-span-1">
          <label class="block mb-1 font-semibold">Goal</label>
          <p v-if="formErrors.Purpose" class="text-red-500 text-sm mt-1">{{ formErrors.Purpose }}</p>
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
        <div v-if="role == 'Trainer' || role == 'Nutritionist'" class="col-span-2">
          <label class="block mb-1 font-semibold">Certification</label>
          <p v-if="formErrors.file" class="text-red-500 text-sm mt-1">{{ formErrors.file }}</p>
          <div class="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white flex items-center justify-between">
            <input @change="HandleFileChange" type="file" class="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-600" />
          </div>
        </div>
        <div class="col-span-2 flex justify-center mt-4">
        <button @click="HandleSubmit"
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
import { ref,watch } from 'vue';
import { authStore } from '../stores/authStore';

const store = authStore();
const user = store.currentUser;
const Fullname = ref("")
const Age = ref(null)
const weight = ref(null)
const Height = ref(null)
const Certifications = ref(null)
const Purpose = ref("")
const Qualification = ref("")
const YearOfExprience = ref(null)
const specialization = ref("")
const role = ref("")
const formErrors = ref({
      Fullname: '',
      Age: '',
      Height: '',
      weight: '',
      role: '',
      YearOfExprience: '',
      Qualification: '',
      specialization: '',
      Purpose: '',
      file: ''
    });

const HandleFileChange = async (event) => {
  const file = event.target.files?.[0];
 if(file){
  Certifications.value = await toBase64(file);
 }
}

const toBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
  })
}

const HandleSubmit = async () =>{
  event.preventDefault();
  
  for (const key in formErrors.value) {
    formErrors.value[key] = '';
  } 

    if (!Fullname.value) formErrors.value.Fullname = "Full name is required.";
    if (!Age.value) formErrors.value.Age = "Age is required.";
    if (!Height.value) formErrors.value.Height = "Height is required.";
    if (!weight.value) formErrors.value.weight = "Weight is required.";
    if (!role.value) formErrors.value.role = "Role is required.";

    if (role.value === 'Trainer' || role.value === 'Nutritionist') {
      if (!YearOfExprience.value) formErrors.value.YearOfExprience = "Experience is required.";
      if (!Certifications.value) formErrors.value.file = "Certification file is required.";
    }

    if (role.value === 'Trainer') {
      if (!specialization.value) formErrors.value.specialization = "Specialization is required.";
    }

    if (role.value === 'Nutritionist') {
      if (!Qualification.value) formErrors.value.Qualification = "Qualification is required.";
    }

    if (role.value === 'Member') {
      if (!Purpose.value) formErrors.value.Purpose = "Goal is required.";
    }

    for (const key in formErrors.value) {
      if (formErrors.value[key]) {
        return;
      }
   }
   console.log(JSON.parse(user).email);
  const Data = {
    Email: JSON.parse(user).email,
    FullName:Fullname.value,
    Age:Age.value,
    Weight:weight.value,
    Height:Height.value,
    Goal:Purpose.value,
    Role:role.value,
    Certification:Certifications.value,
    Qualifications:Qualification.value,
    YearsOfExperience:YearOfExprience.value,
    Specialization:specialization.value
  }
  console.log(Data);
  console.log(Data.Email);
  await store.ProfileSetup(Data);
}
</script>


<style scoped>
</style>