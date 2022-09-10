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
                  <el-option label="启用" :value="1"></el-option>
                  <el-option label="停用" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="list">查询</el-button>
                <el-button type="success" @click="insertFormVisible = true;getRoleList()">新增</el-button>
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
    <el-dialog v-bind:title="addFormTitle" :visible.sync="insertFormVisible" width center>
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
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="addForm.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
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
      // tableData
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
      // queryForm
      queryForm: {
        username: "",
        region: ""
      },
      // pagination
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
      // addForm
      addFormTitle:"新增用户",
      addForm: {
        username: "",
        name: "",
        sex: 1,
        age: "",
        tel: "",
        mail: "",
        enable: 1
        // enable: "启用"
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: ""
      },
      // formLabelWidth 表单宽度
      formLabelWidth: "120px",
      //role 角色列表选择器Select
      selectOptions: [
        // {
        //   value: "选项1",
        //   label: "黄金糕"
        // },
        // {
        //   value: "选项2",
        //   label: "双皮奶"
        // },
        // {
        //   value: "选项3",
        //   label: "蚵仔煎"
        // },
        // {
        //   value: "选项4",
        //   label: "龙须面"
        // },
        // {
        //   value: "选项5",
        //   label: "北京烤鸭"
        // }
      ],
      roles: [],
      // role角色树形列表
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.list();
      console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.list();
      console.log(`当前页: ${val}`);
    },
    // 分页获取用户信息列表
    list() {
      this.$axios
        .get(this.$api + "sys/user/list", {
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
    // 判断表单提交 新增/修改用户
    addOrUpdate() {
      if (this.isInsert) {
        //添加用户
        this.add();
      } else {
        //修改用户
        this.update();
      }
    },
    //添加用户
    add() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.addForm));
      // alert(this.validate());
      this.$axios
        // .post(this.$api + "sys/user/addUser", {
        //   user: JSON.stringify(this.addForm)
        // })
        .post(this.$api + "sys/user/addUser", JSON.stringify(this.addForm), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
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
    //更新用户
    update() {
      //多选框数据处理
      if (this.addForm.roles) {
            this.addForm.roles = this.addForm.roles.join(",");
          }
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.addForm));
      // alert(this.validate());
      this.$axios({
        method: "post",
        url: this.$api + "sys/user/update",
        data: params
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // params:{ //params,按照url拼接
        //   user: this.$qs.stringify(JSON.stringify(this.addForm)),
        //   rolestr: "aa22"
        // }
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
      this.addFormTitle = "编辑用户";
      this.addForm = JSON.parse(JSON.stringify(row));
      this.insertFormVisible = true; // :visible.sync="insertFormVisible" 展示用户信息添加框
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
            .get(this.$api + "sys/user/delete", {
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
    },
    //角色select框值改变时候触发的事件
    roleSelectChange(e) {
      var arrNew = [];
      var dataLength = this.selectOptions.length;
      var eleng = e.length;
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.selectOptions[i].label) {
            arrNew.push(this.selectOptions[i]);
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew); //设置勾选的值
    },
    //role角色列表选中事件
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.selectOptions = arr;
      this.roleSelect = arrLabel;
      console.log("arr:" + JSON.stringify(arr));
      console.log("arrLabel:" + arrLabel);
    },
    //获取用户角色信息
    getRoleList() {
      this.$axios
        .get(this.$api + "sys/user/add", {})
        .then(response => {
          // console.log(response);
          if (response.data.status == 200) {
            this.selectOptions = response.data.response;
          }
          // response.data.data.forEach(element => {
          //   this.selectOptions.push({ name: element.name, code: element.code });
          // });
        })
        .catch(err => {
          console.log(err);
        });
    }
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