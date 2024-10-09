<template>
  <div class="vacancies">
    <Loader v-if="loading" />

    <div :class="['container', { blurred: loading }]">
      <div class="sidebar">
        <h3 class="filter-title">Поиск по категориям:</h3>
        <Filter :vacancies="vacancies" @filter="applyFilter" />
      </div>
      <div>
        <h3 class="cards-title">Нашли {{filteredVacancies.length}} предложений для тебя</h3>
        <div class="content">
          <Card
              v-for="vacancy in filteredVacancies"
              :key="vacancy.vacancy_id"
              :vacancy="vacancy"
              @apply="openPopup"
          />
        </div>
      </div>

    </div>
    <PopupForm v-if="showPopup" @close="showPopup = false" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchVacancies } from '../services/api';
import Card from '../components/Card.vue';
import Filter from '../components/Filter.vue';
import PopupForm from '../components/PopupForm.vue';
import Loader from '../components/Loader.vue';

export default {
  components: {
    Card,
    Filter,
    PopupForm,
    Loader,
  },
  setup() {
    const vacancies = ref([]);
    const filteredVacancies = ref([]);
    const showPopup = ref(false);
    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      try {
        vacancies.value = await fetchVacancies();
        filteredVacancies.value = vacancies.value;
      } catch (error) {
        console.error('Ошибка при загрузке вакансий:', error);
      } finally {
        loading.value = false;
      }
    });

    const applyFilter = (filters) => {
      filteredVacancies.value = vacancies.value.filter((vacancy) => {
        const regionMatch =
            filters.regions.length === 0 ||
            filters.regions.includes(vacancy.regionname);

        const cityMatch =
            filters.cities.length === 0 ||
            filters.cities.includes(vacancy.placetitle);

        const organizationMatch =
            filters.organizations.length === 0 ||
            filters.organizations.includes(vacancy.clientname);

        return regionMatch && cityMatch && organizationMatch;
      });
    };

    const openPopup = () => {
      showPopup.value = true;
    };

    return {
      vacancies,
      filteredVacancies,
      showPopup,
      loading,
      applyFilter,
      openPopup,
    };
  },
};
</script>

<style scoped>
.vacancies {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 16px;
}

.container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-left: 40px;
}

.filter-title {
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}

.cards-title {
  font-size: 30px;
  margin-left: 40px;
}
@media (max-width: 1140px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
