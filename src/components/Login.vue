<template>
    <div id="login">
        <b-card title="Login" bg-variant="dark">
            <div>
                <span>Usuário</span>
                <b-form-input v-model="login.usuario" name="usuario" type="text"></b-form-input>
                <span>Senha</span>
                <b-form-input v-model="login.senha" name="senha" type="password"></b-form-input>
            </div>
            <b-button variant="success" block class="mt-3" @click="logar">Entrar</b-button>
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
    computed:{
    user(){
        return this.$store.state.user
    },
    login(){
        return this.$store.state.login
    }
  },
    methods: {
        logar() {
            this.$http.post(`/auth`, this.login)
                .then(resp => {
                    //console.log('resp', resp)
                   this.$store.commit('setUser',{id:resp.data.id,usuario:resp.data.usuario, token: resp.data.token })
                   localStorage.setItem('MQToken', JSON.stringify(resp.data.token))
                }).catch(err => {
                    //console.log('Erro Login', err.response.data)
                    //this.$store.commit('setUser',{id:null,usuario:null, token: null })
                    this.$store.state.mensagens = [{ texto: err.response.data.err, tipo: 'danger', tempo: 5, dismissCountDown: 0 }]
                })
        }
    }
}
</script>

<style>
#login {
    color: antiquewhite;
    /* height: 100%; */
    /* display: flex; */
    justify-content: center;
    /* align-items: center; */
    /* grid-area: modelo; */
}
</style>
