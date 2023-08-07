<template>
    <div class="listarProduto">
        <div class="mb-2">
            <b-button class="mt-3" block variant="success" @click="salvarVenda">Salvar Dados</b-button>
        </div>
        <b-list-group >
            <b-list-group-item v-for="dado in produtos" class="d-flex justify-content-between align-items-center mt-1" id="listarProduto" :key="dado.idproduto">
                <div>
                    <b-avatar variant="success" icon="plus-square" class="mr-3" button :key="dado.idproduto" @click="contar(dado.idproduto,1)"></b-avatar>
                    <b-avatar variant="danger" icon="file-minus"   class="mr-3" button :key="`${dado.idproduto}-menos`"  @click="contar(dado.idproduto,-1)"></b-avatar>
                </div>
                <div class="descrprod">
                    {{ dado.descrprod }} 
                </div>
                <b-badge variant="dark">{{ dado.qtdneg }}</b-badge>
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
            id: null,
            selloutid : this.$route.params.id
        }
    },
    created() {
        this.obterdados(this.selloutid)
        //console.log('idsellout', this.selloutid)
    },
    methods: {
        contar(id, val){
            //this.qtdneg += val
            const item = this.produtos.find(item => item.idproduto === id);
            item.qtdneg += val;
        },
        salvarVenda() {
            let salvaItens = this.produtos.filter(val => val.qtdneg>0).map( produto => ({...produto, idsellout: this.selloutid }))
            //console.log(salvaItens)
            this.$http.post(`/insertSelloutItem`, salvaItens)
                .then(resp => {
                    if(resp){
                        this.obterdados()
                    }
                })
        },
        obterdados(idsellout) {
            //console.log('Token', localStorage.getItem('MQToken'))
            this.$http.get(`loadSelloutitem?idsellout=${idsellout}`).then(res => {
                this.produtos = res.data
            })
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listar {
    color: aliceblue;
    grid-area: modelo;
    justify-content: flex-end;
    padding-right: 20px;
    margin: 20px;

}

#listarProduto{
    font-size: 1.2em;
    white-space: nowrap; /* Impede a quebra de linha */
}
.descrprod{
    white-space: nowrap; /* Impede a quebra de linha */
    overflow: hidden; /* Esconde o conteúdo que não cabe */
    text-overflow: ellipsis; /* Adiciona reticências (...) quando o texto estiver cortado */

}
</style>
