<template>
  <div id="info">
    <b-list-group-item class="d-flex align-items-center" id="avatar">
      <b-avatar variant="success" class="mr-3" @click="logout" button></b-avatar>
      <span class="mr-auto">{{ login.usuario }}</span>
    </b-list-group-item>
  </div>
</template>

<script>

// import Body from './components/Body.vue'


export default {
  name: 'Info',
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

  },

}
</script>

<style>
#info {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 0px;
  color: aliceblue;
  /* border: 1px solid #ccc;  */
}

#avatar {
  background-color: #1f1f1f;
  color: aliceblue;
}

</style>
