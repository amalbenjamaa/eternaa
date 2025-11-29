<template>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    rel="stylesheet"
  />

  <div id="app">
    <HeaderBarComponent />
    <router-view />
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderBarComponent from './components/HeaderBarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';


export default {
  components: {
    HeaderBarComponent,
    FooterComponent
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
