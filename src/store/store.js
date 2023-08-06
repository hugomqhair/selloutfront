import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        login: {}

    },
    getters: {

    },
    mutations: {
        setUser(state, login) {
            console.log('Store:',login)
            state.login = login
            if (login) {
                axios.defaults.headers.common['Authorization'] = `bearer ${login.token}`
                this.state.user = login.usuario
            }
        }
    }
    })