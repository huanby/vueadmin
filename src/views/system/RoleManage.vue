<template>
  <div>
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main style="padding:10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <span>角色管理</span> -->
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
              <el-form-item label="角色标识">
                <el-input v-model="queryForm.rolesign" placeholder="角色标识"></el-input>
              </el-form-item>
              <el-form-item label="角色名称">
                <el-input v-model="queryForm.rolename" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="queryForm.enable" placeholder="状态">
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="停用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="list">查询</el-button>
                <el-button type="success" @click="roleFormVisible = true">新增</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-if="false" prop="id" label="角色主键id"></el-table-column>
              <el-table-column prop="rolesign" label="角色标识"></el-table-column>
              <el-table-column prop="rolename" label="角色名称"></el-table-column>
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

    <!-- 新增角色表单dialog start -->
    <el-dialog title="新增角色" :visible.sync="roleFormVisible" width center>
      <el-form :model="roleForm">
        <el-form-item label="角色标识" :label-width="formLabelWidth">
          <el-input v-model="roleForm.rolesign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="roleForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="enable" :label-width="formLabelWidth">
          <el-select v-model="roleForm.enable" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增角色表单dialog end -->
  </div>
</template>

<script>
export default {
  name: "soleManage",
  data: function() {
    return {
      tableData: [],
      queryForm: {
        rolesign: "",
        rolename: "",
        region: ""
      },
      pagination: {
        currentPage: 1,
        total: 0,
        pageSizes: [3, 10, 20, 50, 100],
        pageSize: 10
      },
      isInsert: true,
      roleFormVisible: false,
      roleForm: {
        rolesign: "",
        rolename: "",
        remark: "",
        enable: 1
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
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.list();
      // console.log(`当前页: ${val}`);
    },
    // 分页获取角色信息列表
    list() {
      this.$axios
        .get(this.$api+"sys/role/list", {
          params: {
            currentPage: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            rolesign: this.queryForm.rolesign,
            rolename: this.queryForm.rolename,
            enable: this.queryForm.enable
          }
        })
        .then(res => {
          // console.log(res);
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 展示修改角色
    handleEdit(row) {
      this.isInsert = false;
      this.roleForm = JSON.parse(JSON.stringify(row));
      // :visible.sync="roleFormVisible" 展示角色信息添加框
      this.roleFormVisible = true;
    },
    // 新增/修改角色
    addOrUpdate() {
      if (this.isInsert) {
        this.add();
      } else {
        this.update();
      }
    },
    add() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.roleForm));
      // alert(this.validate());
      this.$axios
        .get(this.$api+"sys/role/add", {
          params: params
        })
        .then(res => {
          // console.log(res);
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
    //修改角色信息
    update() {
      // 值拷贝
      let params = JSON.parse(JSON.stringify(this.roleForm));
      // alert(this.validate());
      this.$axios({
        method: "post",
        url: this.$api+"sys/role/update",
        data: params
      })
        .then(res => {
          // console.log(res);
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
    // 删除角色
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // alert(row.id);
          this.$axios
            .get(this.$api+"sys/role/delete", {
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