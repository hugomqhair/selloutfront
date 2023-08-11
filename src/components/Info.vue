<template>
  <div id="info">
    <b-list-group-item class="d-flex align-items-center" id="avatar">
      <b-avatar v-if="selectData!=''" variant="warning" class="mr-2" icon="arrow-left-square" @click="home" button></b-avatar>
      <b-avatar variant="success" class="mr-3" @click="login" button></b-avatar>
      <span class="mr-auto">{{ user }}</span>
    </b-list-group-item>
    <div v-if="selectData!=''" class="d-flex align-items-right">
      <b-badge variant="light" class="ml-2">{{ selectLoja }}</b-badge>
      <b-badge variant="secondary">{{ selectData }}</b-badge>
        <!-- <span>[{{ selectLoja }} - {{selectData  }}]</span> -->
    </div>
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
    user() {
      return this.$store.state.user
    },
    selectLoja(){
      return this.$store.state.selectLoja
    },
    selectData(){
      return this.$store.state.selectData
    }

  },
  methods: {
    login() {
      this.$store.state.user = !this.user ? 'Hugo FQ' : null
    },
    home(){
      this.$store.state.selectData = ''
      this.$router.push(`/`)
    }
  },

}
</script>

<style>
#info {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  color: aliceblue;
  /* border: 1px solid #ccc;  */
}

#avatar {
  background-color: #1f1f1f;
  color: aliceblue;
}

</style>
