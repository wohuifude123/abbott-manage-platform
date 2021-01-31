<template>
    <div class='data-container'>
        <widget-form
                :tableData="tableData"
                :data.sync="widgetFormSelect"
                :select.sync="widgetFormSelect"
        ></widget-form>
        <Setting
                :widgetFormSelect="widgetFormSelect"
        ></Setting>
    </div>
</template>

<script>
import Setting from './components/Setting'
import WidgetForm from './components/WidgetForm'
import GridJson from './assets/mockData/grid'

export default {
    name: "index",
    components: {
        Setting,
        WidgetForm
    },
    data() {
        return {
            tableData: [
                {
                    index: 0,
                    date: '2016-05-02',
                    name: GridJson['name'],
                    address: '上海市普陀区金沙江路 1518 弄',
                    type: 'button'
                },
                {
                    index: 1,
                    date: '2016-05-04',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1517 弄',
                    type: 'button'
                },
                {
                    index: 2,
                    date: '2016-05-01',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1519 弄',
                    type: 'button'
                },
                {
                    index: 3,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    type: 'button'
                },
                {
                    index: 4,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    type: 'button'
                },
                {
                    index: 5,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    type: 'button'
                },
                {
                    index: 6,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    type: 'button'
                },
                {
                    index: 7,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    type: 'button'
                },
                {
                    index: 8,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    type: 'button'
                },
                {
                    index: 9,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    type: 'button'
                },
                {
                    index: 10,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    type: 'button'
                },
                {
                    index: 11,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    type: 'button'
                }
            ],
            widgetFormSelect: GridJson
        }
    },
    watch: {
        widgetFormSelect: function () {
            console.log('$$$$$$$$$$$$ Container widgetFormSelect ==')

        }
    }
}
</script>

<style scoped>
.data-container {
    display: flex;
    /*background: #409EFF;*/
    box-sizing: border-box;
    padding: 20px 20px 20px 20px;
    height: 100%;
}
</style>
