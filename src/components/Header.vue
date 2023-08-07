<template>
    <header class="header">
        <!-- <img src="./assets/logos_header.png" class="img-fluid rounded mx-auto d-block" alt=""> -->
        <img src="../assets/logos_header.png" class="img-fluid rounded mx-auto d-block" alt="">
        <div class="alert">
            <b-alert dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :show="mensagem.tempo"
                :variant="mensagem.tipo" @dismissed="mensagem.tempo = 0">
                {{ mensagem.texto }}
            </b-alert>
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        mensagens() {
            console.log('msg', this.$store.state.mensagens)
            return this.$store.state.mensagens
        },
    }

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
