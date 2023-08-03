<template>
    <div class="listarProduto">
        <b-list-group >
            <b-list-group-item v-for="dado in dados" class="d-flex justify-content-between align-items-center" id="listarProduto" :key="dado.idproduto">
                <div>
                    <b-avatar variant="success" icon="plus-square" class="mr-3" button :key="dado.idproduto" @click="contar(dado.idproduto,1)"></b-avatar>
                    <b-avatar variant="danger" icon="file-minus"   class="mr-3" button :key="`${dado.idproduto}-menos`"  @click="contar(dado.idproduto,-1)"></b-avatar>
                </div>
                {{ dado.descrprod }} 
                <b-badge variant="dark">{{ dado.qtdneg }}</b-badge>
            </b-list-group-item>
        </b-list-group>
        <!-- <p v-for="dado in dados" :key="dado.idproduto"> {{ dado.idproduto }} - {{ dado.texto }}</p> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            dados: [],
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
            const item = this.dados.find(item => item.idproduto === id);
            item.qtdneg += val;
        },
        salvar() {
            console.log('salvando...')
            const metodo = this.id ? 'patch' : 'post'
            this.$http[metodo](`/insert`, this.dado)
                .then(resp => {
                    this.obterdados()
                    this.dado.texto = ''
                    console.log(resp)
                })
            // .then(_ => {
            // 	this.mensagens.push({
            // 		texto: 'Operação realizada com sucesso!',
            // 		tipo: 'success'
            // 	})
            // })
        },
        obterdados(idsellout) {
            this.$http.get(`loadSelloutitem?idsellout=${idsellout}`).then(res => {
                console.log('obterDados:', res)
                this.dados = res.data
                console.log(res.data)
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
}
</style>
