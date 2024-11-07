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
                        <b-row>
                            <b-col cols="4">
                                <div id="popover-mediaDiasGeral">
                                    <b-icon icon="exclamation-circle" scale="1" variant="info"></b-icon>
                                    <em> Média dias geral {{ mediaDiasGeral }}</em>
                                    <b-popover target="popover-mediaDiasGeral" triggers="hover" placement="top">
                                        <template #title>Como foi calculado?</template>
                                        Somando o Total de dias de cada promotor e dividindo pelo total de promotores
                                        <br><em>Dia Trabalhados: </em><b>{{ diasTrabalhados }}</b>
                                        <br><em>Total Promotores: </em>{{ mensal.length }}
                                        <br><em>Resultado arredondado: </em><b>{{ mediaDiasGeral }}</b>
                                    </b-popover>
                                </div>
                            </b-col>
                            <b-col cols="4">
                                <div id="popover-calculoCurva">
                                    <b-icon icon="exclamation-circle" scale="1" variant="info"></b-icon>
                                    <em> Cálculo da Curva</em>
                                    <b-popover target="popover-calculoCurva" triggers="hover" placement="top">
                                            <template #title>Como foi calculado?</template>
                                            <b-table table-variant="light" small head-variant="dark" striped outlined :items="popoverFaixa">
                                            </b-table>
                                    </b-popover>
                                </div>
                            </b-col>
                            <b-col cols="4">
                                <b-button variant="info" @click="download">Baixar</b-button>
                            </b-col>
                        </b-row>
                    </template>
                </b-card>
            </b-card-group>
            <!-- </b-col> -->
        </b-row>
        <div id="tabelaMensal">
            <b-table table-variant="light" head-variant="dark" striped outlined :items="mensal" :fields="fields" small
                select-mode="single" selectable @row-selected="selectPromoter">
                <template #cell(percperiodo)="data">
                    <b :class="data.item.cor">{{ data.value }}</b>
                </template>
                <template #cell(objetivoperiodo)="data">
                    <b :class="data.item.cor">{{ data.value }}</b>
                </template>
                <template #cell(vlrcurva)="data">
                    <b :class="data.item.cor">{{ data.value }}</b>
                </template>
            </b-table>
        </div>

        <!-- Modal para detalhes do Promotor -->
        <b-modal ref="detalhepromoter" :title="detalhepromoter">
            <!-- <p class="my-4">Objetivo Atual: {{detalheobj}}%</p> -->
            <b-col class="m-2">
                <b-badge variant="success">Objetivo: <b-badge variant="light">{{ detalheobj }} %</b-badge></b-badge>
                <b-badge variant="success" class="ml-3">Total Curva: <b-badge variant="light">R$ {{ curvaacc }}</b-badge></b-badge>
                <p id="detalhepromoter">Clique na linha do dia que deseja alterar</p>
            </b-col>
            <b-table table-variant="light" head-variant="dark" striped outlined :items="mensalDetalhePromoter"
                :fields="fieldsDetalhe" small id="detalhepromoter" select-mode="single" selectable @row-selected="editarSellout">
                <template #cell(descrprod)="data">
                    <span>{{ data.value }}</span>
                </template>
            </b-table>
        </b-modal>





    </div>
</template>

