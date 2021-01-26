<template>
  <div>
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
            <el-button icon="el-icon-s-operation"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="insertTask">新增任务</el-dropdown-item>
              <el-dropdown-item command="deleteTask">删除任务</el-dropdown-item>
              <el-dropdown-item command="stopTask">暂停任务</el-dropdown-item>
              <el-dropdown-item command="recoverTask">恢复任务</el-dropdown-item>
              <el-dropdown-item command="runTask">执行任务</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button icon="el-icon-search" style="float: right;margin-right: 10px;"></el-button>
        </el-form>
      </div>
      <div></div>
    </el-card>

    <!---新增/修改弹窗--->
    <el-dialog title="收货地址" :visible.sync="insertOrUpdateFormVisible">
      <el-form :model="insertOrUpdateform">
        <el-form-item label="bean名称" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.beanName"></el-input>
        </el-form-item>
        <el-form-item label="任务组名称" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.jobgroup"></el-input>
        </el-form-item>
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.methodName"></el-input>
        </el-form-item>
        <el-form-item label="参数名称" :label-width="formLabelWidth">
          <el-input v-model="insertOrUpdateform.params"></el-input>
        </el-form-item>
        <el-form-item label="cron表达式" :label-width="formLabelWidth">
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
  // name: "timedTask",
  data: function() {
    return {
      queryform: {
        beanName: "",
        methodName: "",
        status: ""
      },
      formLabelWidth: "120px",
      insertOrUpdateFormVisible: false,
      insertOrUpdateform: {
        beanName: "",
        jobgroup: "",
        methodName: "",
        params: "",
        cronExpression: "",
        remark: ""
      }
    };
  },
  methods: {
    taskCommand(value) {
      if (value == "insertTask") {
        this.insertTask();
      } else if (value == "deleteTask") {
      } else if (value == "deleteTask") {
      } else if (value == "stopTask") {
      } else if (value == "recoverTask") {
      } else if (value == "runTask") {
      }
    },
    insertTask() {
      this.insertOrUpdateFormVisible = true;
    },
    btn_submit() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.insertOrUpdateform));
      console.log(params, "params.......................");
      this.$axios
        .get("/api/job/add", {
          params: params
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>