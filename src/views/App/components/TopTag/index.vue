<template>
    <div>
        <el-tabs class="my1-el-tabs" type="border-card" v-model="activeNameCar">
            <el-tab-pane label="在线车辆" name="1">
                <el-table
                        class="my1-el-table-list"
                        :data="vehicletableData.filter(data => !search || data.licensePlateNum.toLowerCase().includes(search.toLowerCase()) || data.idNumber.toLowerCase().includes(search.toLowerCase()) || data.studentName.toLowerCase().includes(search.toLowerCase()))"
                        @row-dblclick="vehicleDblclick"
                        :row-class-name="tableRowClassName"
                        header-row-class-name="headerrowclass"
                        @row-contextmenu="rightClick"
                        style="width: 100%;cursor:pointer;"
                        :height="tableHeight"
                >
                    <el-table-column prop="status" label="状态" align="center" width="50">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.status">{{ scope.row.status }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="licensePlateNum" label="车牌号" align="center" width="80">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.licensePlateNum">{{ scope.row.licensePlateNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="studentName" label="学员姓名" align="center" width="70">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.studentName">{{ scope.row.studentName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="speed" label="车速" align="center" width="85">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.speed">{{ scope.row.speed }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rotateSpeed" label="发动机转速" align="center" width="80">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.rotateSpeed">{{ scope.row.rotateSpeed }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gears" label="档位" align="center" width="60">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.gears">{{ scope.row.gears }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="direction" label="方向盘角度" align="center" width="80">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.direction">{{ scope.row.direction }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="workingHours" label="学员登录时长" align="center" width="110">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.workingHours">{{ scope.row.workingHours }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="clutchFrequency" label="离合频次" align="center" width="65">
                      <template slot-scope="scope">
                      <span :class="{'red':scope.row.status != '在线'}" v-if="scope.row&&scope.row.clutchFrequency">{{scope.row.clutchFrequency}}</span>
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="brakeFrequency" label="刹车频次" align="center" width="85">
                        <template slot-scope="scope">
                    <span :class="{'red':scope.row.status != '在线'}"
                          v-if="scope.row&&scope.row.brakeFrequency">{{ scope.row.brakeFrequency }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label=" " align="center" min-width="2">
                        <template slot-scope="scope">
                            <span :class="{'red':scope.row.status != '在线'}" v-if="scope.row&&scope.row.status"> </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="successRate" label="成功率" align="left" min-width="50">
                      <template slot-scope="scope">
                      <span :class="{'red':scope.row.status != '在线'}" v-if="scope.row&&scope.row.successRate">{{scope.row.successRate}}</span>
                      </template>
                    </el-table-column> -->
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "topTag",
        props: {
            headerText: Array
        },
        data() {
            return {}
        },
        methods: {
            changeParent() {
                let _self = this;
                _self.$emit('changeText', 'b')
            },
        },
        mounted () {
            let _this=this;
            let {headerText}=_this._props;
            console.log('headerText == ', headerText);

        }
    }
</script>

<style scoped>

</style>