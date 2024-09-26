<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.title" @click="navigate(item.route)" >
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useRouter } from 'vue-router';

const items = [
  { title: 'Home', route: '/' },
  { title: 'Fighters', route: '/fighters' },
];

const router = useRouter();

const navigate = (route) => {
  router.push(route);
};
</script>
  