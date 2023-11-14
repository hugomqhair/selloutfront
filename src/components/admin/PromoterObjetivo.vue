<template>
    <div class="promoterObjetivo">
        <b-row>
            <b-col cols="2">
                <b-button variant="warning" @click="$router.push('/MenuAdmin')" >
                    <b-icon class="" icon="arrow-left-square" button>
                    </b-icon>
                </b-button>
            </b-col>
            <b-col cols="10">
                <h4 align="center">Manutenção de Objetivos</h4>
            </b-col>

        </b-row>
        <div>
            <!-- <filterAnoMes 
            @filtraranomes="filtar"
            ></filterAnoMes> -->
            <div id="cabecalho">
                <b-row align-h="center">
                    <b-col cols="4">
                        <b-form-select v-model="ano" :options="anos"></b-form-select>
                        <b-form-text>Ano</b-form-text>
                    </b-col>
                    <b-col cols="4">
                        <b-form-select v-model="mes" :options="meses"></b-form-select>
                        <b-form-text>Mês</b-form-text>
                    </b-col>
                    <b-col cols="2">
                        <b-button @click="loadAno()" variant="success"><b-icon
                                icon="journal-arrow-down"></b-icon></b-button>
                    </b-col>
                </b-row>
            </div>

            <b-container fluid v-if="inicio">
                <b-row>
                    <b-col col lg="3" v-for="cab in promoters[0].meses" :key="cab.mes"><label> {{ cab.mes }}</label></b-col>
                </b-row>

                <b-row class="my-1" v-for="(dado) in promoters" :key="dado.id">
                    <b-col cols="4" col lg="3">
                        <label>{{ dado.nome }}</label>
                    </b-col>
                    <b-col col sm="3">
                        <b-form-input v-model="dado.quant" :id="dado.nome + dado.id" :key="dado.id" type="number"
                            align="right"></b-form-input>
                    </b-col>
                </b-row>
                <div class="mt-4">
                    <b-row>
                        <b-button variant="success" @click="salvar">Salvar</b-button>
                    </b-row>
                </div>
            </b-container>
        </div>

    </div>
</template>

<script>
export default {
    name: 'promoterObjetivo',
    data() {
        return {
            inicio: false,
            promoters: [{ id: null, nome: null, meses: [{ mes: null, valor: null }] }],
            filtar: {},
            anos: ['2023', '2024'],
            meses: [
                { value: '01', text: 'Jan' },
                { value: '02', text: 'Fev' },
                { value: '03', text: 'Mar' },
                { value: '04', text: 'Abr' },
                { value: '05', text: 'Mai' },
                { value: '06', text: 'Jul' },
                { value: '07', text: 'Jul' },
                { value: '08', text: 'Ago' },
                { value: '09', text: 'Set' },
                { value: '10', text: 'Out' },
                { value: '11', text: 'Nov' },
                { value: '12', text: 'Dez' },
            ],
            ano: '2023',
            mes: '01',

        }
    },
    computed: {
        login() {
            return this.$store.state.login
        },
    },
    created() {
        let now = new Date()
        this.ano = now.getFullYear()
        this.mes = String(now.getMonth() + 1).padStart(2, '0')
        //console.log('PromotObj', this.ano, this.mes)
        //console.log(this.$store.state.login)
        if (!this.$store.state.login.token) {
            this.$router.push(`/Login`)
        } else {
            this.consultaPromoter()
        }
    },
    methods: {
        consultaPromoter() {
        },
        salvar() {
            let savedata = this.promoters.map(v => { return { idpromoter: v.id, ano: this.ano, mes: this.mes, quant: v.quant, dtref: `${this.ano}-${this.mes}-01` } })
            //console.log(savedata)
            this.$store.state.loading = !this.$store.state.loading
            this.$http.post(`/objetivopromoter`, savedata)
                .then(resp => {
                    if (resp) {
                        this.$store.state.mensagens = [{ texto: 'Objetivo Promoteres Salvo!!! ', tipo: 'success', tempo: 2, dismissCountDown: 0 }]
                        this.$store.state.loading = false
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$store.state.loading = false
                })

        },
        loadAno() {
            this.$store.state.loading = !this.$store.state.loading
            this.$http.get(`consulta?operacao=promoter`).then(res => {
                this.promoters = res.data.filter(v => v.gestor === false).map(v => { return { id: v.id, nome: v.nome } })

                this.$http.get(`consulta?operacao=objetivopromoter`).then(objpro => {
                    //console.log(objpro.data)
                    let objetivo = objpro.data
                    let nummes = parseInt(this.mes, 10)
                    let numano = parseInt(this.ano, 10)

                    this.promoters = this.promoters.map((promo) => {
                        let result = objetivo.filter((itemValor) => {
                            return itemValor.idpromoter == promo.id && numano == itemValor.ano && nummes == itemValor.mes
                        })
                        return {
                            ...promo,
                            quant: result[0] ? result[0].quant : 0
                        }
                    })

                    this.promoters.sort((a, b) => a.nome.localeCompare(b.nome))
                    // console.log(this.promoters)
                    this.$store.state.loading = false

                    //this.produtos.sort((a, b) => a.grupo.localeCompare(b.grupo))
                })
                this.inicio = true
            }).catch(err => {
                console.log('ERRO ***', err)
                this.$store.state.mensagens = [{ texto: 'Falha de Servidor (obterLojas), informar ao TI', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
            })
        }

    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.promoterObjetivo {
    color: antiquewhite;
}

#cabecalho {
    /* display: flex;
    align-items: center; 
    justify-content: center; */
    border-radius: 10px;
    border-color: white;
    border-style: double;
    padding: 5px;
    margin: 1px;
}
</style>
