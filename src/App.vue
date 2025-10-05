<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Currency from "./components/Currency.vue";
import { useApi } from "./composables/useApi";
import { getConvertion } from "./helpers/getConvertion";

const from = ref<string>("RUB");
const to = ref<string>("USD");
const amount = ref<number>(0);
const result = ref<number>(0);

const { data, loading } = useApi(from);

const course = computed(() => {
  if (!data.value?.conversion_rates || !to.value) {
    return 0;
  }
  const rate = data.value.conversion_rates[to.value] || 0;
  return rate;
});

const handleFrom = (value: string) => {
  from.value = value;
};
const handleTo = (value: string) => {
  to.value = value;
};
const handleAmount = (value: number) => {
  amount.value = value;
};
watch([amount, course], () => {
  result.value = getConvertion(amount.value, course.value);
});
</script>

<template>
  <h2>Конвертер валют</h2>
  <Currency
    :result="result"
    @from="handleFrom"
    @to="handleTo"
    @amount="handleAmount"
  />
  <div v-if="course > 0" class="course-info">
    Курс: 1 {{ from }} = {{ course.toFixed(4) }} {{ to }}
  </div>
</template>

<style scoped></style>
