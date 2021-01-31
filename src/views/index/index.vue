<template>
    <div class="dashboard-container">
        <div class="dashboard-editor-container">
            <github-corner class="github-corner" />
            <panel-group @handleSetLineChartData="handleSetLineChartData" />
            <chart-line></chart-line>
            <chart-group></chart-group>
            <data-group></data-group>
        </div>
    </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner/GithubCorner'
import PanelGroup from './modules/PanelGroup'
import ChartLine from './components/ChartLine'
import ChartGroup from './modules/ChartGroup'
import DataGroup from './modules/DataGroup'

export default {
    name: "index",
    components: {
        GithubCorner,
        PanelGroup,
        ChartGroup,
        ChartLine,
        DataGroup
    },
    data() {
        return {

        }
    },
    mounted () {
        let _this = this
    },
    methods: {
        handleSetLineChartData(type) {
            // this.lineChartData = lineChartData[type]
        }
    }
}
</script>

<style lang="scss" scoped>
    .dashboard-container {
        /*background-color: #f0f2f5;*/
        /*padding: 32px;*/
        background: rgb(240, 242, 245);
        position: relative;
        .dashboard-editor-container {
            box-sizing: border-box;
            padding-top: 60px;
            .github-corner {
                position: absolute;
                top: 0;
                border: 0;
                right: 0;
            }
        }

    }
</style>




