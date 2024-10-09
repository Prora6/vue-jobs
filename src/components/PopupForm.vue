<template>
  <Popup @close="closePopup">
    <template #title>
      Откликнуться на вакансию
    </template>
    <template #default>
      <form @submit.prevent="submitForm">
        <div class="input-container">
          <label class="input-label">Фамилия</label>
          <input type="text" v-model="surname" required />
        </div>
        <div class="input-container">
          <label class="input-label">Имя</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div class="input-container">
          <label class="input-label">Отчество</label>
          <input type="text" v-model="patronymic" required />
        </div>
        <div class="input-container">
          <label class="input-label">Номер телефона</label>
          <input
              type="text"
              v-model="phone"
              v-mask="'+7 (###) ###-##-##'"
              placeholder="+7 (___) ___-__-__"
              required
          />
        </div>
        <label class="checkbox-label">
          <input type="checkbox" v-model="consent" required />
          <span>
            Я даю согласие на обработку персональных данных в соответствии с
            <a
                href="https://gsr-rabota.ru/legal-notes"
                target="_blank"
                rel="noopener noreferrer"
            >
              положением об обработке персональных данных
            </a>.
          </span>
        </label>
      </form>
    </template>
    <template #buttons>
      <button type="button" @click="submitForm" :disabled="!isFormValid">
        Отправить
      </button>
    </template>
  </Popup>
</template>

<script>
import { ref, computed } from 'vue';
import Popup from './Popup.vue';

export default {
  name: 'PopupForm',
  components: {
    Popup,
  },
  emits: ['close'],
  setup(_, { emit }) {
    const surname = ref('');
    const firstName = ref('');
    const patronymic = ref('');
    const phone = ref('');
    const consent = ref(false);

    const isFormValid = computed(() => {
      const phoneDigits = phone.value.replace(/\D/g, '');
      const phoneValid = phoneDigits.length === 11;
      return (
          surname.value.trim() !== '' &&
          firstName.value.trim() !== '' &&
          patronymic.value.trim() !== '' &&
          phoneValid &&
          consent.value
      );
    });

    const closePopup = () => {
      emit('close');
    };

    const submitForm = () => {
      const formData = {
        surname: surname.value,
        firstName: firstName.value,
        patronymic: patronymic.value,
        phone: phone.value,
      };

      alert(
          `Форма отправлена!\n\nДанные:\nФамилия: ${formData.surname}\nИмя: ${formData.firstName}\nОтчество: ${formData.patronymic}\nНомер телефона: ${formData.phone}`
      );
      closePopup();
    };

    return {
      surname,
      firstName,
      patronymic,
      phone,
      consent,
      isFormValid,
      closePopup,
      submitForm,
    };
  },
};
</script>

<style scoped>
.input-container {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px 8px 8px 8px;
  margin-bottom: 16px;
}

.input-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background-color: white;
  padding: 0 4px;
  font-size: 14px;
  color: #333;
}

input[type='text'] {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 4px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
  color: rgba(24, 28, 42, 0.5);
  font-size: 12px;
  line-height: 16px;
}

.checkbox-label input[type='checkbox'] {
  margin-right: 8px;
  margin-top: 2px;
}

.checkbox-label span {
  display: inline;
}

.checkbox-label a {
  color: #007bff;

}

.checkbox-label a:hover {
  color: rgba(24, 28, 42, 0.8);
}

.popup-buttons button {
  margin-left: 8px;
}
</style>
