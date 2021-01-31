<template>
    <div class="app-div">
        <TopTag :headerText="headerText"/>
        <!--<router-view />-->
        <div class='content-wrapper'>
            <Navigation />
            <!--<Content />-->
        </div>
    </div>
    <!--<div class="app_div">-->
    <!--{{ message }}-->
    <!--</div>-->
</template>
<script>
import TopTag from './components/TopTag';
import Navigation from './components/Navigation';
import Content from './components/Content';
export default {
    data: function(){
        return {
            message: 'Hello World!',
            headerText: ['今日看板', '教练看板', '约车情况']
        }
    },
    components: {
        TopTag,
        Navigation,
        Content
    },
    mounted: function() {

    }
}
</script>

<style>
    @import "../../assets/styles/base.scss";
    @import "./assets/styles/app.scss";
</style>
