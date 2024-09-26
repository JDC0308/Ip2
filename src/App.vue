<template>
    <div id="app">

  <v-app>
    <v-app-bar>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/fighters">Fighters</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
    </div>
</template>

<script setup>
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
