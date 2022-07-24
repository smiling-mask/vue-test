<template>
  <div class="home">
    <div id="entrance-button" :onClick="onEntranceButtonClick">테스트 입장하기</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import router from '@/router';
import { Path } from '@/Constants';

import './styles.css';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const onEntranceButtonClick = () => {
      router.push({ name: Path.SignIn });
    };

    return {
      onEntranceButtonClick,
    };
  },
});
</script>
