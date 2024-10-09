<template>
  <div class="loader-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Устанавливаем полупрозрачный фон для видимости размытия */
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* Применяем размытие к фону */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Для поддержки Safari */
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #73a82d;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
