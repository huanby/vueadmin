<template>
  <el-container>
    <el-main style="padding: 10px;">
      <el-card class="box-card">
        <div slot="header">
          <el-form :inline="true" :model="queryform" class="demo-form-inline">
            <el-form-item label="表名" style="margin-bottom: 0px;">
              <el-input v-model="queryform.tableName"></el-input>
            </el-form-item>
            <el-button @click="selectInfos" icon="el-icon-search">搜索</el-button>
          </el-form>
        </div>
        <div :style="{'width': '100%','height':tableHeight}">
          <el-table
            :data="tableData"
            height="98%"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            border
            size="mini"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="表名" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column prop="dataRows" label="数据量（行）" align="center"></el-table-column>
            <el-table-column
              width="150"
              prop="createTime"
              label="创建时间"
              align="center"
              :formatter="dateFormatter"
            ></el-table-column>
            <el-table-column
              width="150"
              prop="updateTime"
              label="修改时间"
              align="center"
              :formatter="dateFormatter"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-download"
                  size="mini"
                  @click="handleDownload(scope.row)"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            style="float:right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="prev, pager, next, jumper, sizes,total"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: "",
      queryform: {
        tableName: ""
      },
      loading: false,
      tableData: [],
      pagination: {
        currentPage: 1,
        total: 0,
        pageSizes: [100, 200, 300, 400],
        pageSize: 100
      },
      multipleSelection: []
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    let that = this;
    window.onresize = function temp() {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.selectInfos();
  },
  methods: {
    // formater
    dateFormatter: function(row, column, cellValue, index) {
      if (cellValue != null && cellValue != "") {
        return this.$utils.utcToString(cellValue, "yyyy-MM-dd HH:mm");
      } else {
        return "";
      }
    },
    /**
     * checkbox 选择事件
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.selectInfos();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.selectInfos();
      console.log(`当前页: ${val}`);
    },
    selectInfos() {
      this.loading = true;
      this.$axios
        .get("http://127.0.0.1:8089/generator/tables/info", {
          params: {
            pageSize: this.pagination.pageSize,
            currentPage: this.pagination.currentPage,
            tableName: this.queryform.tableName
          }
        })
        .then(res => {
          this.tableData = res.data.data.records;
          this.pagination.total = res.data.data.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    handleDownload(row) {
      this.$confirm(
        "确定生成数据表 " + row.name + " 对应的前后端代码？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          window.location.href =
            "http://127.0.0.1:8089/generator" +
            "?name=" +
            row.name +
            "&remark=" +
            row.remark;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    tableHeight: function() {
      return this.clientHeight - 245 + "px";
    }
  }
};
</script>

