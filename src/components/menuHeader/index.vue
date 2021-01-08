<template>
    <div class="headmenu">
        <el-button type="primary" @click="showHeadMenu" size="mini" class="right" icon="el-icon-menu"></el-button>
        <div class="headitem" v-show="flagShowHeadMenu">
            <el-checkbox-group v-model="checkedList">
                <el-checkbox
                        :label="item"
                        v-for="item in menus">
                </el-checkbox>
            </el-checkbox-group>
            <div class="btns text-center">
                <el-button type="primary" size="small" @click="selectAll">全选/全不选</el-button>
                <el-button type="primary" size="small" @click="confirmMenu">确定</el-button>
                <el-button type="primary" size="small" @click="cancelBtn">取消</el-button>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        props: {
            menus: Array,
            menuChecked:  Array,
            flagShowHeadMenuProp: Boolean
        },
        data() {
            return {
                flagAllSelected: false,
                flagShowHeadMenu: false,
                checkedList: []
            }
        },
        created() {
            this.checkedList = this.menus;
        },

        methods: {
            showHeadMenu() {
                let _this = this;
                // console.log(_this.menuChecked)
                _this.checkedList = _this.menuChecked
                this.flagShowHeadMenu = !this.flagShowHeadMenu
            },
            confirmMenu() {
                let _this = this;
                console.log(_this.checkedList);
                _this.$emit('getCheckedHeader', _this.checkedList);
                _this.flagShowHeadMenu = false;
            },
            selectAll() {
                let _this = this;
                if(_this.flagAllSelected) {
                    // console.log('全选');
                    _this.checkedList = _this.menus;
                } else {
                    // console.log('全不选');
                    _this.checkedList = [];
                }
                _this.flagAllSelected = !_this.flagAllSelected
            },
            cancelBtn() {
                this.flagShowHeadMenu = false;
            }
        }
    }
</script>
<style scoped>
    .headmenu {
        position: relative;
        z-index: 9;
    }

    .headmenu .headitem {
        width: 600px;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #ccc;
        text-align: left;
        color: #47b579;
        padding: 20px 20px;
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: 28px;
    }

    .btns {
        padding: 12px 0px 0px;
    }

    .headmenu .el-checkbox {
        margin-right: 8px;
    }

    .headmenu .el-checkbox + .el-checkbox {
        margin-left: 0px;
        margin-right: 15px;
        margin-bottom: 10px
    }

    .headmenu .el-checkbox__label {
        padding-left: 4px;
    }
</style>