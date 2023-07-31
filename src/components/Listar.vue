<template>
    <div class="listar">
        <b-card-group deck>
            <b-card bg-variant="dark">
                <b-form-group label="Texto Qualquer:">
                    <b-form-input type="text" size="lg"
                        v-model="dado.texto"
                        placeholder="Informe o Texto" @keyup.enter="salvar"></b-form-input>
                </b-form-group>
            </b-card>
        </b-card-group>
        <hr>
        <p v-for="dado in dados" :key="dado.id"> {{ dado.id }} - {{dado.texto}}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dados: [],
            id: null,
            dado: {
                texto: '',
            }
        }
    },
    created() {
        this.obterdados()
    },
    methods: {
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
        obterdados(){
            this.$http.get('select').then(res => {
                console.log('obterDados:',res)
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
</style>
