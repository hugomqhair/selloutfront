<template>
    <div class="resultadoMensalAdmin">
        <h6>Objetivo Mensal {{ objetivo }}, considerando {{ diasmes }} dias</h6>
        <div>
            <b-table table-variant="light" head-variant="dark" striped outlined :items="mensal" :fields="fields">
                <template #cell(percperiodo)="data">
                    <b :class="data.item.cor">{{ data.value }}</b>
                </template>
                <template #cell(objetivoperiodo)="data">
                    <b :class="data.item.cor">{{ data.value }}</b>
                </template>                
            </b-table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'resultadoMensalAdmin',
    data() {
        return {
            mensal: [],
            fields: [
                { key: "promoter", label: "Promoter", sortable: true }
                , { key: "qtdneg", label: "Qtd", sortable: true }
                ,{key:"dias", label:"Dias", sortable:true}
                , { key: "objetivoperiodo", label: "% Mês" }
                , { key: "percperiodo", label: "% Dia" }
            ],
            objetivo: 80,
            diasmes: 25
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
            this.resultadoMensal()
        }
    },
    methods: {
        Objetivo() {
            this.mensal = this.mensal.map(val => {
                let objetivoperiodo = ((val.qtdneg / this.objetivo) * 100).toFixed(2)
                let diasperiodo = (val.dias / this.diasmes)
                let objetivoper = (this.objetivo * diasperiodo)
                let percperiodo = ((val.qtdneg / objetivoper) * 100).toFixed(0)
                let cor
                if (percperiodo < 60) {
                    cor = 'text-danger'
                } else if (percperiodo < 80) {
                    cor = 'text-warning'
                } else {
                    cor = "text-success"
                }
                return { ...val, objetivoperiodo, percperiodo, cor }

            })
        },
        resultadoMensal() {
            this.$http.get(`consulta?operacao=resultadoAdmin`).then(res => {
                this.mensal = res.data
                this.Objetivo()
                //this.optionsLojas = this.lojas.map(el => ({ value: el.id, text: el.nome }))
            })
                .catch(err => {
                    console.log('ERRO ***', err)
                    this.$store.state.mensagens = [{ texto: 'Falha de Servidor (obterLojas), informar ao TI', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
                })
        },

    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultadoMensalAdmin {
    color: antiquewhite;
}
</style>
