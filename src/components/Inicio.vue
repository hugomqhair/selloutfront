<template>
  <div id="inicio">
    <div>
      <div>
        <b-card sub-title="Iniciar dia">
          <div>
            <b-form-datepicker id="datepicker-valid" :state="true" v-model="dtcad" 
              placeholder="Selecionar data das vendas"></b-form-datepicker>
          </div>

          <div class="mt-3">
            <span>Seleciona a Loja</span>
            <b-form-select v-model="selected" :options="optionsLojas" align="center"></b-form-select>
            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
          </div>

          <div>
            <b-button class="mt-3" block variant="success" @click="confirmaDia">Iniciar Dia</b-button>
          </div>
        </b-card>
        <p>Valor da Data: {{ dtcad }}</p>

        <b-card-group class="justify-content-between align-items-center mt-1" columns>
          <b-card v-for="sellout in sellouts" :key="sellout.id" border-variant="light" :header="sellout.fmt_dtmov"
            header-bg-variant="dark" header-text-variant="success"  align="center">
            <b-card-text>
              <h4>
                <b-badge :variant="sellout.qtdneg =='0' ? 'dark' : 'success'" id="qtdneg">{{ sellout.qtdneg }}</b-badge>
              </h4>

              {{ sellout.loja }}
              <b-avatar variant="success" icon="box-arrow-in-up-right" class="ml-3" button
                @click="selloutitem(sellout.id, sellout.loja,sellout.fmt_dtmov )"></b-avatar>
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
      optionsLojas: [],
      lojas: [],
      sellouts: []
    }
  },
  computed:{
    login(){
        return this.$store.state.login
    }
  },
  methods: {
    confirmaDia() {
      //console.log('Confirma Dia', this.selected, this.dtcad)
      if(this.selected===null || this.dtcad===''){
        this.$store.state.mensagens = [{ texto: 'Informe os campos Data e Loja!!', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]          
      } else {
        this.$store.state.loading = !this.$store.state.loading
        let insSellout = { idpromoter: this.login.id, idloja: this.selected, dtmov: this.dtcad }
        const metodo = 'post'
        this.$http[metodo](`/insertSellout`, insSellout)
          .then(resp => {
            //console.log(resp)
            if(resp){
              this.obterSellouts()
              this.$store.state.loading = !this.$store.state.loading
            }
          }).catch(err => {
            this.$store.state.mensagens = [{ texto: 'Falha de Servidor (confirmaDia), informar ao TI \n'+err.response.data, tipo: 'danger', tempo: 5, dismissCountDown: 0 }]  
            this.$store.state.loading = false
          })
      }

    },
    obterLojas() {
      //console.log('this.login',this.login)
      this.$http.get(`consulta?operacao=loja&user=${this.login.id}`).then(res => {
        this.lojas = res.data
        this.optionsLojas = this.lojas.map(el => ({ value: el.id, text: el.nome }))
      })
      .catch(err => {
        console.log('ERRO ***', err)
        this.$store.state.mensagens = [{ texto: 'Falha de Servidor (obterLojas), informar ao TI', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
      })
    },
    obterSellouts() {
      this.$http.get(`obterSellouts?idpromoter=${this.login.id}`).then(res => {
        this.sellouts = res.data
        //console.log(this.sellouts)
      }).catch(err => {
        console.log(err)
        this.$store.state.mensagens = [{ texto: 'Falha de Servidor(obterSellouts), informar ao TI', tipo: 'danger', tempo: 0, dismissCountDown: 0 }]

      })
    },
    selloutitem(idsellout, loja, data_selected) {
      this.$store.state.loading = !this.$store.state.loading
      this.$router.push(`/SelloutItem/${idsellout}`)
      //console.log(loja, data_selected)
      this.$store.state.selectLoja = loja
      this.$store.state.selectData = data_selected
    }
  },
  created() {
    //console.log('inicio',this.$store.state.login.token)
    if(!this.$store.state.login.token){
      this.$router.push(`/Login`)
    }else{
      this.obterLojas()
      this.obterSellouts()
      this.$store.state.loading = false
    }
  },
  

}
</script>

<style>
#qtdneg{
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>
