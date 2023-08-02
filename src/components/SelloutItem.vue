<template>
  <div id="Item">
      <ListarProduto></ListarProduto>
    <!-- <Body msg="Mensagem Modelo"/> -->
  </div>
</template>

<script>
// import Body from './components/Body.vue'
import ListarProduto from './ListarProduto.vue'


export default {
  name: 'Item',
  components: {
    // Body,
    ListarProduto,
  }
}
</script>

<style>


/* #footer{
  margin-bottom: 0px;
} */
</style>
