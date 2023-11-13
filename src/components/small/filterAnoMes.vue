<template>
    <div id="filterAnoMes">
        <b-row align-h="center">
            <b-col>
                <b-form-select v-model="ano" :options="anos"></b-form-select>
                <b-form-text>Ano</b-form-text>
            </b-col>
            <b-col>
                <b-form-select v-model="mes" :options="meses"></b-form-select>
                <b-form-text>Mês</b-form-text>
            </b-col>
            <b-col>
                <b-button @click="$emit('filtraranomes', ano)" variant="success"><b-icon icon="journal-arrow-down"></b-icon></b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    export default{
        data(){
            return{
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
            ano: '2023',
            mes: '',
            }
        },
        created(){
            let now = new Date()
            // console.log(now.getFullYear(), now.getMonth()+1)
            // console.log(String(now.getMonth()+1).padStart(2,'0'))
            this.ano = now.getFullYear()
            this.mes = String(now.getMonth()+1).padStart(2,'0')
        },
    }
</script>

<style>
#filterAnoMes{
    /* display: flex;
    align-items: center; 
    justify-content: center; */
    border-radius: 10px;
    border-color:white;
    border-style: double;
    padding: 10px;
    margin: 5px;
}
</style>