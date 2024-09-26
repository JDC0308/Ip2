<template>
  <v-container class="homepage-container">
    <div class="content">
      <h1>Jozo Matej Lasić & Josip Ćavar <br>
         UFC Informatički projekt 2</h1>
      <p>
        We have been watching UFC for years, and we are a huge fans. Conor McGregor - favorite fighter, especially his win against José Aldo in 13 seconds. That victory left a mark in the UFC history, and it inspired us to create this project to manage and explore the details of UFC fighters.
      </p>
      <v-btn color="red darken-4" class="btn-explore" @click="$router.push('/fighters')">
        Explore Fighters
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.homepage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #000, #ff0000);
  color: #fff;
  text-align: center;
}

.content {
  max-width: 600px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
}

p {
  font-size: 18px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn-explore {
  padding: 50x;
  font-size: 16px;
}
</style>
