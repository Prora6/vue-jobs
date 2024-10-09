<template>
  <div class="filter">
    <div class="multiselect-container">
      <label class="multiselect-label">Регион</label>
      <multiselect
          v-model="selectedRegion"
          class="multiselect-dropdown"
          :options="regions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          placeholder="Выберите регионы"
          :searchable="false"
          @input="onRegionChange"
          :show-labels="false"
      >
        <template #selection="{ values }">
          <span v-if="values.length">Выбрано ({{ values.length }})</span>
        </template>
      </multiselect>
    </div>
    <div
        class="multiselect-container"
        :class="{ disabled: selectedRegion.length === 0 }"
    >
      <label class="multiselect-label">Город</label>
      <multiselect
          v-model="selectedCity"
          class="multiselect-dropdown"
          :options="cities"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          placeholder="Выберите города"
          :searchable="false"
          @input="onCityChange"
          :disabled="selectedRegion.length === 0"
          :show-labels="false"
      >
        <template #selection="{ values }">
          <span v-if="values.length">Выбрано ({{ values.length }})</span>
        </template>
      </multiselect>
    </div>
    <div
        class="multiselect-container"
        :class="{ disabled: selectedCity.length === 0 }"
    >
      <label class="multiselect-label">Организация</label>
      <multiselect
          v-model="selectedOrganization"
          class="multiselect-dropdown"
          :options="organizations"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          placeholder="Выберите организации"
          :searchable="false"
          :disabled="selectedCity.length === 0"
          :show-labels="false"
      >
        <template #selection="{ values }">
          <span v-if="values.length">Выбрано ({{ values.length }})</span>
        </template>
      </multiselect>
    </div>

    <div class="filter-buttons">
      <button class="apply" @click="applyFilters">Применить</button>
      <span class="clear" @click="clearFilters">Очистить</span>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Multiselect from 'vue-multiselect';

export default {
  name: 'Filter',
  components: {
    Multiselect,
  },
  props: {
    vacancies: {
      type: Array,
      required: true,
    },
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const selectedRegion = ref([]);
    const selectedCity = ref([]);
    const selectedOrganization = ref([]);

    const regions = computed(() => {
      return [
        ...new Set(
            props.vacancies
                .map((v) => v.regionname)
                .filter((regionname) => regionname && regionname.trim() !== '')
        ),
      ];
    });

    const cities = computed(() => {
      return [
        ...new Set(
            props.vacancies
                .filter(
                    (v) =>
                        selectedRegion.value.length === 0 ||
                        selectedRegion.value.includes(v.regionname)
                )
                .map((v) => v.placetitle)
                .filter((placetitle) => placetitle && placetitle.trim() !== '')
        ),
      ];
    });

    const organizations = computed(() => {
      return [
        ...new Set(
            props.vacancies
                .filter(
                    (v) =>
                        (selectedRegion.value.length === 0 ||
                            selectedRegion.value.includes(v.regionname)) &&
                        (selectedCity.value.length === 0 ||
                            selectedCity.value.includes(v.placetitle))
                )
                .map((v) => v.clientname)
                .filter((clientname) => clientname && clientname.trim() !== '')
        ),
      ];
    });

    function emitFilter() {
      emit('filter', {
        regions: selectedRegion.value,
        cities: selectedCity.value,
        organizations: selectedOrganization.value,
      });
    }

    function onRegionChange() {
      selectedCity.value = [];
      selectedOrganization.value = [];
    }

    function onCityChange() {
      selectedOrganization.value = [];
    }

    function applyFilters() {
      emitFilter();
    }

    function clearFilters() {
      selectedRegion.value = [];
      selectedCity.value = [];
      selectedOrganization.value = [];
      emitFilter();
    }

    return {
      selectedRegion,
      selectedCity,
      selectedOrganization,
      regions,
      cities,
      organizations,
      onRegionChange,
      onCityChange,
      applyFilters,
      clearFilters,
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.filter {
  display: flex;
  flex-direction: column;
}

.multiselect-container {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px 8px 8px 8px;
  margin-bottom: 16px;
}

.multiselect-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background-color: white;
  padding: 0 4px;
  font-size: 14px;
  color: #333;
}

.multiselect-container.disabled {
  opacity: 0.6;
}

.multiselect-container .multiselect {
  margin-top: 4px;
}

.multiselect-option {
  display: flex;
  align-items: center;
}

.multiselect-option input[type="checkbox"] {
  margin-right: 8px;
}

.multiselect-dropdown .multiselect-options,
.multiselect__content {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.multiselect-dropdown .multiselect-options,
.multiselect__content {
  max-height: 200px;
  overflow-y: auto;
}

.multiselect-dropdown .multiselect-options::-webkit-scrollbar {
  width: 8px;
}

.multiselect-dropdown .multiselect-options::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.multiselect-dropdown .multiselect-options::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.multiselect-dropdown .multiselect-options::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.multiselect-dropdown .multiselect-options {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.apply {
  padding: 15px;
  text-align: center;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  cursor: pointer;
  background: #fd7f23;
  border: 1px solid #fd7f23;
  color: white;
}

.apply:hover {
  background: transparent;
  color: #fd7f23;
}

.clear {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  cursor: pointer;
  color: #8b8d94;
  text-decoration: underline;
  text-align: center;
}

</style>
