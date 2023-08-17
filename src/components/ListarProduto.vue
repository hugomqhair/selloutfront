<template>
    <div class="listarProduto">
        <div class="mb-2 sticky-top align-items-center" id="salvarDados">

            <b-list-group-item class="d-flex justify-content-between align-items-center" id="avatar">
                <b-avatar v-if="selectData != ''" variant="warning" class="mr-2" icon="arrow-left-square" @click="home"
                    button></b-avatar>
                <b-button class="mt-3" variant="success" @click="salvarVenda">Salvar Dados</b-button>
                <div v-if="selectData != ''" id="dadossellout">
                    <b-row>
                        <b-badge variant="light" class="mr-2">{{ selectLoja }}</b-badge>
                    </b-row>
                    <b-row>
                        <b-badge variant="secondary">{{ selectData }}</b-badge>
                    </b-row>
                </div>

            </b-list-group-item>
        </div>
        <b-list-group>
            <b-list-group-item v-for="dado in produtos" class="d-flex justify-content-between align-items-center mt-1"
                id="listarProduto" :key="dado.idproduto">
                <b-badge pill :variant="cores[dado.idgrupo > 8 ? 7 : dado.idgrupo - 1]" id="descrGrupo">{{ dado.grupo
                }}</b-badge>
                <b-avatar variant="success" icon="plus-square" class="m-2" id="somarItem" button :key="dado.idproduto"
                    @click="contar(dado.idproduto, 1)"></b-avatar>
                <div class="flex-grow-1 align-items-center">
                    {{ dado.descrprod }}
                </div>
                <h4>
                    <b-badge :variant="dado.qtdneg == '0' ? 'dark' : 'success'" id="qtdneg">{{ dado.qtdneg }}</b-badge>
                </h4>
                <!-- <b-avatar variant="danger" class="mr-2" icon="cart-x"></b-avatar> -->
                <h6>
                    <!-- <b-avatar variant="danger" id="faltaEstoque" icon="emoji-frown"></b-avatar> -->
                    <b-avatar button variant="danger" id="faltaEstoque" icon="emoji-frown" size="1.5rem" @click="faltaEstoque(dado.idproduto, -1)"></b-avatar>
                </h6>
            </b-list-group-item>
        </b-list-group>
        <hr>
        <b-list-group>
            <b-list-group-item v-for="falta in listaFaltas" class="d-flex justify-content-between align-items-center mt-1" :key="falta.idproduto">
                <div class="flex-grow-1 align-items-center">
                    {{ falta.descrprod }}
                </div>
                <b-avatar button variant="success" id="faltaEstoque" icon="emoji-smile" size="1.5rem" @click="faltaEstoque(dado.idproduto, -1)"></b-avatar>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            produtos: [],
            // {id:1, nome:'PRANCHA', qtdneg:0},
            // { id:2, nome:'SECADOR', qtdneg:0},
            // {id:3, nome:'MAQ CORTE', qtdneg:0},
            // {id:4, nome:'ESC 001.01', qtdneg:0},
            // {id:5, nome:'ESC 002.01', qtdneg:0},
            // {id:6, nome:'MODELADOR CURLING', qtdneg:0},
            // {id:7, nome:'PRANCHA SLIM', qtdneg:0},
            listaFaltas:[],
            id: null,
            selloutid: this.$route.params.id,
            cores: ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'secondary']
        }
    },
    created() {
        this.obterdados(this.selloutid)

        //console.log('idsellout', this.selloutid)
    },
    computed: {
        user() {
            return this.$store.state.user
        },
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
        salvarVenda() {
            this.$store.state.loading = !this.$store.state.loading
            let salvaItens = this.produtos.filter(val => val.qtdneg > 0).map(obj => ({ idproduto: obj.idproduto, qtdneg: obj.qtdneg })).map(produto => ({ ...produto, idsellout: this.selloutid }))
            let faltas = this.listaFaltas.map(obj => ({ idproduto: obj.idproduto, qtdneg: obj.qtdneg })).map(produto => ({ ...produto, idsellout: this.selloutid }))
            //console.log(salvaItens)
            this.$http.post(`/insertSelloutItem`, [salvaItens,faltas])
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
                this.produtos = res.data
                this.$store.state.loading = false
                //console.log(this.produtos)
            })
        },
        faltaEstoque(id){
            // console.log('faltaEstoque)', id, qtdneg)
            // let temp = this.produtos.filter( val => val.idproduto === id)
            this.listaFaltas.push(this.produtos.filter( val => val.idproduto === id)[0])
            this.produtos = this.produtos.filter(val => val.idproduto != id)
            //console.log(this.listaFaltas)
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listar {
    color: aliceblue;
    /* grid-area: modelo; */
    justify-content: flex-end;
    padding-right: 20px;
    margin: 20px;

}

#listarProduto {
    font-size: 0.9em;
    /* font-size-adjust: inherit; */
    /* min-width: 500px; */
    /* white-space: nowrap; Impede a quebra de linha */
}

#qtdneg {
    position: absolute;
    top: 5px;
    right: 5px;
}

#faltaEstoque{
    position: absolute;
    bottom: 5px;
    right: 5px;
    /* height: 20%; */
}

#somarItem{
    /* position: absolute; */
    left: 2px;
    /* height: 20%; */

}

#descrGrupo {
    position: absolute;
    top: 1px;
    left: 25%;
    font-size: 0.6em;
    min-width: 30%;
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

@media (max-width: 400px) {
    #dadossellout{
        visibility: hidden;
    }
}
</style>
