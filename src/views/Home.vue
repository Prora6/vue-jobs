<template>
  <div class="home">
    <div class="banner">
      <div class="container">
        <p class="change-text">{{ currentText }}</p>
        <img src="../assets/main-img.796e044.png" alt="Девушка" class="banner-img">
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Home',
  setup() {
    const texts = [
      'Большой выбор профессий',
      'Найди работу мечты',
      'Развивай свою карьеру',
      'Присоединяйся к нам',
      'Лучшие вакансии здесь'

    ];

    const currentText = ref(texts[0]);
    let currentIndex = 0;
    let intervalId = null;

    onMounted(() => {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        currentText.value = texts[currentIndex];
      }, 3000);
    });

    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });

    return {
      currentText
    };
  }
};
</script>

<style scoped>
.home {
  display: flex;
  width: 100%;
}
.container {
  max-width: 1200px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.banner {
  background-color: #73a82d;
  width: 100%;
  display: flex;
  justify-content: center;
}
.change-text {
  text-transform: uppercase;
  position: absolute;
  left: 0;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  margin: 16px 0;
}

@media (max-width: 1232px) {
  .change-text {
    left: 16px;
  }
}

</style>
