<template>
    <div class="listarProduto">
        <div class="mb-2">
            <b-button class="mt-3" block variant="success" @click="salvarVenda">Salvar Dados</b-button>
        </div>
        <b-list-group>
            <b-list-group-item v-for="dado in produtos" class="d-flex justify-content-between align-items-center mt-1" id="listarProduto" :key="dado.idproduto">
                <b-badge pill :variant="cores[dado.idgrupo > 8 ? 7 : dado.idgrupo -1]" id="descrGrupo">{{ dado.grupo }}</b-badge>
                <b-avatar variant="success" icon="plus-square" class="m-1" button :key="dado.idproduto" @click="contar(dado.idproduto,1)"></b-avatar>
                <!-- <b-avatar variant="danger" icon="file-minus"   class="m-1" button :key="`${dado.idproduto}-menos`"  @click="contar(dado.idproduto,-1)"></b-avatar> -->
                <div class="flex-grow-1">
                    {{ dado.descrprod }} 
                </div>
                <h3>
                    <b-badge :variant="dado.qtdneg =='0' ? 'dark' : 'success'" id="qtdneg">{{ dado.qtdneg }}</b-badge>
                </h3>
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
            selloutid : this.$route.params.id,
            cores:['primary','success', 'danger', 'warning', 'info','light','dark','secondary']
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
            this.$store.state.loading = !this.$store.state.loading
            let salvaItens = this.produtos.filter(val => val.qtdneg>0).map(obj => ({idproduto:obj.idproduto, qtdneg:obj.qtdneg})).map( produto => ({...produto, idsellout: this.selloutid }))
            //console.log(salvaItens)
            this.$http.post(`/insertSelloutItem`, salvaItens)
                .then(resp => {
                    if(resp){
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
    font-size: 1em;
    /* white-space: nowrap; Impede a quebra de linha */
}

#qtdneg{
    position: absolute;
    top: 5px;
    right: 5px;
}
#descrGrupo {
    position: absolute;
    top: 1px;
    left: 40%;
    font-size: 0.6em;
}
/* #buttons{
    height: 25px;
    width: 25px;
} */

/* .descrprod{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
} */
</style>
