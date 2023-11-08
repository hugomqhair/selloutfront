<template>
    <div class="promoterObjetivo">
        <h4 align="center">Manutenção de Objetivos</h4>
        <div>
            <div>
                <label>Ano:</label>
                <b-form-select v-model="ano" :options="anos"></b-form-select>
            </div>
            <hr>
            <b-container fluid>
                <b-row>
                    <b-col cols="4" col lg="3">Promoters</b-col>
                    <b-col col lg="3" v-for="mes in trim1" :key="mes"><label> {{ mes }}</label></b-col>
                </b-row>

                <b-row class="my-1" v-for="dado in promoters" :key="dado.id">
                    <b-col cols="4" col lg="3">
                        <label>{{ dado.nome }}</label>
                    </b-col>
                    <b-col col sm="3" v-for="mes in trim1" :key="mes">
                        <b-form-input :v-model="`teste.y${ano}.${mes}`" :id="mes"></b-form-input>
                    </b-col>
                </b-row>
                <div class="mt-4">
                    <b-row>
                        <b-button variant="success" @click="salvar">Salvar</b-button>
                    </b-row>
                </div>
            </b-container>
            <p>{{ ano }}</p>
            <span>{{ teste }}</span>
            <ul>
                <li v-for="(c, i) in teste" :key="i">{{ c }}</li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: 'promoterObjetivo',
    data() {
        return {
            promoters: [],
            anos: ['2023', '2024'],
            meses: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            trim1: ['Jan', 'Fev', 'Mar'],
            teste: {inicio:'semdados', fim:"dados fim"},
            ano: '2023',
            dados:{}
        }
    },
    computed: {
        login() {
            return this.$store.state.login
        },
    },
    created() {
        //console.log(this.$store.state.login)
        if (!this.$store.state.login.token) {
            this.$router.push(`/Login`)
        } else {
            this.consultaPromoter()
        }
    },
    methods: {
        consultaPromoter() {
            this.$http.get(`consulta?operacao=promoter`).then(res => {
                this.promoters = res.data.filter(v => v.gestor === true).map(v => { return { nome: v.nome } })
                console.log(this.promoters)

            }).catch(err => {
                    console.log('ERRO ***', err)
                    this.$store.state.mensagens = [{ texto: 'Falha de Servidor (obterLojas), informar ao TI', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
            })
        },
        salvar(){
            console.log('Jan', this.teste.y2023.Jan)
            console.log('Fev', teste.y2023.Fev)
            this.teste.chave = "chave"
            console.log('teste', this.teste)
        },

    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.promoterObjetivo {
    color: antiquewhite;
}
</style>
