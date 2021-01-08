<template>
    <div>
        <el-button type="primary"
                   @click="resetInformation()" class="text-center"
                   style="width:140px;" :disabled="isResetDisabled">重置
        </el-button>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                id: '',
                isResetDisabled: false
            }
        },
        mounted() {
            let _this = this
            _this.$socket.emit('login', '123'); // 触发socket连接
        },
        sockets: {
            connect() {
                this.id = this.$socket.id;
                this.$socket.emit('login', '222');      // 监听connect事件
            },
            message(data) {                               // 监听message事件，方法是后台定义和提供的                             
                console.log(data);
            }
        },
        methods: {
            resetInformation: function (val) {
                let _this = this
                _this.$socket.emit('emit_method', val);
            },
            clickButton: function (val) { //添加按钮事件向服务端发送数据
                let _this = this
                _this.$socket.emit('emit_method', val);
            }
        }
    }
</script>

<style scoped>

</style>