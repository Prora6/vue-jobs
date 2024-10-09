<template>
  <div class="card" lang="ru">
    <p class="place-title">{{ vacancy.placetitle }}</p>
    <h3 class="prof-title">{{ vacancy.proftitle }}</h3>
    <p class="price">{{ vacancy.salary_volume_ex }}</p>
    <p class="direction">{{ vacancy.directiontitle }}</p>
    <p class="client-name">{{ vacancy.clientname }}</p>
    <div class="buttons">
      <button class="detail" @click="showDetails">Подробно</button>
      <button class="respond" @click="$emit('apply', vacancy)">Откликнуться!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    vacancy: {
      type: Object,
      required: true
    }
  },
  methods: {
    showDetails() {
      // Логика для отображения подробной информации
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 6px;
  width: 100%;
}

.place-title,
.prof-title,
.price,
.direction,
.client-name {
  hyphens: auto;
  word-break: break-word;
}

.place-title {
  font-size: 14px;
  line-height: 16px;
  position: relative;
  margin-bottom: 16px;
}

.prof-title {
  position: relative;
  font-size: 30px;
  line-height: 30px;
  margin-bottom: 26px;
}

.prof-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 1px;
  background-color: #ccc;
}

.price,
.direction,
.client-name {
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  margin-bottom: 21px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.detail,
.respond {
  padding: 15px;
  text-align: center;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  cursor: pointer;
}

.detail {
  background: transparent;
  border: 1px solid #fd7f23;
  color: #fd7f23;
}

.detail:hover {
  background: #fd7f23;
  color: white;
}

.respond {
  background: #fd7f23;
  border: 1px solid white;
  color: white;
}

.respond:hover {
  border: 1px solid #fd7f23;
  background: transparent;
  color: #fd7f23;
}
</style>
