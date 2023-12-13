<template>
    <div id="filterAnoMes">
        <b-row align-h="center">
            <b-col cols="4">
                <b-form-select v-model="ano" :options="anos"></b-form-select>
                <b-form-text>Ano</b-form-text>
            </b-col>
            <b-col cols="4">
                <b-form-select v-model="mes" :options="meses"></b-form-select>
                <b-form-text>Mês</b-form-text>
            </b-col>
            <b-col cols="2">
                <b-button @click="enviar" variant="success"><b-icon icon="journal-arrow-down"></b-icon></b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            anos: ['2023', '2024'],
            meses: [
                { value: '01', text: 'Jan' },
                { value: '02', text: 'Fev' },
                { value: '03', text: 'Mar' },
                { value: '04', text: 'Abr' },
                { value: '05', text: 'Mai' },
                { value: '06', text: 'Jul' },
                { value: '07', text: 'Jul' },
                { value: '08', text: 'Ago' },
                { value: '09', text: 'Set' },
                { value: '10', text: 'Out' },
                { value: '11', text: 'Nov' },
                { value: '12', text: 'Dez' },
            ],
            ano: '',
            mes: '',
        }
    },
    created() {
        let now = new Date()
        // console.log(now.getFullYear(), now.getMonth()+1)
        // console.log(String(now.getMonth()+1).padStart(2,'0'))
        this.ano = now.getFullYear()
        this.mes = String(now.getMonth() + 1).padStart(2, '0')
        this.enviar()

    },
    methods: {
        enviar() {
            this.$emit('filtraranomes', { ano: this.ano, mes: this.mes })
        }
    }
}
</script>

<style>
#filterAnoMes {
    /* display: flex;
    align-items: center; 
    justify-content: center; */
    border-radius: 10px;
    border-color: white;
    border-style: double;
    padding: 5px;
    margin: 1px;
}
</style>