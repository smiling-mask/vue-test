<template>
  <div class="custom-header">
    <img
      id="custom-header-logo"
      src="@/assets/images/balaan.png"
      :onClick="onCustomHeaderLogoClick"
    />
    <p id="custom-header-text">Balaan Test</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Path } from '@/Constants';

export default defineComponent({
  name: 'CustomHeader',
  setup() {
    const onCustomHeaderLogoClick = () => {
      router.push({ path: `/${Path.Home}` });
    };

    return {
      onCustomHeaderLogoClick,
    };
  },
});
</script>

<style>
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75rem;
}

#custom-header-logo {
  width: 2.5rem;
  height: 2.5rem;
  margin: 1rem 0;
}

#custom-header-logo:hover {
  cursor: pointer;
}

#custom-header-text {
  font-size: 1.25rem;
  font-weight: 300;
}
</style>
