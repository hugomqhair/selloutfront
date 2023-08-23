<template>
    <div class="resultadoMensal">
        <h1>Olá, Fuluno</h1>
        <h6>Objetivo Mensal {{ objetivo }}, considerando {{ diasmes }} dias</h6>

        <b-card-group class="justify-content-between align-items-center mt-1" columns>
            <b-card v-for="mes in mensal" :key="mes.mes" border-variant="light" :header="mes.mes" header-bg-variant="dark"
                header-text-variant="success" align="center">
                <b-card-text>
                    <h4>
                        <b-badge :variant="mes.venda == '0' ? 'dark' : 'success'" id="qtdneg">{{ mes.venda }}</b-badge>
                    </h4>
                    <span id="qtdnegdias"> {{ mes.percperiodo }}% do objetivo </span>
                    <b-progress striped height="2rem" :value="(mes.qtdneg / objetivo) * 100" max="100" show-progress
                        class="mb-2" :variant="mes.cor"></b-progress>
                    <span id="qtdnegdias">{{ mes.qtdneg }} vendas em {{ mes.dias }} dias</span>

                </b-card-text>
            </b-card>
        </b-card-group>

    </div>
</template>

<script>
export default {
    name: 'resultadoMensal',
    data() {
        return {
            mensal: [
                { mes: "Jan/2023", qtdneg: 110, dias: 20 },
                { mes: "Fev/2023", qtdneg: 80, dias: 20 },
                { mes: "Mar/2023", qtdneg: 85, dias: 20 },
                { mes: "Abri/2023", qtdneg: 60, dias: 20 },
                { mes: "Mai/2023", qtdneg: 46, dias: 19 },
                { mes: "Jun/2023", qtdneg: 16, dias: 3 }
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
        corObjetivo() {
            this.mensal = this.mensal.map(val => {
                let diasperiodo = (val.dias / this.diasmes)
                let objetivoperiodo = (this.objetivo * diasperiodo)
                let percperiodo = ((val.qtdneg / objetivoperiodo) * 100).toFixed(0)
                let cor
                if (percperiodo < 60) {
                    cor = 'danger'
                } else if (percperiodo < 80) {
                    cor = 'warning'
                } else {
                    cor = "success"
                }
                return { ...val, percperiodo, cor }

            })
        },
        resultadoMensal() {
            //console.log('this.login',this.login)
            this.$http.get(`consulta?operacao=resultadomensal&user=${this.login.id}`).then(res => {
                this.mensal = res.data
                this.corObjetivo()
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
.resultadoMensal {
    color: antiquewhite;
}

#qtdnegdias {
    color: black;
    font-size: small;
}
</style>
