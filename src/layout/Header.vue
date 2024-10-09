<template>
  <header class="header">
    <div class="container">
      <div class="left">
        <img src="../assets/newlogo.e6ba86e.svg" alt="Логотип" class="logo" />
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/vacancies">Найти работу</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="right" @click="copyPhoneNumber">
        8 800 333 30 84
        <span v-if="copied" class="copy-notification">Номер скопирован</span>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Header',
  setup() {
    const copied = ref(false);

    const copyPhoneNumber = async () => {
      const phoneNumber = '8 800 333 30 84';
      try {
        await navigator.clipboard.writeText(phoneNumber);
        copied.value = true;

        setTimeout(() => {
          copied.value = false;
        }, 2000);
      } catch (err) {
        console.error('Ошибка копирования номера телефона:', err);
      }
    };

    return {
      copied,
      copyPhoneNumber
    };
  }
};
</script>

<style scoped>
.header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav {
  display: flex;
  justify-content: center;
}
.nav-list {
  list-style: none;
  display: flex;
  gap: 24px;
}
.nav-item a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.logo {
  width: 104px;
  height: 40px;
}
.container {
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.left {
  display: flex;
  align-items: center;
}
.right {
  font-size: 20px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}
.copy-notification {
  position: absolute;
  top: -24px;
  right: 0;
  background-color: #4caf50;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
