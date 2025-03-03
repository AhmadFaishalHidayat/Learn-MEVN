<template>
  <h1>SETUP FE VUE JS</h1>
  <h1>{{ dataMessage }}</h1>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const dataMessage = ref(null);
const url = "http://localhost:3000";
const getMessage = async () => {
  try {
    const { data } = await axios.get(`${url}/`);
    console.log(data);
    dataMessage.value = data.message;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getMessage();
});
</script>
