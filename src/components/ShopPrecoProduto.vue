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
                                <!-- <b-form-input
                                    class="text-right"
                                    size="sm"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    v-model.number="dado.valor"
                                    @change="marcarAlterado(dado)"
                                    placeholder="Valor"
                                ></b-form-input> -->
                                <b-form-input
                                    size="sm"
                                    type="text"
                                    v-model="dado.valor"
                                    @input="formatarNumero(dado)"
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
                                  aria-placeholder="Qtd"
                                  type="number"
                                  min="0"
                                  v-model.number="dado.qtdest"
                                  @change="marcarAlterado(dado)"
                                  placeholder="Qtd"
                              ></b-form-input>
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
      salvar() {
        const itensParaSalvar = this.produtos.filter(
          (p) => p.alterado && (p.qtdest > 0 || p.valor > 0)
        );
        console.log('itensParaSalvar', itensParaSalvar)
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
          .post(`/insertShopPrecoItens`, itensParaSalvar)
          .then(() => {
            this.$store.state.mensagens = [
              {
                texto: "Dados salvos com sucesso!",
                tipo: "success",
                tempo: 2,
                dismissCountDown: 0,
              },
            ];
            this.carregarProdutos();
          })
          .catch((err) => {
            console.error(err);
          });
      },

        formatarNumero(dado) {
            // Aceita apenas números e ponto, e converte vírgula em ponto
            let limpo = dado.valor.toString().replace(',', '.').replace(/[^0-9.]/g, '');
            // Se houver mais de um ponto, mantém só o primeiro
            const partes = limpo.split('.');
            if (partes.length > 2) {
            limpo = partes[0] + '.' + partes.slice(1).join('');
            }
            dado.valor = limpo;
            this.marcarAlterado(dado);
        },

      ordernarLista() {
          this.produtos.sort((a, b) => a.grupo.localeCompare(b.grupo))
      },

      obterdados() {
          //console.log('Token', localStorage.getItem('MQToken'))
          this.$http.get(`loadShopprecoproduto?idshoppreco=${this.idshoppreco}`).then(res => {
              //console.log(res.data)
              this.produtos = res.data.map((item) => ({...item, qtdest: item.qtdest || 0,valor: item.valor || 0}));
              this.$store.state.loading = false
          })
      },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listarProduto {
  font-size: 0.9em;
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
