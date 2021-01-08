<template>
    <div>
        <div>
            <div>
                <div @click="addAge">birthday--</div>
                <div @click="addAge">birthday++</div>
            </div>
            <MenuHeader
                    style="float:right;"
                    :menus="menus"
                    :menuChecked="menuChecked"
                    @getCheckedHeader="getCheckedHeader"
            />
        </div>
        <div>
            <el-table
                    :data="pageList"
                    style="width: 100%"
                    ref="myTable"
            >
                <el-table-column prop="name" label="优惠券ID" class-name="pl20"></el-table-column>
                <el-table-column prop="age" label="优惠券名称"></el-table-column>
                <el-table-column prop="position" label="状态">
                </el-table-column>
            </el-table>
            <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[10, 80, 150, 300]"
                    :total="informationList.length"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>

        <div>
            <input v-model="processName"></input>
        </div>
    </div>
</template>

<script>
    import UsersData from '@/assets/mockData/users.json'
    import MenuHeader from '@/components/menuHeader'
    export default {
        name: 'userTable',
        data() {
            return {
                queryResultsData: false,
                informationList: [],
                pageList: [],
                resetTableBoolean: true,
                currentPage: 1,
                pageSize: 10,
                currentTotal: 0,
                tableData: [],

                menuChecked: [
                    '编号', "学员姓名", "身份证号", "手机", "备用手机", "性别",
                    '车型', "车型班别", "报名时间", "财务审核时间", "备注",
                    "培训备注", "领证时间", "报名来源", "代理人", "区域码",
                    "推荐人", "状态", "科二进度", "科二教练组", "科三进度", "科三教练组",
                    "公安网审核日期", "公安网审核次数", "公安网审核状态",
                    "科目一", "科一次数", "科一状态", "科目二", "科二次数",
                    "科二状态", "科目三", "科三次数", "科三状态", "科目四",
                    "科四次数", '科四状态', '归属', '优先级', '地址'
                ],
                menus: [
                    '编号', "学员姓名", "身份证号", "手机", "备用手机", "性别",
                    '车型', "车型班别", "报名时间", "财务审核时间", "备注",
                    "培训备注", "领证时间", "报名来源", "代理人", "区域码",
                    "推荐人", "状态", "科二进度", "科二教练组", "科三进度", "科三教练组",
                    "公安网审核日期", "公安网审核次数", "公安网审核状态",
                    "科目一", "科一次数", "科一状态", "科目二", "科二次数",
                    "科二状态", "科目三", "科三次数", "科三状态", "科目四",
                    "科四次数", '科四状态', '归属', '优先级', '地址'
                ],
                processName: ''
            }
        },
        components: {
            MenuHeader
        },
        watch:{
            //当搜索框没有数据时，显示具体模块，同时隐藏具体模块的内容
            processName(newVal){
                console.log('newVal == ', newVal);
                if (newVal === "") {
                    this.isShow = true;
                    this.typelist = false
                }
            }
        },
        methods: {
            handleSizeChange: function(pageSize) {
                this.pageSize = pageSize;
                this.handleCurrentChange(this.currentPage);
            },
            handleCurrentChange (currentPage) {
                console.log('handleCurrentChange')
                let _this = this;
                _this.currentPage = currentPage;
                _this.currentChangePage(_this.informationList, currentPage);
            },
            currentChangePage(list, currentPage) {
                let _this = this;
                let from = (currentPage - 1) * this.pageSize;
                let to = currentPage * this.pageSize;
                this.pageList = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        _this.pageList.push(list[from]);
                    }
                }
            },
            getCheckedHeader(data) {
                let _this = this;
                _this.checkedmenu = data;
                _this.menuChecked = data;
            },
            addAge() {

            }
        },
        mounted () {

            let _this = this
            let develop = true

            if(develop) {
                console.log('UsersData == ', UsersData);
                _this.informationList = UsersData['data'];
                _this.currentChangePage(UsersData['data'], 1);
            } else {

            }
        }

    }
</script>

<style>

</style>
