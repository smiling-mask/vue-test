<template>
  <div class="sign-in">
    <form id="sign-in-form">
      <div id="sign-in-title">회원 가입</div>
      <div v-show="signInTab === 0" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userEmail">이메일</label>
          <input name="userEmail" v-model.lazy="signInFormData.userEmail" />
        </div>
        <div class="sign-in-form-row">
          <label for="userPassword">비밀번호</label>
          <input name="userPassword" v-model.lazy="signInFormData.userPassword" />
        </div>
        <div class="sign-in-form-row">
          <label for="userPasswordAccept">비밀번호 확인</label>
          <input name="userPasswordAccept" v-model.lazy="signInFormData.userPasswordAccept" />
        </div>
      </div>
      <div v-show="signInTab === 1" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userName">이름</label>
          <input name="userName" v-model.lazy="signInFormData.userName" />
        </div>
        <div class="sign-in-form-row">
          <label for="userPhone">연락처</label>
          <input name="userPhone" v-model.lazy="signInFormData.userPhone" />
        </div>
        <div class="sign-in-form-row">
          <label for="userAddress">주소</label>
          <div id="address-search-row">
            <div id="address-search-button">우편번호 검색</div>
            <input name="userAddress" v-model.lazy="signInFormData.userAddress" />
          </div>
        </div>
      </div>
      <div v-show="signInTab === 2" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userCardNumber">카드번호</label>
          <div class="user-card-number-row">
            <input name="userCardNumber" v-model.lazy="signInFormData.userCardNumber1" />
            <input v-model.lazy="signInFormData.userCardNumber2" />
            <input v-model.lazy="signInFormData.userCardNumber3" />
            <input v-model.lazy="signInFormData.userCardNumber4" />
          </div>
        </div>
      </div>
    </form>
    <div id="sign-in-button-container">
      <div class="sign-in-button" v-show="isPrevButtonVisible" :onClick="onPrevButtonClick">
        이전단계
      </div>
      <div :class="nextButtonClassName" :onClick="onNextButtonClick">
        {{ nextButtonText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';

export default defineComponent({
  name: 'SignInView',
  setup() {
    const signInFormData = reactive({
      userEmail: '',
      userPassword: '',
      userPasswordAccept: '',
      userName: '',
      userPhone: '',
      userAddress: '',
      userCardNumber1: '',
      userCardNumber2: '',
      userCardNumber3: '',
      userCardNumber4: '',
    });

    const signInTab = ref(0);

    const isPrevButtonVisible = computed(() => signInTab.value !== 0);

    const nextButtonClassName = computed(() => {
      switch (signInTab.value) {
        case 0:
          return 'first-next-button';
        case 1:
          return 'sign-in-button';
        case 2:
          return 'last-next-button';
        default:
          return 'sign-in-button';
      }
    });

    const nextButtonText = computed(() => (signInTab.value === 2 ? '회원가입' : '다음단계'));

    const onPrevButtonClick = () => {
      if (signInTab.value === 0) return;

      signInTab.value -= 1;
    };

    const onNextButtonClick = () => {
      if (signInTab.value === 2) return;

      signInTab.value += 1;
    };

    return {
      signInFormData,
      signInTab,
      isPrevButtonVisible,
      nextButtonText,
      nextButtonClassName,
      onPrevButtonClick,
      onNextButtonClick,
    };
  },
});
</script>

<style>
.sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  margin: 2.5rem 0 3.75rem;
  border: 0.25rem solid #383838;
  border-radius: 0.25rem;
}

#sign-in-title {
  width: 100%;
  margin-top: 1.25rem;
  font-size: 1.5rem;
  font-weight: 700;
}

#sign-in-form {
  width: 100%;
}

.sign-in-form-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 2.5rem;
}

.sign-in-form-row {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.sign-in-form-row > label {
  width: calc(30% - 1.25rem);
  margin-left: 1.25rem;
  font-weight: 700;
  text-align: left;
}

.sign-in-form-row > input {
  width: calc(70% - 1.875rem);
  height: 2.25rem;
}

#sign-in-button-container {
  width: calc(100% - 2.5rem);
  display: flex;
  justify-content: space-between;
  margin: 2.5rem 0;
}

.sign-in-button {
  background-color: #ffffff;
  color: #000000;
  border-radius: 0.25rem;
  padding: 0.5rem 8.75rem;
}

.first-next-button {
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  border-radius: 0.25rem;
  padding: 0.5rem 0;
}

.last-next-button {
  background-color: #383838;
  color: #ffffff;
  border-radius: 0.25rem;
  padding: 0.5rem 8.75rem;
}

.first-next-button:hover,
.sign-in-button:hover,
#address-search-button:hover {
  cursor: pointer;
  background-color: #383838;
}

.last-next-button:hover {
  background-color: #101010;
}

#address-search-row {
  width: calc(70% - 1.25rem);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#address-search-row > input {
  margin-top: 1.25rem;
  width: calc(100% - 0.625rem);
  height: 2.25rem;
}

#address-search-button {
  width: 12.5rem;
  padding: 0.25rem 0;
  font-weight: 700;
  background-color: #ffffff;
  color: #000000;
  border-radius: 0.5rem;
}

.user-card-number-row {
  display: flex;
  width: calc(100% - 1.25rem);
  margin-right: 1.25rem;
  justify-content: space-between;
}

.user-card-number-row > input {
  width: calc(25% - 1.25rem);
  height: 2.25rem;
}
</style>
