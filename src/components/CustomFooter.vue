<template>
  <div class="custom-footer">이 프로젝트는 테스트를 위해 제작된 프로젝트 입니다.</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomFooter',
});
</script>

<style>
.custom-footer {
  width: 75rem;
  font-family: 1.25rem;
  text-align: left;
  margin: 1rem 0;
}
</style>
