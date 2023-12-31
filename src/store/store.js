import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: {},
        mensagens:[],
        loading: false,
        selectLoja:'',
        selectData:''
    },
    getters: {

    },
    mutations: {
        setUser(state, login) {
            //console.log('Store:',login)
            state.login = login
            if (login) {
                axios.defaults.headers.common['Authorization'] = `bearer ${login.token}`
            //    this.state.login = {usuario:login.usuario}
                this.state.mensagens = []
                this.state.mensagens.push({ texto: "Logado com sucesso!!", tipo: 'success', tempo: 2, dismissCountDown: 0 })
            }
        }
    }
    })