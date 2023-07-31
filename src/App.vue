<template>
  <div id="app">
    <Header></Header>
    <!-- <Body msg="Mensagem Modelo"/> -->
    <Listar></Listar>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
// import Body from './components/Body.vue'
import Listar from './components/Listar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    // Body,
    Listar,
    Header,
    Footer
  }
}
</script>

<style>
#app {
  background-color:#1f1f1f;
  font-family:Montserrat;
  
  height: 100vh;
  display: grid;
  grid-template-rows: 20% 1fr 20vh;
  grid-template-areas: 
      "header"
      "modelo"
      "footer";
}
body {
  margin: 0;
} 

/* #footer{
  margin-bottom: 0px;
} */
</style>
