<template>
  <div class="sign-in-result">
    <div id="user-name">
      <span>{{ userName }}</span
      >님, 명품을 품은 Balaan에 오신 것을 환영합니다!
    </div>
    <div>가입시 정보</div>
    <div class="sign-in-data">이메일 {{ userEmail }}</div>
    <div class="sign-in-data">주소 {{ userAddress }} ({{ userPostcode }})</div>
    <div class="sign-in-data last">연락처 {{ userPhone }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import './styles.css';

export default defineComponent({
  name: 'SignInResultView',
  props: {
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    userPostcode: {
      type: String,
      required: true,
    },
  },
});
</script>
