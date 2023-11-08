<template>
    <div id="menuAdmin">
        <b-card-group deck>
            <b-card border-variant="primary" header="Resultado Mensal" header-bg-variant="primary"
                header-text-variant="white" align="center" @click="$router.push('/ResultadoMensalAdmin')">
                <b-card-text>Lista o resultado de momento por promotores</b-card-text>
            </b-card>

            <b-card  border-variant="secondary" header="Objeto" 
            header-border-variant="secondary" align="center" @click="$router.push('/PromoterObjetivo')">
                <b-card-text>Manutenção de objetivo Mensal por Promotor.</b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
</script>

<style></style>