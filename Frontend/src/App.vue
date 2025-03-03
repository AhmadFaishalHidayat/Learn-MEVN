<template>
  <h1>SETUP FE VUE JS</h1>
  <h1>{{ dataMessage }}</h1>
  <h1>Test Routing Auth</h1>
  <h2>{{ dataAuth && dataAuth.authRegister.data.message }}</h2>
  <h2>
    {{ dataAuth && dataAuth.authLogin && dataAuth.authLogin.data.message }}
  </h2>
  <h2>
    {{ dataAuth && dataAuth.authLogout && dataAuth.authLogout.data.message }}
  </h2>
  <h2>{{ dataAuth && dataAuth.authUser && dataAuth.authUser.data.message }}</h2>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, onUpdated } from "vue";

const dataMessage = ref(null);
const dataAuth = ref(null);
const url = "http://localhost:3000";
const getMessage = async () => {
  try {
    const { data } = await axios.get(`${url}/`);
    console.log(data);
    dataMessage.value = data.message;
    const authRegister = await axios.post(`${url}/api/v1/auth/register`);
    const authLogin = await axios.post(`${url}/api/v1/auth/login`);
    const authLogout = await axios.get(`${url}/api/v1/auth/logout`);
    const authGetUser = await axios.get(`${url}/api/v1/auth/getUser`);
    dataAuth.value = {
      authRegister,
      authLogin,
      authLogout,
      authGetUser,
    };
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getMessage();
});
</script>
