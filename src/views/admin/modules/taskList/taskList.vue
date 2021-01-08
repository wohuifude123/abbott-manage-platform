<template>
    <div class='user-table-root'>
        <!--表单添加-->
        <div class='btn-add-container'>
            <el-button type="success" @click="addListRow()" class='btn-add' round>添加行信息</el-button>
        </div>
        <el-table :data="datas = content.cardInfo" border height="550" class='user-table-container'>
            <el-table-column fixed="left" label="MRO客户抬头" width="120">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.MROCardName ">-->
                        <!--<i slot="suffix" @click="openCardCode('MROCardName','MROCardCode',scope.$index)" class="el-input__icon el-icon-search"></i>-->
                    <!--</el-input>-->
                    <div>{{scope.row.MROCardName}}</div>
                </template>
            </el-table-column>
            <el-table-column label="MRO分配金额" width="320">
                <template slot-scope="scope">
                    <!-- {{ scope.row.MROAmount }}-->
                    <el-input v-model="scope.row.MROAmount" type="number"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="大宗客户抬头" width="320">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.DZCardName">
                        <i slot="suffix" @click="openCardCode('DZCardName','DZCardCode',scope.$index)" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label="大宗分配额" width="320">
                <template slot-scope="scope">
                    <!--   {{ scope.row.DZAmount }}-->
                    <el-input v-model="scope.row.DZAmount"  type="number"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                // name: "taskList"
                webSocket: null,
                demo: '',
                value: '',
                package: {
                    count: 0,
                    price: 5
                },
                content: {
                    cardInfo: [
                        {
                            "MROCardCode":"123",
                            "MROCardName":"123",
                            "DZCardCode":"",
                            "DZCardName":"",
                            "MROAmount":'',
                            "DZAmount":''
                        },
                        {
                            "MROCardCode":"三个人",
                            "MROCardName":"三个人",
                            "DZCardCode":"",
                            "DZCardName":"",
                            "MROAmount":'',
                            "DZAmount":''
                        }
                    ]
                }
            }
        },
        watch: {
            'package.count' (newVal, oldVal) {
                console.log('newVal == ', newVal)
                console.log('oldVal == ', oldVal)
            }
        },
        computed: {

        },
        mounted () {
            let _this = this
            console.log('taskList mounted')
            _this.useWebSocket()
        },
        methods: {
            useWebSocket () {
                let _this = this
                let socket = _this.webSocket
                // let timerSend = 2000
                // fc3c08bb-4698-4977-8f87-5697eed8fb8d
                let socketOpenPromise = (url, token) => {
                    return new Promise((resolve, reject) => {
                        let socketUrl = url + token
                        // console.log('socketUrl == ', socketUrl)
                        // console.log('socket == ', socket);

                        if (socket !== null) {
                            socket.close()
                            socket = null
                        }
                        socket = new WebSocket(socketUrl)
                        resolve('success')
                    })
                }

                let urlWeb = 'ws://222.128.14.120:86/cco/webSocket/'
                let tokenWeb = 'c3355a68-f17f-49c4-80e1-0b9919afba86'
                socketOpenPromise(urlWeb, tokenWeb).then(data => {
                    // console.log('data == ', data)
                    // console.log('socket == ', socket)
                    if (data === 'success') {
                        socket.onopen = function () {
                            // 这里用一个延时器模拟事件
                            // setInterval(function () {
                            //   socket.send('客户端消息' )
                            // }, timerSend)
                        }
                        // 这里接受服务器端发过来的消息
                        socket.onmessage = function (e) {
                            // _this.package.count++
                            // console.log(e.data)
                            let returnJSON = JSON.parse(e.data)
                            console.log(returnJSON)
                            // console.log(returnJSON['冀AC005学'])

                            let carJSON = JSON.parse(returnJSON['冀AC005学'])

                            // console.log(carJSON['licensePlateNum'])
                            let dataPost = {
                                "MROCardCode": '',
                                "MROCardName": carJSON['licensePlateNum'] + _this.package.count,
                                "DZCardCode": "",
                                "DZCardName": "",
                                "MROAmount":'',
                                "DZAmount":''
                            }

                            _this.package.count = _this.package.count + 1
                            _this.addListRow(dataPost);
                        }
                        socket.onclose = function () {
                            // _this.webSocket.close()
                            // console.log("websocket onclose");
                        }
                        socket.onerror = function () {
                            // _this.webSocket.close()
                            // console.log("websocket·onerror ");
                        }
                    }
                })
            },
            addListRow (data) {
                let _this = this
                _this.content.cardInfo.push(data);
            },
            openCardCode () {
                let _this = this
            }
        }
    }

</script>

<style scoped>
    .user-table-root {
        background: aquamarine;
        display: block;
        padding-top: 5px;
        height: 100%;
    }
    .user-table-root::before {
        content: ' ';
        width: 0;
        height: 0;
        display: block;
        clear: both;
    }
    .user-table-container {
        width: 100%;

    }
    .btn-add-container {
        height: 35px;
        background: bisque;
        margin-top: 15px;
    }
    .btn-add {
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
