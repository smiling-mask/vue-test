<template>
  <div class="sign-in">
    <form id="sign-in-form">
      <div id="sign-in-title">{{ signInTitle }}</div>
      <div v-show="signInTab === 0" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userEmail">이메일</label>
          <input name="userEmail" v-model.lazy="signInFormData.userEmail.value" />
        </div>
        <div v-show="signInFormData.userEmail.isError" class="error-text">
          {{ signInFormData.userEmail.errorMessage }}
        </div>
        <div class="sign-in-form-row">
          <label for="userPassword">비밀번호</label>
          <input
            type="password"
            name="userPassword"
            v-model.lazy="signInFormData.userPassword.value"
          />
        </div>
        <div v-show="signInFormData.userPassword.isError" class="error-text">
          {{ signInFormData.userPassword.errorMessage }}
        </div>
        <div class="sign-in-form-row">
          <label for="userPasswordAccept">비밀번호 확인</label>
          <input
            type="password"
            name="userPasswordAccept"
            v-model.lazy="signInFormData.userPasswordAccept.value"
          />
        </div>
        <div v-show="signInFormData.userPasswordAccept.isError" class="error-text">
          {{ signInFormData.userPasswordAccept.errorMessage }}
        </div>
      </div>
      <div v-show="signInTab === 1" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userName">이름</label>
          <input name="userName" v-model.lazy="signInFormData.userName.value" />
        </div>
        <div v-show="signInFormData.userName.isError" class="error-text">
          {{ signInFormData.userName.errorMessage }}
        </div>
        <div class="sign-in-form-row">
          <label for="userPhone">연락처</label>
          <input name="userPhone" v-model.lazy="signInFormData.userPhone.value" />
        </div>
        <div v-show="signInFormData.userPhone.isError" class="error-text">
          {{ signInFormData.userPhone.errorMessage }}
        </div>
        <div class="sign-in-form-row">
          <label for="userAddress">주소</label>
          <div id="address-search-row">
            <div id="address-search-button" :onClick="onSearchAddressButtonClick">
              우편번호 검색
            </div>
            <input name="userAddress" v-model.lazy="signInFormData.userPostCode.value" />
            <input name="userAddress" v-model.lazy="signInFormData.userAddress.value" />
          </div>
        </div>
      </div>
      <div v-show="signInTab === 2" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userCardNumber">카드번호</label>
          <div class="user-card-number-row">
            <input type="text" v-model.lazy="signInFormData.userCardNumber.value.value1" />
            <input type="text" v-model.lazy="signInFormData.userCardNumber.value.value2" />
            <input type="text" v-model.lazy="signInFormData.userCardNumber.value.value3" />
            <input type="text" v-model.lazy="signInFormData.userCardNumber.value.value4" />
          </div>
        </div>
        <div v-show="signInFormData.userCardNumber.isError" class="error-text">
          {{ signInFormData.userCardNumber.errorMessage }}
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
declare const window: any;
import { defineComponent, ref, computed, reactive, watch } from 'vue';

