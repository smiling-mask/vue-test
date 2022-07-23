<template>
  <CustomHeader />
  <div id="container">
    <router-view />
  </div>
  <CustomFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import CustomFooter from '@/components/CustomFooter.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CustomHeader,
    CustomFooter,
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500;700&display=swap');

body {
  background-color: #000000;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

#container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75rem;
  min-height: 25rem;
}
</style>
