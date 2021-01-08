<template>
    <div>
        <div>
            <input v-model="data.name">
        </div>
    </div>
</template>

<script>
  export default {
    name: "CustomForm",
    props: ['data'],
    watch: {
      "data.name": function(val) {
        console.log('val == ', val)

      }
    },
  }
</script>

<style scoped>

</style>
