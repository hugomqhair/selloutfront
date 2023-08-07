<template>
  <div id="app">
    <Header></Header>
    <Info></Info>
    <b-container >
      <Login v-if="!user"></Login>
      <router-view v-if="user"></router-view>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Info from './components/Info.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login,
    Header,
    Info
  },
  computed:{
    user(){
        return this.$store.state.user
    }
  }
}
</script>

<style>
*{
  /* background-color:#1f1f1f; */
  margin: 0;
}
#app {
  background-color:#1f1f1f;
  font-family:Montserrat;
  
  /* height: 100vh; */
  min-height: 100vh;
  display: grid;
  grid-template-rows: 17vh 1fr;
  grid-template-areas: 
      "header"
      "modelo"
}
body {
  margin: 0;
} 

/* #footer{
  margin-bottom: 0px;
} */      
</style>
