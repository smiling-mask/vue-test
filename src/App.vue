<template>
  <CustomHeader />
  <router-view />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
