<template>
  <div class="demo-image">
    <el-row :gutter="10" style="height: 200px">
      <el-col :span="6" style="height:100%">
        <div class="grid-content bg-purple"
             style="width: 100%; height:100%; background: #F56C6C">
          <el-image
                  style="width: 100%; height: 100%; padding: 0"
                  :src="url"
                  :fit="fill"></el-image>
        </div>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div
                class="grid-content bg-purple-light"
                style="width: 100%; height:100%; background: #b3d8ff"
        >
          <el-image
                  style="width: 100%; height: 100%;"
                  :src="url"
                  :fit="fill"></el-image>
        </div>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div
                class="grid-content bg-purple"
                style="width: 100%; height:100%; background: #F56C6C"
        >
          <el-image
                  style="width: 100%; height: 100%;"
                  :src="url"
                  :fit="fill"></el-image>
        </div>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div
                class="grid-content bg-purple-light"
                style="width: 100%; height:100%; background: #b3d8ff"
        >
          <el-image
                  style="width: 100%; height: 100%;"
                  :src="url"
                  :fit="fill"></el-image>
        </div></el-col>
    </el-row>

    <el-row :gutter="10" style="height: 200px; margin-top: 10px">
      <el-col :span="6" style="height:100%">
        <div class="grid-content bg-purple"
             style="width: 100%; height:100%; background: #F56C6C">
          <el-image
                  style="width: 100%; height: 100%; padding: 0"
                  :src="url"
                  :fit="fill"></el-image>
        </div>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div
                class="grid-content bg-purple-light"
                style="width: 100%; height:100%; background: #b3d8ff"
        >
          <el-image
                  style="width: 100%; height: 100%;"
                  :src="url"
                  :fit="fill"></el-image>
        </div>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div
                class="grid-content bg-purple"
                style="width: 100%; height:100%; background: #F56C6C"
        >
          <el-image
                  style="width: 100%; height: 100%;"
                  :src="url"
                  :fit="fill"></el-image>
        </div>
      </el-col>
      <el-col :span="6" style="height:100%">
        <div
                class="grid-content bg-purple-light"
                style="width: 100%; height:100%; background: #b3d8ff"
        >
          <el-image
                  style="width: 100%; height: 100%;"
                  :src="url"
                  :fit="fill"></el-image>
        </div></el-col>
    </el-row>
    <div class="block">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[50, 100, 200, 500]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="500">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "gallery",
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>
  .demo-image {
    width: 100%;
    background: #e6a23c;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 10px 0 10px;
  }
</style>
