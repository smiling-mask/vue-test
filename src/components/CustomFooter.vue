<template>
  <div class="custom-footer">
    <p>
      이 프로젝트는 테스트를 위해 제작된 프로젝트 입니다.<br /><span
        :onClick="onCustomFooterTextClick"
        >By. SANHA LEE</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomFooter',
  setup() {
    const onCustomFooterTextClick = () => {
      window.open('https://github.com/smiling-mask/vue-test');
    };

    return {
      onCustomFooterTextClick,
    };
  },
});
</script>

<style>
.custom-footer {
  width: 75rem;
}

p {
  margin: 1rem 0;
  font-family: 1.25rem;
  text-align: left;
}

p > span {
  font-weight: 700;
}

p > span:hover {
  cursor: pointer;
}
</style>
