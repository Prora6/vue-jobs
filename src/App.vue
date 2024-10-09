<template>
  <div id="app">
    <Header />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>