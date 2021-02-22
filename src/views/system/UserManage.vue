<template>
  <div>
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main style="padding:10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <span>用户管理</span> -->
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
              <el-form-item label="用户名">
                <el-input v-model="queryForm.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="queryForm.enable" placeholder="状态">
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="停用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="list">查询</el-button>
                <el-button type="success" @click="insertFormVisible = true">新增</el-button>
                <!-- <el-button type="warning">修改</el-button> -->
                <!-- <el-button type="danger">删除</el-button> -->
              </el-form-item>
            </el-form>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-if="false" prop="id" label="id"></el-table-column>
              <el-table-column prop="username" label="用户名"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="enable" label="状态">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.enable === 1 ? 'success' : 'warning'"
                    disable-transitions
                    effect="dark"
                  >{{scope.row.enable | enableTxt}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <!-- <el-button @click="handleClick(scope.row)" type="" size="small">查看</el-button> -->
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.row)"
                  ></el-button>
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
            ></el-pagination>
          </div>
        </el-card>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>

    <!-- 新增用户表单dialog start -->
    <el-dialog title="新增用户" :visible.sync="insertFormVisible" width center>
      <el-form :model="addForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="addForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" :label-width="formLabelWidth">
          <el-input v-model="addForm.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="enable" :label-width="formLabelWidth">
          <el-select v-model="addForm.enable" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增用户表单dialog end -->
  </div>
</template>




<script>
export default {
  name: "userManage",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      queryForm: {
        username: "",
        region: ""
      },
      pagination: {
        currentPage: 1,
        total: 0,
        pageSizes: [3, 10, 20, 50, 100],
        pageSize: 10
      },
      // gridData: [],
      // dialogTableVisible: false,
      // isInsert判断是添加还是修改
      isInsert: true,
      insertFormVisible: false,
      addForm: {
        username: "",
        name: "",
        sex: 1,
        age: "",
        tel: "",
        mail: "",
        enable: "1"
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.list();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.list();
      console.log(`当前页: ${val}`);
    },
    // 分页获取用户信息列表
    list() {
      this.$axios
        .get(this.$api+"sys/user/list", {
          // this.$baseUrl 获取baseUrl.BASEURL 全局变量
          // .get(baseUrl + "/sys/user/list", {
          params: {
            currentPage: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            username: this.queryForm.username,
            enable: this.queryForm.enable
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增/修改用户
    addOrUpdate() {
      if (this.isInsert) {
        this.add();
      } else {
        this.update();
      }
    },
    add() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.addForm));
      // alert(this.validate());
      this.$axios
        .get(this.$api+"sys/user/add", {
          params: params
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            // 隐藏添加框
            this.insertFormVisible = false;
            this.list();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    update() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.addForm));
      // alert(this.validate());
      this.$axios({
        method: "post",
        url: this.$api+"sys/user/update",
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            // 隐藏添加框
            this.insertFormVisible = false;
            this.isInsert = true;
            this.list();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改用户
    handleEdit(row) {
      this.isInsert = false;
      this.addForm = JSON.parse(JSON.stringify(row));
      // :visible.sync="insertFormVisible" 展示用户信息添加框
      this.insertFormVisible = true;
    },
    // update() {},
    // 删除用户
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          alert(row.id);
          this.$axios
            .get(this.$api+"sys/user/delete", {
              params: {
                id: row.id
              }
            })
            .then(res => {
              // console.log(res);
              if (res.data.status == 200) {
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.list();
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
      // this.isInsert = false;
      // this.addForm = JSON.parse(JSON.stringify(row));
      // :visible.sync="insertFormVisible" 展示用户信息添加框
      // this.insertFormVisible = true;
    }
    // delete() {}
    //
  },
  filters: {
    enableTxt: function(value) {
      if (value == 0) {
        return "停用";
      } else if (value == 1) {
        return "启用";
      }
    }
  }
};
</script>