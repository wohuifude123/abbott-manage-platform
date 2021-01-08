<template>
    
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "userSelect",
        computed: {
            ...mapState(['showAdddialog', 'showUpdatedialog',])
        }
    }
</script>

<style scoped>

</style>