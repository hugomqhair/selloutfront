<template>
    <div class="listarProduto">
        <div class="mb-2 sticky-top" id="salvarDados">

            <b-list-group-item class="justify-content-between align-items-center" id="stickybox">
                <b-row>
                    <b-col cols="2"><b-avatar v-if="selectData != ''" variant="warning" class="" icon="arrow-left-square"
                            @click="home" button></b-avatar></b-col>
                    <b-col cols="2">
                        <b-button v-b-modal.modal-semcadastro><b-icon icon="archive" aria-hidden="true"></b-icon></b-button>
                    </b-col>

                    <b-col cols="4"><b-button class="" variant="success" @click="salvarVenda">Salvar</b-button></b-col>
                    <b-col cols="4">
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
            <b-list-group-item v-for="dado in produtos" class="d-flex align-items-center mt-1" id="listarProduto"
                :key="dado.idproduto" :variant="dado.semestoque ? 'dark' : null">
                <!-- Grupos -->
                <b-badge pill :variant="cores[dado.idgrupo > 8 ? 7 : dado.idgrupo - 1]" id="descrGrupo">{{ dado.grupo
                }}</b-badge>
                <!-- Botão Somar -->
                <b-button pill v-if="!dado.semestoque" variant="success" class="m-1" :key="dado.idproduto" id="somarItem"
                    @click="contar(dado.idproduto, 1)"><b-icon icon="plus-square"></b-icon></b-button>
                <!-- <b-avatar variant="success" icon="plus-square" class="m-1" id="somarItem" button :key="dado.idproduto"
                    @click="contar(dado.idproduto, 1)"></b-avatar> -->
                <!-- Descrição do Produto -->
                <!-- class="flex-grow-2 align-items-center ml-4" -->
                <div id="descrProduto">
                    {{ dado.descrprod }}
                </div>
                <!-- Contador de quantidade  TEMP: $bvModal.show('modal-zerarQtd')-->
                <h4 v-if="!dado.semestoque">
                    <b-badge :variant="dado.qtdneg == '0' ? 'dark' : 'success'" id="qtdneg"
                        @click="modalZerarQtd(dado.idproduto, dado.descrprod)">{{ dado.qtdneg }}</b-badge>
                </h4>
                <!-- Botão não tem na loja -->
                <h6>
                    <b-avatar button :variant="dado.semestoque ? 'primary' : 'secondary'" aria-hidden="true" id="ruptura"
                        icon="cart-plus-fill" size="1.5rem"
                        @click="semEstoque(dado.idproduto, !dado.semestoque)"></b-avatar>
                    <b-avatar button variant="secondary" id="semCadastro" icon="archive" size="1.5rem"
                        @click="semCadastro(dado.idproduto, !dado.semcadastro)"></b-avatar>
                </h6>
            </b-list-group-item>
        </b-list-group>
        <!-- </transition-group> -->

        <!-- item não existe na loja -->
        <b-modal id="modal-semcadastro" title="Sem Cadastro">
            <p class="my-1">Lista de itens sem cadastro na loja</p>
            <b-list-group>
                <b-list-group-item v-for="falta in semcadastro" variant="secondary"
                    class="d-flex justify-content-between align-items-center mt-1" :key="falta.idproduto">
                    <div class="flex-grow-1 align-items-center">
                        {{ falta.descrprod }}
                    </div>
                    <b-avatar button variant="success" id="definir" icon="arrow-down-circle" size="1.5rem"
                        @click="comCadastro(falta.idproduto, !falta.semcadastro)">
                    </b-avatar>
                </b-list-group-item>
            </b-list-group>
        </b-modal>

        <!-- Modal Confirmar zerar quantidade item   -->
        <div>
            <b-modal ref="modal-zerarQtd" hide-footer title="Zerar Quantidade para o  Item?">
                <!-- <p><strong>{{ itemZerar.id }} - {{ itemZerar.descrprod }}</strong></p> -->
                <!-- <p><strong>{{ itemZerar}}</strong></p> -->
                <p>{{ itemId }} - <strong>{{ itemDescr }}</strong></p>
                <b-row>
                    <b-col lg="12" class="justify-content-between align-items-center">
                        <b-button variant="success" @click="zerarItem(itemId)">Confirma</b-button>
                        <b-button class="ml-2" variant="outline-danger"  @click="$refs['modal-zerarQtd'].toggle('#toggle-btn')">Cancelar</b-button>
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
            semcadastro: [],
            id: null,
            selloutid: this.$route.params.id,
            cores: ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'secondary'],
            itemZerar:{},
            itemDescr:'XX',
            itemId:''
        }
    },
    created() {
        if (!this.$store.state.login.token) {
            this.$router.push(`/Login`)
        } else {
            this.obterdados(this.selloutid)
        }
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
        contar(id, val) {
            //this.qtdneg += val
            const item = this.produtos.find(item => item.idproduto === id);
            item.qtdneg += val;
        },
        semEstoque(id, val) {
            // console.log(id, val)
            const item = this.produtos.find(item => item.idproduto === id);
            item.semestoque = val;
        },
        semCadastro(id, val) {
            const item = this.produtos.find(item => item.idproduto === id);
            item.semcadastro = val;
            this.semcadastro.push(this.produtos.filter(val => val.idproduto === id)[0])
            this.produtos = this.produtos.filter(val => val.idproduto != id)
        },
        comCadastro(id, val) {
            console.log(val)
            const item = this.semcadastro.find(item => item.idproduto === id);
            item.semcadastro = false;
            this.produtos.push(this.semcadastro.filter(val => val.idproduto === id)[0])
            this.semcadastro = this.semcadastro.filter(val => val.idproduto != id)
            this.ordernarLista()

        },
        modalZerarQtd(id, descrprod){
            this.itemDescr = descrprod
            this.itemId = id
            this.$refs['modal-zerarQtd'].show()
//            console.log(this.itemZerar)
        },
        zerarItem(id) {
            const item = this.produtos.find(item => item.idproduto === id);
            item.qtdneg = 0;
            this.$refs['modal-zerarQtd'].toggle('#toggle-btn')
        },
        ordernarLista() {
            this.produtos.sort((a, b) => a.grupo.localeCompare(b.grupo))
            //nomes.sort((a, b) => a.nome.localeCompare(b.nome));
        },
        salvarVenda() {
            this.$store.state.loading = !this.$store.state.loading
            this.produtos = this.produtos.concat(this.semcadastro)
            // let salvaItens = this.produtos.filter(val => val.qtdneg > 0 || val.semestoque || val.semcadastro)
            //     .map(obj => ({ idproduto: obj.idproduto, qtdneg: obj.qtdneg, semcadastro: obj.semcadastro, semestoque: obj.semestoque }))
            //     .map(produto => ({ ...produto, idsellout: this.selloutid }))
            let salvaItens = this.produtos.map(obj => ({ idsellout: this.selloutid, idproduto: obj.idproduto, qtdneg: obj.qtdneg, semcadastro: obj.semcadastro, semestoque: obj.semestoque }))
            //let faltas = this.listaFaltas.map(obj => ({ idproduto: obj.idproduto, qtdneg: obj.qtdneg })).map(produto => ({ ...produto, idsellout: this.selloutid }))
            //console.log(salvaItens)
            this.$http.post(`/insertSelloutItem`, salvaItens)
                .then(resp => {
                    if (resp) {
                        this.$store.state.mensagens = [{ texto: 'Sellout do dia gravado!!! ', tipo: 'success', tempo: 2, dismissCountDown: 0 }]
                        this.obterdados(this.selloutid)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        obterdados(idsellout) {
            //console.log('Token', localStorage.getItem('MQToken'))
            this.$http.get(`loadSelloutitem?idsellout=${idsellout}`).then(res => {
                //console.log(res.data)
                this.produtos = res.data.filter(item => item.semcadastro == false)
                this.semcadastro = res.data.filter(item => item.semcadastro == true)
                this.$store.state.loading = false
                //console.log(this.produtos)
            })
        },

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listarProduto {
    font-size: 0.9em;
    /* font-size-adjust: inherit; */
    /* min-width: 100%; */
    min-height: 70px;
    /* white-space: nowrap; Impede a quebra de linha */
}


#stickybox {
    background-color: #1f1f1f;
}

#somarItem {
    position: absolute;
    /* margin-left: 20px; */
    /* padding: 0; */
    /* display: block; */
    margin: 0;
    left: 5px;
    top: 1px;
    /* height: 20%; */

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
    /* margin-block-start: 10%; */
    /* left: 10px; */
}

#qtdneg {
    position: absolute;
    top: 5px;
    right: 5px;
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
    padding: auto;
    margin: 0px;
    /* justify-content: center;
    align-items: center; */
    /* max-width: 300px; */
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
