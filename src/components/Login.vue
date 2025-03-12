<template>
    <div id="login">
        <div  v-if="boqueio">
            <h1>Sistema em Manutenção</h1>
        </div>
        <b-card v-else title="Login" bg-variant="dark">
            <div >
                <span>Usuário</span>
                <b-form-input v-model="usuario" name="usuario" type="text"></b-form-input>
                <span>Senha</span>
                <b-form-input v-model="senha" name="senha" type="password"></b-form-input>
            </div>
            <b-button variant="success" block class="mt-3"  @click="logar">Entrar</b-button>
        </b-card>
    </div>
</template>

<script>
// import Body from './components/Body.vue'


export default {
    name: 'login',
    components: {
        // Body,

    },
    data() {
        return {
            usuario:'',
            senha:'',
            boqueio:false
        }
    },
    computed: {
        // user() {
        //     return this.$store.state.user
        // },
        login() {
            return this.$store.state.login
        }
    },
    methods: {
        logar() {
            //console.log({usuario:this.usuario.trim(), senha:this.senha})
            this.$store.state.loading = !this.$store.state.loading
            this.$http.post(`/auth`, {usuario:this.usuario.trim(), senha:this.senha})
                .then(resp => {
                    //console.log('resp', resp)
                    this.$store.commit('setUser', { id: resp.data.id, usuario: resp.data.usuario, token: resp.data.token, gestor:resp.data.gestor})
                    localStorage.setItem('MQToken', JSON.stringify(resp.data.token))
                    if(resp.data.gestor){
                        this.$router.push('/MenuAdmin')    
                    } else {
                        this.$router.push('/')
                    }
                    this.$store.state.loading = !this.$store.state.loading
                }).catch(err => {
                    //console.log('Erro Login', err)
                    if (err.code == 'ERR_NETWORK') {
                        this.$store.state.mensagens = [{ texto: 'Erro com o Servidor, informe o TI', tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
                        this.$store.state.loading = false
                    } else {
                        this.$store.state.mensagens = [{ texto: err.response.data.err, tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
                        this.$store.state.loading = false
                    }
                    //this.$store.commit('setUser',{id:null,usuario:null, token: null })
                })
        }
    }
}
</script>

<style>
#login {
    display: flex;
    position: relative;
    color: antiquewhite;
    /* height: 100%; */
    /* display: flex; */
    justify-content: center;
    /* align-items: center; */
    /* grid-area: modelo; */
}

</style>
