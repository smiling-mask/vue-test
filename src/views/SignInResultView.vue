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

<style>
.sign-in-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  margin: 2.5rem 0 3.75rem;
  border: 0.25rem solid #383838;
  border-radius: 0.25rem;
}

#user-name {
  margin: 3.75rem 0 2.5rem;
  font-size: 1.5rem;
  font-weight: 500;
}

#user-name > span {
  font-size: 2rem;
  font-weight: 700;
}

.sign-in-data {
  margin: 0.625rem 0;
  font-size: 1.25rem;
  text-align: left;
  width: 25rem;
}

.last {
  margin-bottom: 3.75rem;
}
</style>
