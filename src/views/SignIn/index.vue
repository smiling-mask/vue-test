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
          이메일 주소 형식과 일치하지 않습니다.
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
          비밀번호는 영어 대,소문자 및 특수문자로 8자 이상만 가능합니다.
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
          비밀번호와 같은 문자열을 입력해주세요.
        </div>
      </div>
      <div v-show="signInTab === 1" class="sign-in-form-container">
        <div class="sign-in-form-row">
          <label for="userName">이름</label>
          <input name="userName" v-model.lazy="signInFormData.userName.value" />
        </div>
        <div v-show="signInFormData.userName.isError" class="error-text">
          이름은 2글자 이상의 한글 완성형 혹은 3글자 이상의 영어입니다.
        </div>
        <div class="sign-in-form-row">
          <label for="userPhone">연락처</label>
          <input name="userPhone" v-model.lazy="signInFormData.userPhone.value" />
        </div>
        <div v-show="signInFormData.userPhone.isError" class="error-text">
          휴대폰번호 형식과 일치하지 않습니다.
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
        <div v-show="signInFormData.userAddress.isError" class="error-text">
          우편번호를 검색해주세요.
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
          유효한 카드번호가 아닙니다.
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

import router from '@/router';
import { Path } from '@/Constants';

import './styles.css';

export default defineComponent({
  name: 'SignInView',
  setup() {
    const signInFormData = reactive({
      userEmail: {
        value: '',
        regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        isError: false,
      },
      userPassword: {
        value: '',
        // eslint-disable-next-line no-useless-escape
        regex: /^[a-zA-Z\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}/i,
        isError: false,
      },
      userPasswordAccept: {
        value: '',
        // eslint-disable-next-line no-useless-escape
        regex: /^[a-zA-Z\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}/i,
        isError: false,
      },
      userName: {
        value: '',
        regex: /^[가-힣]{2,}$|^[a-zA-Z]{3,}$/,
        isError: false,
      },
      userPhone: {
        value: '',
        regex: /^0\d{2}-\d{3,4}-\d{4}$|^0\d{9,10}|^0\d{2}\s\d{3,4}\s\d{4}/i,
        isError: false,
      },
      userPostCode: {
        value: '',
        isError: false,
      },
      userAddress: {
        value: '',
        isError: false,
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
      const isEmpty = (data: string) => {
        return data === '';
      };

      const isValidated = (data: string, isError: boolean) => {
        if (isEmpty(data) || isError) return false;

        return true;
      };

      if (signInTab.value === 0) {
        if (
          isValidated(signInFormData.userEmail.value, signInFormData.userEmail.isError) &&
          isValidated(signInFormData.userPassword.value, signInFormData.userPassword.isError) &&
          isValidated(
            signInFormData.userPasswordAccept.value,
            signInFormData.userPasswordAccept.isError,
          )
        ) {
          signInTab.value += 1;
        } else {
          if (isEmpty(signInFormData.userEmail.value)) {
            return (signInFormData.userEmail.isError = true);
          }

          if (isEmpty(signInFormData.userPassword.value)) {
            return (signInFormData.userPassword.isError = true);
          }

          if (isEmpty(signInFormData.userPasswordAccept.value)) {
            return (signInFormData.userPasswordAccept.isError = true);
          }
        }

        return;
      }

      if (signInTab.value === 1) {
        if (
          isValidated(signInFormData.userName.value, signInFormData.userName.isError) &&
          isValidated(signInFormData.userPhone.value, signInFormData.userPhone.isError) &&
          !isEmpty(signInFormData.userAddress.value)
        ) {
          signInTab.value += 1;
        } else {
          if (isEmpty(signInFormData.userName.value)) {
            return (signInFormData.userName.isError = true);
          }

          if (isEmpty(signInFormData.userPhone.value)) {
            return (signInFormData.userPhone.isError = true);
          }

          if (isEmpty(signInFormData.userAddress.value)) {
            return (signInFormData.userAddress.isError = true);
          }
        }

        return;
      }

      if (signInTab.value === 2) {
        if (
          !isEmpty(signInFormData.userCardNumber.value.value1) &&
          !isEmpty(signInFormData.userCardNumber.value.value2) &&
          !isEmpty(signInFormData.userCardNumber.value.value3) &&
          !isEmpty(signInFormData.userCardNumber.value.value4) &&
          !signInFormData.userCardNumber.isError
        ) {
          router.push({
            name: Path.SignInResult,
            params: {
              userEmail: signInFormData.userEmail.value,
              userName: signInFormData.userName.value,
              userPhone: signInFormData.userPhone.value,
              userAddress: signInFormData.userAddress.value,
              userPostcode: signInFormData.userPostCode.value,
            },
          });
        } else {
          signInFormData.userCardNumber.isError = true;
        }
      }
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
          signInFormData.userAddress.isError = false;
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
