<template>
  <div class="listarProduto">
      <div class="mb-2 sticky-top" id="salvarDados">

          <b-list-group-item class="justify-content-between align-items-center" id="stickybox">
              <b-row>
                  <b-col cols="2">
                      <b-button variant="warning" size="sm">
                          <b-icon v-if="selectData != ''" class="" icon="arrow-left-square" @click="home" button>
                          </b-icon>
                      </b-button>
                  </b-col>
                  <!-- <b-col cols="2">
                      <b-button size="sm" v-b-modal.modal-semcadastro><b-icon icon="archive"
                              aria-hidden="true"></b-icon></b-button>
                  </b-col>
                  <b-col cols="2">
                      <b-button size="sm" bg-light @click="filtraAlterados = !filtraAlterados">
                          <b-icon scale="1.5" icon="check-square" :variant="filtraAlterados ? 'success' : 'light'"
                              aria-hidden="true"></b-icon>
                      </b-button>
                  </b-col> -->


                  <b-col cols="3"><b-button size="sm" class="" variant="success"
                          @click="salvar">Salvar</b-button></b-col>
                  <b-col cols="3">
                      <div v-if="selectData != ''" id="dadossellout" class="d-block w-100 justify-content-between">
                          <b-row>
                              <b-badge variant="light">{{ selectLoja.length > 15 ? selectLoja.substring(0, 15) + '...' :
                                  selectLoja }}</b-badge>
                              <b-badge variant="secondary">{{ selectData }}</b-badge>
                          </b-row>


                      </div>
                  </b-col>
              </b-row>
          </b-list-group-item>
      </div>
      <!-- <transition-group name="slide"> -->
      <b-list-group id="b-list-group">
          <template v-for="dado in produtos">
              <b-list-group-item 
                  class="" id="listarProduto" :key="dado.idproduto"
                  :variant="dado.semestoque ? 'dark' : null">
                  <b-row>

                      <b-col cols="6">
                          <b-badge lass="d-flex justify-content-center" pill :variant="cores[dado.idgrupo > 8 ? 7 : dado.idgrupo - 1]" id="descrGrupo">{{ dado.grupo }}</b-badge>
                          <div id="descrProduto" class="d-flex justify-content-center">
                              {{ dado.descrprod }}
                          </div>
                      </b-col>
                      <b-col cols="3">
                          <div class="inputValor">
                                <label class="text-sm">Valor</label>
                                <b-form-input
                                size="sm"
                                type="text"
                                inputmode="decimal"
                                pattern="[0-9]*[.,]?[0-9]*"
                                v-model="dado.valor"
                                @change="marcarAlterado(dado)"
                                placeholder="Valor"
                                class="text-right"
                                />
                            </div>
                      </b-col>
                      <b-col cols="3">
                        <label class="text-sm">Estoque</label>
                          <div class="inputQtd">
                            <b-form-input
                                size="sm"
                                inputmode="numeric" 
                                pattern="[0-9]*" 
                                type="text"      
                                v-model="dado.qtdest"
                                @input="formatarQtd(dado)"
                                placeholder="Qtd"
                                class="text-right"
                            />
                            </div>
                      </b-col>
                  </b-row>
              </b-list-group-item>
          </template>
      </b-list-group>


      <!-- Modal Confirmar zerar quantidade item   -->
      <div>
          <b-modal ref="modal-zerarQtd" hide-footer title="Zerar Quantidade para o  Item?">
              <!-- <p><strong>{{ itemZerar.id }} - {{ itemZerar.descrprod }}</strong></p> -->
              <!-- <p><strong>{{ itemZerar}}</strong></p> -->
              <p>{{ itemId }} - <strong>{{ itemDescr }}</strong></p>
              <b-row>
                  <b-col lg="12" class="justify-content-between align-items-center">
                      <b-button variant="success" @click="zerarItem(itemId)">Confirma</b-button>
                      <b-button class="ml-2" variant="outline-danger"
                          @click="$refs['modal-zerarQtd'].toggle('#toggle-btn')">Cancelar</b-button>
                  </b-col>
              </b-row>
          </b-modal>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          produtos: [],
          listaOriginal: [],
          id: null,
          idshoppreco: this.$route.params.id,
          cores: ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'secondary'],
          itemZerar: {},
          itemDescr: 'XX',
          itemId: '',
          filtraAlterados: false,
      }
  },
  created() {
      if (!this.$store.state.login.token) {
          this.$router.push(`/Login`)
      } else {
          this.obterdados(this.selloutid)
      }
  },
  mounted() {

  },
  computed: {
      selectLoja() {
          return this.$store.state.selectLoja
      },
      selectData() {
          return this.$store.state.selectData
      }

  },
  methods: {
      home() {
          this.$store.state.selectData = ''
          this.$router.push(`/`)
      },

      marcarAlterado(produto) {
        produto.alterado = true;
      },
    prepararParaSalvar(produto) {
        const raw = String(produto.valor || '').replace(',', '.');
        const valor = parseFloat(raw);
        return isNaN(valor) ? 0 : valor;
    },
      salvar() {
        this.$store.state.loading = !this.$store.state.loading
        const itensParaSalvar = this.produtos.filter(
          (p) => p.alterado && (p.qtdest > 0 || p.valor > 0)
        ).map(p => ({
        idshoppreco: this.idshoppreco,    
        idproduto: p.idproduto,
        qtdest: parseInt(p.qtdest) || 0,
        valor: this.prepararParaSalvar(p)
      }));
        // console.log('itensParaSalvar', itensParaSalvar)
        if (itensParaSalvar.length === 0) {
          this.$store.state.mensagens = [
            {
              texto: "Nenhuma alteração para salvar.",
              tipo: "warning",
              tempo: 2,
              dismissCountDown: 0,
            },
          ];
          return;
        }
  
        this.$http
          .post(`/insertShopPrecoItem`, itensParaSalvar)
          .then(() => {
            this.$store.state.mensagens = [
              {
                texto: "Dados salvos com sucesso!",
                tipo: "success",
                tempo: 2,
                dismissCountDown: 0,
              },
            ];
            this.obterdados();
          })
          .catch((err) => {
            console.error(err);
          });
      },

      formatarNumero(dado) {
        let val = String(dado.valor).replace(',', '.').replace(/[^0-9.]/g, '');
        // limita para 2 casas decimais
        val = parseFloat(val).toFixed(2);
        if (!isNaN(val)) {
            dado.valor = val;
            dado.alterado = true;
        }
    },
    formatarQtd(dado) {
    let val = String(dado.qtdest).replace(/\D/g, ''); // remove não dígitos
    dado.qtdest = val === '' ? 0 : parseInt(val);
    dado.alterado = true;
    },

      ordernarLista() {
          this.produtos.sort((a, b) => a.grupo.localeCompare(b.grupo))
      },

      obterdados() {
          //console.log('Token', localStorage.getItem('MQToken'))
          this.$http.get(`loadShopprecoproduto?idshoppreco=${this.idshoppreco}`).then(res => {
              //console.log(res.data)
              this.produtos = res.data.map((item) => ({...item, idshoppreco: this.idshoppreco, qtdest: item.qtdest ,valor: item.valor }));
              this.$store.state.loading = false
          })
      },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listarProduto {
  font-size: 0.8em;
  min-height: 70px;
  position: relative; /* Necessário para posicionar filhos com absolute */
}

label{
  font-size: 0.8em;
}


#stickybox {
  background-color: #1f1f1f;
}



#semCadastro {
  position: absolute;
  bottom: 5px;
  right: 5px;
  /* height: 20%; */
}

#ruptura {
  position: absolute;
  bottom: 5px;
  right: 3em;
  margin-right: 5px;
  /* height: 20%; */
}


#salvarDados {
  /* background-color: antiquewhite; */
  /* border-radius: 1%; */
  border-radius: 10px;
  border-color: darkgrey;
  border-style: dotted;
  /* padding: auto; */
  margin: 0px;
  /* justify-content: center;
  align-items: center; */
  /* max-width: 300px; */
}

#dadossellout {
  font-size: 0.9em;
}

@media (max-width: 340px) {
  #dadossellout {
      visibility: hidden;
  }


  .fade-enter,
  .fade-leave-to {
      opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
      transition: opacity 2s;
  }

  .slide-enter-active {
      animation: slide-in 2s ease;
      transition: opacity 2s;
  }

  .slide-leave-active {
      animation: slide-ou 2s ease;
      transition: opacity 2s;
  }

  .slide-enter,
  .slide.leave-to {
      opacity: 0;
  }

}
</style>
