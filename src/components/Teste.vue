<template>
    <div id="list-demo">
        <b-navbar toggleable type="dark" variant="dark">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="navbar-toggle-collapse">
                <template #default="{ expanded }">
                    <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                    <b-icon v-else icon="chevron-bar-down"></b-icon>
                </template>
            </b-navbar-toggle>

            <b-collapse id="navbar-toggle-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#">Link 1</b-nav-item>
                    <b-nav-item href="#">Link 2</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <br>
        <hr>
        <div id="camera"></div>
        <hr>
        <template>
            <div>
                <b-row class="my-1" v-for="(dado, j) in promoters" :key="dado.id">
                    <b-col cols="4" col lg="3">
                        <label>{{ j }} - {{ dado.nome }}</label>
                    </b-col>
                    <b-col col sm="3" v-for="(campo, i) in dado.meses" :key="i">
                        <!-- Usando v-model para a propriedade 'valor' em um objeto dentro do array -->
                        <b-form-input v-model="campo.valor" :id="dado.id + campo.mes"
                            :key="dado.id + campo.mes"></b-form-input>
                        <label>{{ campo.valor }}</label>
                    </b-col>
                </b-row>
            </div>
        </template>




    </div>
</template>
  
<script>
export default {
    el: '#list-demo',
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10,
            promoters: [
                { id: 1, nome: 'Promotor 1', meses: [{ mes: 'Jan', valor: '' }, { mes: 'Feb', valor: '' }] },
                { id: 2, nome: 'Promotor 2', meses: [{ mes: 'Jan', valor: '' }, { mes: 'Feb', valor: '' }] },
            ]

        }
    },
    created() {
        console.log('Created')

    },

    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1)
        },
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-to

/* .list-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(30px);
}
</style>