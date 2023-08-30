<template>
  <div id="app">
    <Header></Header>
    <b-container>
      <ListarProduto></ListarProduto>
    </b-container>
    <!-- <Body msg="Mensagem Modelo"/> -->
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
// import Body from './components/Body.vue'
import ListarProduto from './components/ListarProduto.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    // Body,
    ListarProduto,
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
