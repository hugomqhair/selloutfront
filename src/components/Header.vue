<template>
    <header class="header">
        <div>
            <router-link to="/">
                <img src="../assets/logos_header.png" class="img-fluid rounded mx-auto d-block" alt="">
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
            console.log('msg', this.$store.state.mensagens);
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
}

img {
    max-height: 100px;
}

.alert {
    position: absolute;
    top: 10px;
    left: 8px;
    padding: 20px;
}
</style>
