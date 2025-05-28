<template>
    <div class="listarShopPreco">
          <b-list-group-item class="justify-content-between align-items-center" id="stickybox">
            <b-row>
                <template v-for="produto in produtos">
                    <b-list-group-item
                        :key="produto.idproduto"
                        class="d-flex align-items-center mt-1"
                        id="listarProduto"
                    >
                        <!-- Grupo -->
                        <b-badge
                        pill
                        :variant="cores[produto.idgrupo > 8 ? 7 : produto.idgrupo - 1]"
                        id="descrGrupo"
                        >{{ produto.grupo }}</b-badge
                        >
            
                        <!-- Descrição Produto -->
                        <div id="descrProduto">{{ produto.descrprod }}</div>
            
                        <!-- Input Quantidade -->
                        <div class="inputQtd">
                        <b-form-input
                            size="sm"
                            type="number"
                            min="0"
                            v-model.number="produto.qtdest"
                            @change="marcarAlterado(produto)"
                            placeholder="Qtd"
                        ></b-form-input>
                        </div>
            
                        <!-- Input Valor -->
                        <div class="inputValor">
                        <b-form-input
                            size="sm"
                            type="number"
                            step="0.01"
                            min="0"
                            v-model.number="produto.valor"
                            @change="marcarAlterado(produto)"
                            placeholder="Valor"
                        ></b-form-input>
                        </div>
                    </b-list-group-item>
                </template>
            </b-row>
        </b-list-group-item>
 
  
      <!-- Botão Salvar -->
      <div class="mt-3">
        <b-button variant="success" @click="salvar">Salvar</b-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ShopPrecoProduto",
    data() {
      return {
        produtos: [],
        idshoppreco: this.$route.params.id,
        cores: ["primary", "success", "danger", "warning", "info", "light", "dark", "secondary"],
      };
    },
    created() {
      this.carregarProdutos();
    },
    methods: {
      carregarProdutos() {
        this.$http
          .get(`loadShopprecoproduto?idshoppreco=${this.idshoppreco}`)
          .then((res) => {
            this.produtos = res.data.map((item) => ({
              ...item,
              qtdest: item.qtdest || 0,
              valor: item.valor || 0,
            }));
          });
      },
      marcarAlterado(produto) {
        produto.alterado = true;
      },
      salvar() {
        const itensParaSalvar = this.produtos.filter(
          (p) => p.alterado && (p.qtdest > 0 || p.valor > 0)
        );
  
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
    },
  };
  </script>
  
  <style scoped>
  #listarShopPreco {
    font-size: 0.9em;
    min-height: 70px;
    
  }
  
  #descrGrupo {
    position: absolute;
    top: 1px;
    left: 25%;
    font-size: 0.6em;
    min-width: 30%;
  }
  
  #descrProduto {
    position: absolute;
    left: 20%;
    right: 15%;
    align-items: center;
    align-self: center;
  }
  
  .inputQtd {
    position: absolute;
    right: 20%;
    width: 15%;
  }
  
  .inputValor {
    position: absolute;
    right: 5px;
    width: 15%;
  }
#stickybox {
    background-color: #1f1f1f;
}
  </style>
  