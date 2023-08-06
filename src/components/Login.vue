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
                   this.$store.commit('setUser',{usuario:this.login.usuario, token: resp.data.token })
                   localStorage.setItem('MQToken', JSON.stringify(resp.data.token))
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