<script>
export default {
    name: 'resultadoMensalAdmin',
    data() {
        return {
            mensal: [],
            mensalDetalhe: [],
            mensalDetalhePromoter: [],
            filtros: {},
            fields: [
                { key: "promoter", label: "Promoter", sortable: true }
                , { key: "qtdneg", label: "Qtd", sortable: true, class: "text-right" }
                , { key: "dias", label: "Dias", sortable: true, class: "text-right" }
                , { key: "objetivo", label: "Obj", sortable: true, class: "text-right" }
                , { key: "objetivoperiodo", label: "% Mês", sortable: true, class: "text-right" }
                , { key: "vlrcurva", label: "Curva", sortable: true, class: "text-right" }

            ],
            fieldsDetalhe: [
                { key: "dia", label: "Dia", sortable: true },
                { key: "descrprod", label: "Produto", sortable: true },
                { key: "qtdneg", label: "Qtd", sortable: true, class: "text-right" },
                { key: "tipo", label: "Curva", sortable: true, class: "text-center" },
                { key: "vlrcurva", label: "Vlr Curva", sortable: true, class: "text-right" },
            ],
            popoverFaixa:[
                {Faixa:'<__85%', A:'0,00', B:'0,00'},
                {Faixa:'85__95%', A:'1,00', B:'0,70'},
                {Faixa:'95__100%', A:'1,50', B:'1,00'},
                {Faixa:'>= 100%', A:'2,00', B:'1,50'},
            ],
            // objetivo: 80,
            diasmes: 26,
            objetivoTotal: 0,
            quantTotal: 0,
            diasTrabalhados: 0,
            selected: [],
            detalhepromoter: '',
            detalheobj: 0,
            curvaacc: 0

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
        }
        // let now = new Date()
        // this.filtros.ano = now.getFullYear()
        // this.filtros.mes = String(now.getMonth() + 1).padStart(2, '0')

    },
    methods: {
        // Objetivo() {
        // },
        resultadoMensal() {
            //this.$refs['detalhepromoter'].hide()
            this.$store.state.loading = !this.$store.state.loading
            //console.log('filtros', this.filtros)
            this.$http.get(`consulta?operacao=resultadoAdmin&ano=${this.filtros.ano}&mes=${this.filtros.mes}`).then(res => {
                this.objetivoTotal = 0
                this.quantTotal = 0
                this.diasTrabalhados = 0
                // console.log(res.data)
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
                // Carregando detalhe por promoter
                this.$http.get(`consulta?operacao=resultadoAdminDetalhe&ano=${this.filtros.ano}&mes=${this.filtros.mes}`).then(async res => {
                    //console.log('Detalhe', res.data)
                    this.mensalDetalhe = await res.data
                    this.mensalDetalhe = this.mensalDetalhe.map(vdet => {
                        let vlrcurva = 0
                        //let curvaacc = 0
                        let { objetivoperiodo } = this.mensal.find(filt => filt.promoter === vdet.promoter)

                        if (parseFloat(objetivoperiodo) >= 85 && parseFloat(objetivoperiodo) < 95) {
                            vlrcurva = (vdet.tipo === 'A' ? 1 : 0.7) * vdet.qtdneg
                        } else if (parseFloat(objetivoperiodo) >= 95 && parseFloat(objetivoperiodo) < 100) {
                            vlrcurva = (vdet.tipo === 'A' ? 1.5 : 1) * vdet.qtdneg
                        } else if (parseFloat(objetivoperiodo) >= 100) {
                            vlrcurva = (vdet.tipo === 'A' ? 2 : 1.5) * vdet.qtdneg
                        }

                        return { ...vdet, vlrcurva: vlrcurva }
                    })
                    //console.log('det', this.mensalDetalhe)
                    //Somando curva para a tabela principal (mensal)
                    this.mensal = this.mensal.map(v => {
                        let curvaacc = 0
                        curvaacc = this.mensalDetalhe.filter(filt => filt.promoter === v.promoter)
                            .reduce((acc, val) => {
                                acc += parseFloat(val.vlrcurva)
                                return acc
                            }, 0)
                        return { ...v, vlrcurva: curvaacc.toFixed(2) }
                    })

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

        },
        selectPromoter(items) {
            //console.log('Selecionou', items)
            this.detalhepromoter = items
            this.$refs['detalhepromoter'].show()
            this.detalhepromoter = items[0].promoter
            this.detalheobj = items[0].objetivoperiodo

            this.mensalDetalhePromoter = this.mensalDetalhe.filter(v => v.promoter === items[0].promoter)
                .map(v => {
                    return { ...v, dia: v.dtmov.substr(8, 2), vlrcurva: v.vlrcurva.toFixed(2) }
                })
            this.curvaacc = items[0].vlrcurva
            //console.log('detalhe', this.mensalDetalhePromoter)
        },
        editarSellout(items){
            console.log('editarSellout', items[0], `${items[0].dtmov.substring(8,10)}/${items[0].dtmov.substring(5,7)}/${items[0].dtmov.substring(0,4)}`)
            this.$store.state.loading = !this.$store.state.loading
            this.$router.push(`/SelloutItem/${items[0].id}`)
            //console.log(loja, data_selected)
            this.$store.state.selectLoja = items[0].loja
            this.$store.state.selectData = `${items[0].dtmov.substring(8,10)}/${items[0].dtmov.substring(5,7)}/${items[0].dtmov.substring(0,4)}`

        },
        download() {
            //console.log('clicou')
            let csvContent = this.convertToCSV()
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'mensal_detalhe.csv')
            link.click()
        },
        convertToCSV() {
            let headers = Object.keys(this.mensalDetalhe[0])
            let rows = this.mensalDetalhe.map(obj => headers.map(header => obj[header]))
            let headerRow = headers.join(',')
            let csvRows = [headerRow, ...rows.map(row => row.join(','))]
            //console.log(this.mensalDetalhe)
            return csvRows.join('\n')
        }

    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resultadoMensalAdmin {
    /* color: antiquewhite; */
}

#detalhepromoter {
    font-size: 0.75em;
}

#tabelaMensal {
    font-size: 0.85em;
}
</style>
