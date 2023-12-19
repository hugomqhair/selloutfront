<template>
    <div class="listarProduto">
        <div class="mb-2">
            <b-row>
                <b-button variant="success" @click="salvar">Salvar</b-button>
            </b-row>
        </div>
        <b-list-group id="b-list-group">
            <template v-for="dado in produtos">
                <b-list-group-item class="d-flex align-items-center mt-1" id="listarProduto" :key="dado.idproduto">
                    <b-badge pill :variant="cores[dado.idgrupo > 8 ? 7 : dado.idgrupo - 1]" id="descrGrupo">
                        {{ dado.grupo }}</b-badge>
                    <div id="descrProduto">
                        {{ dado.id }} - {{ dado.descrprod }}
                    </div>
                    <div id="select_classe">
                        <b-form-select v-model="dado.tipo" :value="dado.classe" :options="options" :key="dado.idproduto"
                            size="sm" class="ml-3"></b-form-select>
                    </div>
                    <!-- <b-form-radio-group :id="dado.idproduto" class="ml-3" v-model="dado.classe" :options="options" :key="dado.idproduto"
                         name="radio-options"></b-form-radio-group> -->
                </b-list-group-item>

            </template>
        </b-list-group>

    </div>
</template>

<script>
export default {
    data() {
        return {
            produtos: [],
            id: null,
            cores: ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'secondary'],
            options: [
                { value: 'A', text: 'Tipo A' },
                { value: 'B', text: 'Tipo B' },
            ]
            , temp: ''
        }
    },
    created() {
        // if (!this.$store.state.login.token) {
        //     this.$router.push(`/Login`)
        // } else {
        //     
        // } 
        this.obterdados(this.selloutid)

    },
    methods: {
        obterdados() {
            this.$http.get(`consulta?operacao=produto`).then(res => {
                //console.log('produtos', res.data)
                const grupos = {};
                let idgrupo = 0;
                this.produtos = res.data.map((item) => {
                    const { grupo } = item;
                    if (!grupos[grupo]) {
                        grupos[grupo] = ++idgrupo;
                    }

                    return { ...item, grupo, idgrupo: grupos[grupo] };
                })
                //this.produtos.sort((a,b) => a.grupo > b.grupo)
                this.produtos.sort((a, b) => {
                    if (a.grupo < b.grupo) {
                        return -1;
                    }
                    if (a.grupo > b.grupo) {
                        return 1;
                    }
                    return 0;
                });
                console.log(this.produtos)
            })
            //this.produtos.sort((a,b) => a.grupo > b.grupo)
        },
        salvar() {
            //console.log('Salvar', this.produtos.filter(v => v.classe !== null))
            let itens = this.produtos.filter(v => v.tipo !== null)
            this.$http.post('/produto', itens).then((resp) => {
                if (resp.status == 200) {
                    this.$store.state.mensagens = [{ texto: 'Atualização concluída!', tipo: 'success', tempo: 3, dismissCountDown: 0 }]
                } else {
                    this.$store.state.mensagens = [{ texto: 'Opps!! Algo deu errado', tipo: 'danger', tempo: 3, dismissCountDown: 0 }]
                }
            })
        }
    }
    //localhost:3000/consulta?operacao=produto
}
</script>

<style scoped>
#listarProduto {
    font-size: 0.9em;
    /* font-size-adjust: inherit; */
    /* min-width: 100%; */
    min-height: 70px;
    /* white-space: nowrap; Impede a quebra de linha */
}

#descrGrupo {
    position: absolute;
    top: 1px;
    left: 20%;
    font-size: 0.6em;
    min-width: 30%;
}

#descrProduto {
    position: absolute;
    top: 13px;
    margin-top: 0px;
    padding: 0;
    font-size: 0.85em;
}

#select_classe {
    font-size: 0.9em;
    position: absolute;
    right: 5%;
    bottom: 5%;
}
</style>