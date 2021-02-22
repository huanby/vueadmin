<template>
  <el-container>
    <el-main style="padding: 10px;">
      <el-card class="box-card">
        <div slot="header">
          <el-form :inline="true" :model="queryform" class="demo-form-inline">
            <el-form-item label="Bean名称" style="margin-bottom: 0px;">
              <el-input v-model="queryform.beanName"></el-input>
            </el-form-item>
            <el-form-item label="方法名称" style="margin-bottom: 0px;">
              <el-input v-model="queryform.methodName"></el-input>
            </el-form-item>
            <el-form-item label="状态" style="margin-bottom: 0px;">
              <el-select v-model="queryform.status" placeholder="请选择">
                <el-option label="请选择" value></el-option>
                <el-option label="成功" value="0"></el-option>
                <el-option label="失败" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-dropdown style="float: right;margin-right: 50px;" @command="dropdownCommand">
              <el-button icon="el-icon-s-operation">菜单</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="batchDeleteJobLog">删除日志</el-dropdown-item>
                <el-dropdown-item command="exportJobLog">导出Excal</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-button
              @click="selectJobLogInfos"
              icon="el-icon-search"
              style="float: right;margin-right: 10px;"
            >搜索</el-button>
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
            <el-table-column prop="jobId" label="任务ID" align="center"></el-table-column>
            <el-table-column prop="beanName" label="Bean名称" align="center"></el-table-column>
            <el-table-column prop="methodName" label="方法名称" align="center"></el-table-column>
            <el-table-column prop="params" label="方法参数" align="center"></el-table-column>
            <el-table-column
              width="150"
              prop="createTime"
              label="执行时间"
              align="center"
              :formatter="dateFormatter"
            ></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status == 1 ? 'danger' : 'success'"
                  disable-transitions
                  effect="dark"
                >{{scope.row.status | statusFilter}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="error" label="异常信息" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="times" label="耗时" align="center">
              <template slot-scope="scope">
                <el-tag :type="'success'" disable-transitions>{{scope.row.times}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
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
  name: "taskLog",
  data: function() {
    return {
      clientHeight: "",
      queryform: {
        beanName: "",
        methodName: "",
        status: ""
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
    this.selectJobLogInfos();
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
    dropdownCommand(value) {
      if (value == "batchDeleteJobLog") {
        this.batchDeleteJobLog();
      } else if (value == "exportJobLog") {
        this.exportJobLog();
      }
    },
    /**
     * 批量删除
     */
    batchDeleteJobLog() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请先勾选数据！",
          type: "warning"
        });
        return;
      }
      let ids = [];
      this.multipleSelection.forEach(function(item, index) {
        ids.push(item.logId);
      });
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(this.$api+"joblog/batchDelete", {
              ids: JSON.stringify(ids)
            })
            .then(res => {
              if (res.data.data == 1) {
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.selectJobLogInfos();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    exportJobLog() {},
    /**
     * checkbox 选择事件
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.selectJobLogInfos();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.selectJobLogInfos();
      console.log(`当前页: ${val}`);
    },
    selectJobLogInfos() {
      this.loading = true;
      this.$axios
        .get(this.$api+"joblog/list", {
          params: {
            pageSize: this.pagination.pageSize,
            currentPage: this.pagination.currentPage,
            beanName: this.queryform.beanName,
            methodName: this.queryform.methodName,
            status: this.queryform.status
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
    /**
     * 删除日志
     */
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(this.$api+"joblog/delete", {
              params: {
                id: row.logId
              }
            })
            .then(res => {
              if (res.data.data == 1) {
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.selectJobLogInfos();
              }
            })
            .catch(err => {
              console.log(err);
            });
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
  },
  filters: {
    statusFilter: function(value) {
      if (value == 0) {
        return "成功";
      } else if (value == 1) {
        return "失败";
      }
    }
  }
};
</script>