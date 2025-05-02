<template>
  <div class="min-h-screen bg-[#121212] text-white">
    <!-- Header -->
    <header class="px-6 py-4 bg-[#1E1E1E] fixed w-full top-0 z-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div>
            <h1 class="text-xl font-semibold">Hi, {{ userName }}</h1>
          </div>
        </div>
        <button class="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white">
          <font-awesome-icon icon="bell" class="text-xl" />
          <span
            v-if="notificationCount > 0"
            class="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-800"
          >
          {{ notifiStore.Notificationlist.length }}
          </span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-24 pb-20 px-6">
      <!-- Weekly Progress -->
      <section class="bg-[#1E1E1E] p-4 rounded-xl mb-8 text-white">
    <h2 class="text-xl font-semibold mb-4">Weekly Progress</h2>

    <!-- Tabs -->
    <div class="flex space-x-4 mb-4">
      <button
        class="px-4 py-2 rounded-lg transition-all"
        :class="activeTab === 'burnt' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'"
        @click="setTab('burnt')"
      >
        Calories Burnt
      </button>
      <button
        class="px-4 py-2 rounded-lg transition-all"
        :class="activeTab === 'intake' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'"
        @click="setTab('intake')"
      >
        Calories Intake
      </button>
    </div>

    <!-- Chart -->
    <div ref="chartContainer" style="height: 300px;"></div>
  </section>

      <!-- Trainers Section -->
      <section class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Top Trainers</h2>
          <button class="text-[#00A3FF] !rounded-button">View All</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="trainer in trainers"
            :key="trainer.id"
            class="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center text-center"
          >
            <h3 class="font-medium text-base">{{ trainer.name }}</h3>
            <p class="text-[#B3B3B3] text-xs mb-2">{{ trainer.specialty }}</p>
          </div>
        </div>
      </section>

      <!-- Nutritionists Section -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Expert Nutritionists</h2>
          <button class="text-[#00A3FF] !rounded-button">View All</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
          v-for="nutritionist in nutritionists"
          :key="nutritionist.id"
          class="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center text-center"
        >
          <h3 class="font-medium text-base">{{ nutritionist.name }}</h3>
          <p class="text-[#B3B3B3] text-xs mb-2">{{ nutritionist.specialty }}</p>
          <i class="fas fa-apple-alt text-[#00A3FF] text-lg mt-2"></i>
        </div>
        </div>
      </section>
    </main>

    <!-- Navigation Bar -->
    <nav class="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] px-6 py-4">
      <div class="flex justify-between items-center">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.label === 'My Workouts' ? 'https://readdy.ai/home/3623f87e-d659-40f4-b52e-c543b3daf4da/bf1cabb2-74fc-4ab6-9691-0b85d752d45f' : '#'"
          :data-readdy="item.label === 'My Workouts' ? 'true' : undefined"
          class="!rounded-button flex flex-col items-center gap-1"
          :class="{ 'text-[#00A3FF]': item.isActive }"
        >
        <font-awesome-icon :icon="item.icon" />
          <span class="text-xs">{{ item.label }}</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted ,watch} from "vue";
import * as echarts from 'echarts';
import { NotificationServices } from "../Services/NotificationServices";
import { notificationStore } from "../stores/NotificationStore";
const notificationService = new NotificationServices();
const notifiStore = notificationStore();
const chartContainer = ref(null);
let chartInstance = null;

const activeTab = ref('burnt');
const caloriesBurntData = [500, 600, 750, 800, 650, 700, 720];
const caloriesIntakeData = [1800, 2000, 1900, 2200, 2100, 2050, 1950];
let notificationCount = 0;
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const initChart = () => {
  if (!chartContainer.value) return;

  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartContainer.value, 'dark');

  const data =
    activeTab.value === 'burnt' ? caloriesBurntData : caloriesIntakeData;
  const color = activeTab.value === 'burnt' ? '#3b82f6' : '#10b981';

  chartInstance.setOption({
    title: {
      text: activeTab.value === 'burnt' ? 'Calories Burnt' : 'Calories Intake',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: days,
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    series: [
      {
        data,
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color,
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  });
};

const setTab = (tab) => {
  activeTab.value = tab;
};

onMounted(() => {
  initChart();
  notificationService.startConnection();
  notificationCount = notifiStore.Notificationlist.length
});

watch(activeTab, () => {
  initChart();
});

const userName = ref("Alexander");

const navItems = ref([
  { label: "Home", icon: "fa-solid fa-house", isActive: true },
  { label: "My Workouts", icon: ['fas', 'dumbbell'], isActive: false },
  { label: "My Diet", icon: ['fas', 'bowl-food'], isActive: false },
  { label: "Progress", icon: ['fas', 'chart-simple'] , isActive: false },
]);

const trainers = ref([
  {
    id: 1,
    name: "Marcus Thompson",
    specialty: "HIIT & Strength Training",
  },
  {
    id: 2,
    name: "Sarah Rodriguez",
    specialty: "Yoga & Pilates",
  },
  {
    id: 3,
    name: "James Wilson",
    specialty: "CrossFit Expert",
  },
]);

const nutritionists = ref([
  {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "Sports Nutrition",
  },
  {
    id: 2,
    name: "Liam Patel",
    specialty: "Weight Management",
  },
  {
    id: 3,
    name: "Sophia Garcia",
    specialty: "Holistic Wellness",
  },
]);
</script>