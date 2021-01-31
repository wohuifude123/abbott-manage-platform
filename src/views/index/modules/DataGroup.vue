<template>
  <div class='data-group-container'>
    <personal-calendar></personal-calendar>
    <infinite-list></infinite-list>
  </div>
</template>

<script>
  import PersonalCalendar from '../components/PersonalCalendar'
  import InfiniteList from '../components/InfiniteList'

export default {
  name: "DataGroup",
  components: {
    PersonalCalendar,
    InfiniteList
  }
}
</script>

<style scoped>
  .data-group-container {
    display: flex;
    height: 300px;
    overflow: hidden;
    /*background: #409EFF;*/
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;
  }
</style>