export default defineComponent({
  name: 'SignInView',
  setup() {
    const signInFormData = reactive({
      userEmail: {
        value: '',
        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        isError: false,
        errorMessage: '이메일 주소 형식과 일치하지 않습니다.',
      },
      userPassword: {
        value: '',
        // eslint-disable-next-line no-useless-escape
        regex: /^[a-zA-Z\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}/i,
        isError: false,
        errorMessage: '비밀번호는 영어 대,소문자 및 특수문자로 8자 이상만 가능합니다.',
      },
      userPasswordAccept: {
        value: '',
        // eslint-disable-next-line no-useless-escape
        regex: /^[a-zA-Z\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}/i,
        isError: false,
        errorMessage: '비밀번호와 같은 문자열을 입력해주세요.',
      },
      userName: {
        value: '',
        regex: /^[가-힣]{2,}$|^[a-zA-Z]{3,}$/,
        isError: false,
        errorMessage: '이름은 2글자 이상의 한글 완성형 혹은 3글자 이상의 영어입니다.',
      },
      userPhone: {
        value: '',
        regex: /^0\d{2}-\d{3,4}-\d{4}$|^0\d{9,10}|^0\d{2}\s\d{3,4}\s\d{4}/i,
        isError: false,
        errorMessage: '휴대폰번호 형식과 일치하지 않습니다.',
      },
      userPostCode: {
        value: '',
      },
      userAddress: {
        value: '',
      },
      userCardNumber: {
        value: {
          value1: '',
          value2: '',
          value3: '',
          value4: '',
        },
        regex: /^[0-9]{4}/,
        isError: false,
        errorMessage: '유효한 카드번호가 아닙니다.',
      },
    });

    const signInTab = ref(0);

    const signInTitle = computed(() => {
      switch (signInTab.value) {
        case 0:
          return '① 개인 정보 입력';
        case 1:
          return '② 배송지 정보 입력';
        case 2:
          return '③ 결재 정보 입력';
        default:
          return '';
      }
    });

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

    watch(
      () => signInFormData.userEmail.value,
      (newValue) => {
        if (signInFormData.userEmail.regex.test(newValue)) {
          signInFormData.userEmail.isError = false;
        } else {
          signInFormData.userEmail.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userPassword.value,
      (newValue) => {
        if (signInFormData.userPassword.regex.test(newValue)) {
          signInFormData.userPassword.isError = false;
        } else {
          signInFormData.userPassword.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userPasswordAccept.value,
      (newValue) => {
        if (
          signInFormData.userPasswordAccept.regex.test(newValue) &&
          signInFormData.userPasswordAccept.value === signInFormData.userPassword.value
        ) {
          signInFormData.userPasswordAccept.isError = false;
        } else {
          signInFormData.userPasswordAccept.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userName.value,
      (newValue) => {
        if (signInFormData.userName.regex.test(newValue)) {
          signInFormData.userName.isError = false;
        } else {
          signInFormData.userName.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userPhone.value,
      (newValue) => {
        if (signInFormData.userPhone.regex.test(newValue)) {
          signInFormData.userPhone.isError = false;
        } else {
          signInFormData.userPhone.isError = true;
        }
      },
    );

    const cardNumberValidator = (cardNumber: string) => {
      const defaultValidator = (cardNumber: string) => {
        if (cardNumber.length !== 4 || !signInFormData.userCardNumber.regex.test(cardNumber))
          return false;

        return true;
      };

      if (defaultValidator(cardNumber)) {
        if (
          defaultValidator(signInFormData.userCardNumber.value.value1) &&
          defaultValidator(signInFormData.userCardNumber.value.value2) &&
          defaultValidator(signInFormData.userCardNumber.value.value3) &&
          defaultValidator(signInFormData.userCardNumber.value.value4)
        ) {
          return (
            Object.values(signInFormData.userCardNumber.value)
              .join('')
              .split('')
              .map((cardNumber, cardNumberIndex) => {
                if (cardNumberIndex % 2 === 0) {
                  const checkNumber = Number(cardNumber) * 2;

                  if (checkNumber > 9) {
                    return String(checkNumber)
                      .split('')
                      .reduce((acc, cur) => Number(acc) + Number(cur), 0);
                  }

                  return checkNumber;
                } else return Number(cardNumber);
              })
              .reduce((acc, cur) => acc + cur) %
              10 ===
            0
          );
        }

        return false;
      }
    };

    watch(
      () => signInFormData.userCardNumber.value.value1,
      (newValue) => {
        if (cardNumberValidator(newValue)) {
          signInFormData.userCardNumber.isError = false;
        } else {
          signInFormData.userCardNumber.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userCardNumber.value.value2,
      (newValue) => {
        if (cardNumberValidator(newValue)) {
          signInFormData.userCardNumber.isError = false;
        } else {
          signInFormData.userCardNumber.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userCardNumber.value.value3,
      (newValue) => {
        if (cardNumberValidator(newValue)) {
          signInFormData.userCardNumber.isError = false;
        } else {
          signInFormData.userCardNumber.isError = true;
        }
      },
    );

    watch(
      () => signInFormData.userCardNumber.value.value4,
      (newValue) => {
        if (cardNumberValidator(newValue)) {
          signInFormData.userCardNumber.isError = false;
        } else {
          signInFormData.userCardNumber.isError = true;
        }
      },
    );

    const onPrevButtonClick = () => {
      if (signInTab.value === 0) return;

      signInTab.value -= 1;
    };

    const onNextButtonClick = () => {
      if (signInTab.value === 2) return;

      signInTab.value += 1;
    };

    const onSearchAddressButtonClick = () => {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          let fullAddress = data.roadAddress;
          let extraRoadAddress = '';

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddress += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddress +=
              extraRoadAddress !== '' ? ', ' + data.buildingName : data.buildingName;
          }

          if (extraRoadAddress !== '') {
            extraRoadAddress = ' (' + extraRoadAddress + ')';
          }

          if (fullAddress !== '') {
            fullAddress += extraRoadAddress;
          }

          signInFormData.userPostCode.value = data.zonecode;
          signInFormData.userAddress.value = fullAddress;
          console.log('oncomplete');
        },
      }).open();
    };

    return {
      signInFormData,
      signInTab,
      signInTitle,
      isPrevButtonVisible,
      nextButtonText,
      nextButtonClassName,
      onPrevButtonClick,
      onNextButtonClick,
      onSearchAddressButtonClick,
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
  cursor: pointer;
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

.error-text {
  margin: 0.75rem 0 0 30%;
  color: #ff0000;
  text-align: left;
}
</style>
