<template>
  <div id="info">
    <b-list-group-item class="d-flex align-items-center" id="avatar">
        <b-avatar variant="success" class="mr-3" @click="login" button></b-avatar>
        <span class="mr-auto">{{ user }}</span>
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
  computed:{
    user(){
        return this.$store.state.user
    }
  },
  methods:{
    login(){
        this.$store.state.user = !this.user ? 'Hugo FQ' : null
    }
  }
}
</script>

<style>
#info{
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    /* border: 1px solid #ccc;  */
}
#avatar{
    background-color:#1f1f1f;
    color: aliceblue;

}

</style>
