<template>
  <div id="inicio">
    <div>
      <div>
        <b-card title="Olá Fulano" sub-title="Iniciar dia">
          <div>
            <b-form-datepicker id="datepicker-valid" :state="true" v-model="dtcad"
              placeholder="Selecionar data das vendas"></b-form-datepicker>
          </div>

          <div class="mt-3">
            <span>Seleciona a Loja</span>
            <b-form-select v-model="selected" :options="optionsLojas"></b-form-select>
            <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
          </div>

          <div>
            <b-button block variant="success" @click="confirmaDia">Iniciar Dia</b-button>
          </div>
          <router-link to="/SelloutItem"><a>Items</a></router-link>
        </b-card>
        <p>Valor da Data: {{ dtcad }}</p>

        <b-card-group deck>
          <b-card v-for="sellout in sellouts" :key="sellout.id"
            border-variant="light" :header="sellout.fmt_dtmov" header-bg-variant="dark" header-text-variant="success" align="center">
            <b-card-text>
              {{ sellout.loja }}
              <b-avatar variant="success" icon="box-arrow-in-up-right"  class="ml-3" button @click="selloutitem(sellout.id)"></b-avatar>
            </b-card-text>
          </b-card>
        </b-card-group>

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'inicio',
  data() {
    return {
      dtcad: '',
      selected: null,
      // options: [
      //   { value: 1, text: 'SUMIRE' },
      //   { value: 2, text: 'GOYA' },
      //   { value: 3, text: 'IKESAKI' },
      //   { value: 4, text: 'LOJAS REDE' },
      // ],
      optionsLojas:[],
      lojas:[],
      sellouts:[]
    }
  },
  methods: {
    confirmaDia() {
      console.log('Confirma Dia', this.selected, this.dtcad)
    },
    obterLojas() {
      this.$http.get('consulta?operacao=loja').then(res => {
        this.lojas = res.data
        this.optionsLojas = this.lojas.map( el => ({value:el.id, text:el.nome}) )
      })
    },
    obterSellouts(){
      this.$http.get('obterSellouts?idpromoter=1').then(res => {
        this.sellouts = res.data
        console.log(this.sellouts)
      })
    },
    selloutitem(idsellout){
      this.$router.push(`/SelloutItem/${idsellout}`)
    }
  },
  created() {
        this.obterLojas()
        this.obterSellouts()
    },

}
</script>

<style>
/* #inicio {
  background-color: azure;

} */

/* #footer{
  margin-bottom: 0px;
} */</style>
