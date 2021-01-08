<template>
    <div class="top">
        <div class="pull-left signUp">
            <div class="signUpTitle">错误种类分析</div>
            <div class="h-line">
                <ve-line
                        :data="chartData"
                        :settings="chartSettings"
                        height="250px"
                        width="348px"
                        :extend="chartExtend"
                ></ve-line>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            this.chartSettings = {
                metrics: ['新增门店'],
                dimension: ['日期'],
                scale: [true, true]
            }
            return {
                errorTypesData: null,
                errorTypesExtend: null,
                searchValue: null,
                chartExtend: {
                    series: {
                        label: {
                            normal: {
                                show: true,
                                color: '#90E23C',
                                fontSize: 18
                            }
                        },
                        symbolSize: 10,
                        color: ['#44F0FF']
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        y: 10,
                        y2: 50,
                        left: 10,
                        containLabel: true
                    },
                    xAxis: {
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        position: 'left',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }
                }

            }
        },
        watch() {

        },
        methods: {
            handleSelect () {
                let _this = this
                console.log(_this.searchValue)
            }
        }
    }
</script>
<style>
    .top{
        text-align:center;
    }
</style>