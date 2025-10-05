<script setup lang="ts">
import { reactive, watch } from 'vue';

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'RUB']
interface CurrencyConversion {
  from: string;
  to: string;
  amount: number;
  result: number;
  timestamp: Date;
}
interface Props {
  result: number
}
interface Emits {
  (e: 'from', value: string): void
  (e: 'to', value: string): void
  (e: 'amount', value: number): void
}

const currencyConversion = reactive<CurrencyConversion>({
  from: 'RUB',
  to: 'USD',
  amount: 0,
  result: 0,
  timestamp: new Date(),
})

const {result} = defineProps<Props>()
const emit = defineEmits<Emits>()

watch(() => currencyConversion.from, (newFrom) => {
  emit('from', newFrom)
});

watch(() => currencyConversion.to, (newTo) => {
  emit('to', newTo)
});
watch(() => currencyConversion.amount, (newAmount) => {
  emit('amount', newAmount)
});

</script>

<template>
 <select class="from" v-model="currencyConversion.from">
    <option 
       v-for="currency in currencies" 
      :key="currency" 
      :value="currency">
       {{ currency }}
     </option>
 </select>
   <input 
      type="number" 
      placeholder="введите сумму" 
      v-model.number="currencyConversion.amount">
    </input>
 <select class="to" v-model="currencyConversion.to">
   <option 
       v-for="currency in currencies" 
      :key="currency">
       {{ currency }}
   </option>
</select>
    <input 
        type="number" 
        placeholder="результат" 
        v-model.number="currencyConversion.result" 
        disabled>
        </input>
</template>

<style scoped>

</style>
