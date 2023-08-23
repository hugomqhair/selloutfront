<template>
    <header class="header">
        <div>
            <router-link to="/">
                <img src="../assets/MQlogos_header.png" class="img-fluid rounded mx-left d-block" id="imgheader" left alt="">
            </router-link>
        </div>


        <div class="alert">
            <b-alert dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :show="mensagem.tempo"
                :variant="mensagem.tipo" @dismissed="mensagem.tempo = 0">
                {{ mensagem.texto }}
            </b-alert>
        </div>
    </header>
</template>

<script>
//import router from '@/router';

export default {
    computed: {
        mensagens() {
            return this.$store.state.mensagens;
        },
    },
    //  components: { router }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    grid-area: header;
    margin-top: 0px;
    max-height: 10px;
    padding: 5px 10px;
}

img {
    max-height: 80px;
}

.alert {
    position: fixed;
    display: block;
    z-index: 1;
    bottom: 5px;
    /* right: 15%; */
    /* width: 300px; */
    min-width: 350px;
}


@media (max-width: 800px) {

}
</style>
