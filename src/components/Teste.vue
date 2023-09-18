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

        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list" tag="p">
            <span v-for="item in items" v-bind:key="item" class="list-item">
                {{ item }}
            </span>
        </transition-group>
    </div>
</template>
  
<script>
export default {
    el: '#list-demo',
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10
        }
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
}</style>