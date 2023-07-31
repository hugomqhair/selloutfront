<template>
  <div class="body">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'ModeloMQ',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
    color: aliceblue;
}
</style>
