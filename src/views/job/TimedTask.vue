<template>
  <div>
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
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="暂停" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-dropdown style="float: right;margin-right: 50px;" @command="taskCommand">
                <el-button icon="el-icon-s-operation">菜单</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="insertTask">新增任务</el-dropdown-item>
                  <el-dropdown-item command="batchDelete">删除任务</el-dropdown-item>
                  <el-dropdown-item command="stopTask">暂停任务</el-dropdown-item>
                  <el-dropdown-item command="recoverTask">恢复任务</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button
                @click="selectJobInfos"
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
              border
              size="mini"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="jobId" label="任务ID" align="center"></el-table-column>
              <el-table-column prop="beanName" label="Bean名称" align="center"></el-table-column>
              <el-table-column prop="methodName" label="方法名称" align="center"></el-table-column>
              <el-table-column prop="params" label="方法参数" align="center"></el-table-column>
              <el-table-column prop="cronExpression" label="cron表达式" align="center"></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
                :formatter="dateFormatter"
              ></el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.status === 1 ? 'warning' : 'success'"
                    disable-transitions
                    effect="dark"
                  >{{scope.row.status | stateTxt}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-edit"
                    type="primary"
                    size="mini"
                    @click="handleEdit(scope.row)"
                    circle
                  ></el-button>
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

    <!---新增/修改弹窗--->
    <el-dialog title="收货地址" :visible.sync="insertOrUpdateFormVisible">
      <el-form :model="insertOrUpdateform" :rules="rules" ref="ruleForm">
        <el-form-item label="bean名称" prop="beanName" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.beanName"></el-input>
        </el-form-item>
        <el-form-item label="方法名称" prop="methodName" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.methodName"></el-input>
        </el-form-item>
        <el-form-item label="参数名称" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.params"></el-input>
        </el-form-item>
        <el-form-item label="cron表达式" prop="cronExpression" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.cronExpression"></el-input>
        </el-form-item>
        <el-form-item label="任务备注" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertOrUpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "timedTask",
  data: function() {
    return {
      isInsert: true,
      clientHeight: "",
      queryform: {
        beanName: "",
        methodName: "",
        status: ""
      },
      formLabelWidth: "120px",
      insertOrUpdateFormVisible: false,
      insertOrUpdateform: {
        jobName: "",
        beanName: "testTask",
        jobgroup: "",
        methodName: "test",
        params: "这是一条消息",
        cronExpression: "*/5 * * * * ?",
        remark: ""
      },
      //insertOrUpdateform验证
      rules: {
        beanName: [
          { required: true, message: "请输入bean名称", trigger: "blur" }
        ],
        methodName: [
          { required: true, message: "请输入方法名称", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "请输入cron表达式", trigger: "blur" }
        ]
      },
      tableData: [],
      multipleSelection: [],
      pagination: {
        currentPage: 1,
        total: 0,
        pageSizes: [100, 200, 300, 400],
        pageSize: 100
      }
    };
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
    //------------------------------------------
    taskCommand(value) {
      if (value == "insertTask") {
        this.insertTask();
      } else if (value == "batchDelete") {
        this.batchDelete();
      } else if (value == "stopTask") {
        this.stopTask();
      } else if (value == "recoverTask") {
        this.recoverTask();
      }
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.selectJobInfos();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.selectJobInfos();
      console.log(`当前页: ${val}`);
    },
    insertTask() {
      this.isInsert = true;
      this.insertOrUpdateFormVisible = true;
    },
    selectJobInfos() {
      this.$axios
        .get("http://127.0.0.1:8089/job/list", {
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 批量删除任务
     */
    batchDelete() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请先勾选数据！",
          type: "warning"
        });
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("http://127.0.0.1:8089/job/batchDelete", {
              list: JSON.stringify(this.multipleSelection)
            })
            .then(res => {
              if (res.data.data == 1) {
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.selectJobInfos();
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
    handleEdit(row) {
      this.isInsert = false;
      this.insertOrUpdateform = JSON.parse(JSON.stringify(row));
      this.insertOrUpdateFormVisible = true;
    },
    /**
     * 删除任务
     */
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("http://127.0.0.1:8089/job/delete", {
              params: row
            })
            .then(res => {
              if (res.data.data == 1) {
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.selectJobInfos();
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
    /**
     * 暂停任务
     */
    stopTask() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请先勾选数据！",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post("http://127.0.0.1:8089/job/pauseJob", {
          list: JSON.stringify(this.multipleSelection)
        })
        .then(res => {
          if (res.data.data == 1) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.selectJobInfos();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 恢复任务
     */
    recoverTask() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请先勾选数据！",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post("http://127.0.0.1:8089/job/resumeJob", {
          list: JSON.stringify(this.multipleSelection)
        })
        .then(res => {
          if (res.data.data == 1) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.selectJobInfos();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * checkbox 选择事件
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    btn_submit() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.insertOrUpdateform));
      // alert(this.validate());
      if (this.isInsert) {
        this.$axios
          .get("http://127.0.0.1:8089/job/add", {
            params: params
          })
          .then(res => {
            if (res.data.data == 1) {
              this.$message({
                message: "操作成功！",
                type: "success"
              });
              this.insertOrUpdateFormVisible = false;
              this.selectJobInfos();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .get("http://127.0.0.1:8089/job/update", {
            params: params
          })
          .then(res => {
            if (res.data.data == 1) {
              this.$message({
                message: "操作成功！",
                type: "success"
              });
              this.insertOrUpdateFormVisible = false;
              this.selectJobInfos();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // insertOrUpdateform验证
    validate() {
      let flag = true;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    let that = this;
    window.onresize = function temp() {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.selectJobInfos();
  },
  computed: {
    tableHeight: function() {
      return this.clientHeight - 245 + "px";
    }
  },
  filters: {
    stateTxt: function(value) {
      if (value == 0) {
        return "正常";
      } else if (value == 1) {
        return "暂停";
      }
    }
  }
};
</script>