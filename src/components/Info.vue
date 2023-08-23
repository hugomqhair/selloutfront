<template>
  <div id="info" v-if="login.usuario">
    <!-- b-list-group-item  @click="logout"-->
    <div  class="d-flex align-items-center" id="avatar">
      <b-avatar variant="success" class="mr-2" button v-b-toggle.menu></b-avatar>
      <span class="mr-auto">{{ login.usuario }}</span>
    </div>
      <b-collapse id="menu"  class="mt-2">
        <!-- <div><b-button class="menuitems">Dados</b-button></div>
        <div><b-button class="menuitems" @click="logout">Sair</b-button></div> -->
        <div>
          <b-nav>
            <b-navbar-nav class="menuitems px-2">
              <b-nav-item class="item" @click="ResultadoMensal">Mensal</b-nav-item>
              <b-nav-item @click="logout" class="item">Sair</b-nav-item>
            </b-navbar-nav>
          </b-nav>
        </div>
      </b-collapse>
    

  </div>
</template>

<script>


export default {
  name: 'info',
  components: {
    // Body,

  },
  computed: {
    login() {
      return this.$store.state.login
    },
  },
  methods: {
    logout() {
      this.$store.state.login = {}
      this.$router.push('/Login')
    },
    ResultadoMensal(){
      this.$router.push('/ResultadoMensal')
    }

  },

}
</script>

<style scoped>
#info {
  position: absolute;
  top: 5px;
  right: 2%;
  margin-right: 10px;
  padding: 3px;
  color: aliceblue;
  z-index: 1;
  /* border: 1px solid #ccc;  */
}


#avatar  {
  background-color: #1f1f1f;
  color: aliceblue;
}

.menuitems{
  background-color: #1f1f1f;
  color: aliceblue;
}

.item:hover{
  background-color: #2f2d2d; /* Cor de destaque ao passar o mouse */
  /* border-color: #888; Cor da borda ao passar o mouse */
}

</style>
