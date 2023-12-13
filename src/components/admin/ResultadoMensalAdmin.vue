<template>
    <div class="resultadoMensalAdmin">
        <b-row>
            <filtroPadro v-on:filtraranomes="getFiltros($event)"></filtroPadro>
            <!-- <b-col cols="1">
                <b-button variant="warning" @click="$router.push('/MenuAdmin')" class="d-sm-hidden">
                    <b-icon class="" icon="arrow-left-square" button>
                    </b-icon>
                </b-button>
            </b-col> -->
            <!-- <b-col cols="11"> -->
            <b-card-group class="justify-content-between align-items-center m-2" deck>
                <b-card border-variant="light" header="Resultado Geral" header-bg-variant="dark" footer-tag="footer"
                    header-text-variant="success" align="center">
                    <b-card-text class="d-flex justify-content-between align-items-center">
                        <b-button variant="outline-secondary">Objetivo <b-badge variant="dark">{{ objetivoTotal
                        }}</b-badge></b-button>
                        <b-button variant="outline-success">Realizado <b-badge variant="success">{{ quantTotal
                        }}</b-badge></b-button>
                    </b-card-text>
                    <b-card-text>
                        <div class="mt-2">
                            <span class="">% Objetivo Mensal</span>
                        </div>
                        <b-progress striped height="2rem" :value="(quantTotal / objetivoTotal) * 100" max="100"
                            show-progress class="mb-2" :variant="corTotal"></b-progress>
                        <div id="popover-mediaDiaria">
                            <b-badge :variant="corTotal">{{ percDiarioGeral }}</b-badge><span> % Projetado </span><b-icon
                                icon="exclamation-circle" scale="1" variant="info"></b-icon>
                            <b-popover target="popover-mediaDiaria" triggers="hover" placement="top">
                                <template #title>Como foi calculado?</template>
                                1º Dividimos o total de Vendas pela média de dias trabalhados<br>2º Dividimos o objetivo
                                total pela média de dias do mês (valor fixo de {{ diasmes }} ) <br>3º dividimos a 1º conta
                                com a 2º X 100
                                <hr><em>1º Total Vendas / Média Dias: </em><b>{{ quantTotal }} / {{
                                    (diasTrabalhados / mensal.length).toFixed(0) }}</b>
                                <br><em>2º Total objetivo / Dias mês: </em><b>{{ objetivoTotal }} / {{ diasmes }}</b>
                                <br><em>3º Resultado %: </em><b>{{ percDiarioGeral }}</b>
                            </b-popover>
                        </div>
                    </b-card-text>
                    <template #footer>
                        <div id="popover-mediaDiasGeral">
                            <b-icon icon="exclamation-circle" scale="1" variant="info"></b-icon>
                            <em>Média dias geral {{ mediaDiasGeral }}</em>
                            <b-popover target="popover-mediaDiasGeral" triggers="hover" placement="top">
                                <template #title>Como foi calculado?</template>
                                Somando o Total de dias de cada promotor e dividindo pelo total de promotores
                                <br><em>Dia Trabalhados: </em><b>{{ diasTrabalhados }}</b>
                                <br><em>Total Promotores: </em>{{ mensal.length }}
                                <br><em>Resultado arredondado: </em><b>{{ mediaDiasGeral }}</b>
                            </b-popover>
                        </div>
                    </template>
                </b-card>
            </b-card-group>
            <!-- </b-col> -->
        </b-row>
        <div>
            <b-table table-variant="light" head-variant="dark" striped outlined :items="mensal" :fields="fields" small>
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
            filtros: {},
            fields: [
                { key: "promoter", label: "Promoter", sortable: true }
                , { key: "qtdneg", label: "Qtd", sortable: true, class: "text-right" }
                , { key: "dias", label: "Dias", sortable: true, class: "text-right" }
                , { key: "objetivo", label: "Objetivo", sortable: true, class: "text-right" }
                , { key: "objetivoperiodo", label: "% Mês", sortable: true, class: "text-right" }
                // , { key: "percperiodo", label: "% Dia" }
            ],
            // objetivo: 80,
            diasmes: 26,
            objetivoTotal: 0,
            quantTotal: 0,
            diasTrabalhados: 0,
        }
    },
    computed: {
        login() {
            return this.$store.state.login
        },
        mediaDiasGeral() {
            return (this.diasTrabalhados / this.mensal.length).toFixed(0)
        },
        percDiarioGeral() {
            let mediaDiasGeral = (this.diasTrabalhados / this.mensal.length).toFixed(0)
            return (((this.quantTotal / mediaDiasGeral) / (this.objetivoTotal / 25)) * 100).toFixed(1)
        },
        corTotal() {
            let cor
            let mediaDiasGeral = (this.diasTrabalhados / this.mensal.length).toFixed(0)
            let calcCor = (((this.quantTotal / mediaDiasGeral) / (this.objetivoTotal / 25)) * 100).toFixed(1)
            if (calcCor < 60) {
                cor = 'danger'
            } else if (calcCor < 90) {
                cor = 'warning'
            } else {
                cor = "success"
            }
            return cor
        }
    },
    created() {
        //console.log(this.$store.state.login)
        if (!this.$store.state.login.token) {
            this.$router.push(`/Login`)
        } else {
            let now = new Date()
            this.filtros.ano = now.getFullYear()
            this.filtros.mes = String(now.getMonth() + 1).padStart(2, '0')
            //this.resultadoMensal()
        }
    },
    methods: {
        // Objetivo() {
        // },
        resultadoMensal() {
            this.$store.state.loading = !this.$store.state.loading
            //console.log('filtros', this.filtros)
            this.$http.get(`consulta?operacao=resultadoAdmin&ano=${this.filtros.ano}&mes=${this.filtros.mes}`).then(res => {
                this.objetivoTotal = 0
                this.quantTotal = 0
                this.diasTrabalhados = 0
                this.mensal = res.data.map(val => {
                    val.objetivo = (val.objetivo === 0 ? 99 : val.objetivo)
                    let objetivoperiodo = ((val.qtdneg / val.objetivo) * 100).toFixed(2)
                    let diasperiodo = (val.dias / this.diasmes)
                    let objetivoper = (val.objetivo * diasperiodo)
                    let percperiodo = ((val.qtdneg / objetivoper) * 100).toFixed(0)
                    this.objetivoTotal += Number(val.objetivo)
                    this.quantTotal += Number(val.qtdneg)
                    this.diasTrabalhados += Number(val.dias)
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
                this.$store.state.loading = !this.$store.state.loading
            })
                .catch(err => {
                    console.log('ERRO ***', err)
                    this.$store.state.mensagens = [{ texto: 'Falha de Servidor, informar ao TI', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
                })
        },

        getFiltros(filtros) {
            // console.log('filtros', filtros)
            this.filtros = filtros
            //this.mensal = []
            this.resultadoMensal()

        }

    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultadoMensalAdmin {
    /* color: antiquewhite; */
}
</style>
