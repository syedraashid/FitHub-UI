<template>
  <div class="flex min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <v-card>
        <v-card-title>About Page</v-card-title>
        <v-card-text>
          <p class="text-gray-600">This is the about page of our Vue Stack application.</p>
        </v-card-text>
        <v-card-actions>
          <router-link to="/">
            <v-btn color="primary">Back to Home</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>