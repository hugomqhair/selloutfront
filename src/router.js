import Vue from "vue";
import Router from "vue-router"
import SelloutItem from "./components/SelloutItem.vue"
import Inicio from "./components/Inicio.vue"
import Login from "./components/Login.vue"
import ResultadoMensal from "./components/ResultadoMensal.vue"
import ResultadoMensalAdmin from "./components/admin/ResultadoMensalAdmin.vue"
import MenuAdmin from "./components/admin/MenuAdmin.vue"
import PromoterObjetivo from "./components/admin/PromoterObjetivo.vue"
import Produtos from "./components/admin/Produtos.vue"


import Teste from "./components/Teste.vue"
//import aa from './components/'

Vue.use(Router)

export default new Router({
    routes:[
        {path:'/', component: Inicio}
        ,{path:'/SelloutItem/:id', component: SelloutItem}
        ,{path:'/Login', component: Login}
        ,{path:'/ResultadoMensal', component: ResultadoMensal}
        ,{path:'/ResultadoMensalAdmin', component: ResultadoMensalAdmin}
        ,{path:'/Teste', component: Teste}
        ,{path:'/MenuAdmin', component: MenuAdmin}
        ,{path:'/PromoterObjetivo', component: PromoterObjetivo}
        ,{path:'/Produtos', component: Produtos}
    ]
})