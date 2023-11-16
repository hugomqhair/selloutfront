<template>
  <div id="app">
    <Header></Header>
    <Info></Info>
    <b-container>
      <router-view></router-view>
    </b-container>
    <!-- Snipper -->
    <div v-if="loading" id="loading">
      <b-spinner style="width: 10rem; height: 10rem;" label="Carregando..." variant="success"></b-spinner>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Info from './components/Info.vue'


export default {
  name: 'App',
  components: {
    Header,
    Info
  },
  computed: {
    // user() {
    //   return this.$store.state.user
    // },
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style>
* {
  /* background-color:#1f1f1f; */
  margin: 0;
}

#app {
  background-color: #1f1f1f;
  font-family: Montserrat;
  
  /* height: 100vh; */
  min-height: 100vh;
  min-width: 100vw;
  display: grid;

  
  grid-template-rows: 12vh 1fr;
  grid-template-areas:
    "header"
    "modelo"
}

body {
  margin: 0;
}

#loading{
    position: fixed;
    top: 40%;
    right: 45%;
    /* transform: translate(-50%, -50%); */
    opacity: 0.8;
    /* color: bisque; */

 @media (max-width: 800px) {
  right: 35%;
  top: 30%;
}

    /* padding: 10px; */
}
/* #footer{
  margin-bottom: 0px;
} */
</style>
