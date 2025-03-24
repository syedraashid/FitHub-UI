<template>
  <div class="flex min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <v-card class="mb-4">
        <v-card-title>Welcome to Vue Stack</v-card-title>
        <v-card-text>
          <p class="text-gray-600">This template includes Vue 3, Vuetify, Quasar, Tailwind CSS, Pinia, and Vue Router.</p>
        </v-card-text>
      </v-card>

      <q-card class="mb-4">
        <q-card-section>
          <div class="text-h6">Counter Example with Pinia</div>
          <div class="text-subtitle2">Current count: {{ counter.count }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn color="primary" @click="counter.increment">Increment</q-btn>
          <q-btn color="secondary" @click="counter.decrement">Decrement</q-btn>
        </q-card-actions>
      </q-card>

      <router-link to="/about" class="text-blue-600 hover:text-blue-800">
        Go to About Page
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>