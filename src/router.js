import Vue from "vue";
import Router from "vue-router"
import SelloutItem from "./components/SelloutItem.vue"
import SelloutInico from "./components/SelloutInicio.vue"
//import aa from './components/'

Vue.use(Router)

export default new Router({
    routes:[
        {path:'/', component: SelloutInico},
        {path:'/SelloutItem', component: SelloutItem}

    ]
})