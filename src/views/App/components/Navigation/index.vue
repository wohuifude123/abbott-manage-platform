<template>
    <div>
        <!--<div class='navigation'>-->
            <!--<div class='navigation-second-wrapper'>-->
                <!--<div class='navigation-item-first'>-->
                    <!--<router-link to="/content">-->
                        <!--{{introduce}}-->
                    <!--</router-link>-->
                <!--</div>-->
                <!--<div class='navigation-item'>-->
                    <!--{{work}}-->
                <!--</div>-->
                <!--<div class='navigation-item'>-->
                    <!--<router-link to="/experience">-->
                        <!--{{experiences}}-->
                    <!--</router-link>-->

                <!--</div>-->
                <!--<div class='navigation-item'>-->
                    <!--{{hobby}}-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                introduce: "自我介绍",
                work: '工作经历',
                experiences: '经验心得',
                hobby: '业余爱好'
            }
        }
    }
</script>

<style scoped>
    @import "./assets/styles/navigation.scss";

</style>
