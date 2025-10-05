// useApi.ts - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { Ref, ref, watch } from "vue";

export const useApi = (from: Ref<string>) => {
  const API_KEY = "edb8b64a7ce26cebbcd12c0e";
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

  interface ExchangeRates {
    base_code: string;
    conversion_rates: Record<string, number>;
  }

  const data = ref<ExchangeRates | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const cache = new Map();
  const fetchData = async () => {
    if (!from.value) return;
    if (cache.has(from.value)) {
      data.value = cache.get(from.value);
      return;
    }
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_URL}${from.value}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.result === "success") {
        data.value = result;
      } else {
        throw new Error(result["error-type"] || "Unknown API error");
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  watch(from, fetchData, { immediate: true });

  return { data, loading, error };
};
