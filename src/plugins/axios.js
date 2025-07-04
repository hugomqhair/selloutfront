import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'https://curso-vue-e7de3.firebaseio.com/'
// axios.defaults.headers.common['Authorization'] = 'abc123'
// axios.defaults.headers.get['Accepts'] = 'application/json'

// console.log('Ambiente', process.env, process.env.NODE_ENV == 'development')

Vue.use({
    install(Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:5001/mqhair-sellout/us-central1/app' : `https://app-dpq5ulisja-uc.a.run.app/`,  //Amazon: 35.184.93.99 Externo
            //baseURL: 'http://localhost:3000/',
            headers: {
                "Authorization": "abc123"
            }
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            //console.log(this.$store.login)
            // if(config.method == 'post') {
            //     config.method = 'put'
            // }
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {
            // const array = []
            // for(let chave in res.data) {
            //     array.push({ id: chave, ...res.data[chave] })
            // }

            // res.data = array
            //console.log(res)
            return res
        }, error => Promise.reject(error))
    }
})