<template>
  <div class="home">
    <div id="entrance-button" :onClick="onEntranceButtonClick">테스트 입장하기</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Path } from '@/Constants';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const onEntranceButtonClick = () => {
      router.push({ path: `/${Path.SignIn}` });
    };

    return {
      onEntranceButtonClick,
    };
  },
});
</script>

<style>
.home {
  display: flex;
}

#entrance-button {
  padding: 0.5rem 6.25rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #000000;
  background-color: #ffffff;
  border-radius: 0.25rem;
}

#entrance-button:hover {
  cursor: pointer;
  background-color: #383838;
}
</style>
