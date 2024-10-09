<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup">
      <!-- Кнопка закрытия -->
      <button class="close-button" @click="closePopup">×</button>
      <h2><slot name="title"></slot></h2>
      <div class="popup-content">
        <slot></slot>
      </div>
      <div class="popup-buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  emits: ['close'],
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup {
  position: relative; /* Добавили позиционирование для контейнера */
  background-color: #fff;
  padding: 24px;
  margin: 100px auto;
  width: 400px;
  border-radius: 8px;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.close-button:hover {
  color: #888;
}

.popup-content {
  margin-top: 16px;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
