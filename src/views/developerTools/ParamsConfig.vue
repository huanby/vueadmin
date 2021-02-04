<template>
  <el-container>
    <el-main style="padding: 10px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>代码生成参数配置</span>
          <el-button @click="updateConfig" style="float: right; padding: 3px 0" type="text">修改</el-button>
        </div>
        <div :style="{'width': '100%','height':tableHeight}">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <font>作者名称</font>
                <br>
                <br>
                <font>基础包名</font>
                <br>
                <br>
                <font>entity包名</font>
                <br>
                <br>
                <font>service包名</font>
                <br>
                <br>
                <font>serviceImpl包名</font>
                <br>
                <br>
                <font>mapper包名</font>
                <br>
                <br>
                <font>mapperXml包名</font>
                <br>
                <br>
                <font>controller包名</font>
                <br>
                <br>
                <font>表前缀</font>
                <br>
                <br>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <font>{{config.author}}</font>
                <br>
                <br>
                <font>{{config.basePackage}}</font>
                <br>
                <br>
                <font>{{config.entityPackage}}</font>
                <br>
                <br>
                <font>{{config.servicePackage}}</font>
                <br>
                <br>
                <font>{{config.serviceImplPackage}}</font>
                <br>
                <br>
                <font>{{config.mapperPackage}}</font>
                <br>
                <br>
                <font>{{config.mapperXmlPackage}}</font>
                <br>
                <br>
                <font>{{config.controllerPackage}}</font>
                <br>
                <br>
                <font>{{config.trimValue}}</font>
                <br>
                <br>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>

    <el-dialog title="代码生成参数配置" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="作者名称" prop="author" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="基础包名" prop="basePackage" :label-width="formLabelWidth">
          <el-input v-model="form.basePackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="entity包名" prop="entityPackage" :label-width="formLabelWidth">
          <el-input v-model="form.entityPackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="service包名" prop="servicePackage" :label-width="formLabelWidth">
          <el-input v-model="form.servicePackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="serviceImpl包名" prop="serviceImplPackage" :label-width="formLabelWidth">
          <el-input v-model="form.serviceImplPackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="mapper包名" prop="mapperPackage" :label-width="formLabelWidth">
          <el-input v-model="form.mapperPackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="mapperXml包名" prop="mapperXmlPackage" :label-width="formLabelWidth">
          <el-input v-model="form.mapperXmlPackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="controller包名" prop="controllerPackage" :label-width="formLabelWidth">
          <el-input v-model="form.controllerPackage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否去除表前缀" :label-width="formLabelWidth">
          <el-radio v-model="form.isTrim" label="0">
            <el-tag type="success">是</el-tag>
          </el-radio>
          <el-radio v-model="form.isTrim" label="1">
            <el-tag>否</el-tag>
          </el-radio>
        </el-form-item>
        <el-form-item label="表前缀" :label-width="formLabelWidth">
          <el-input v-model="form.trimValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: "",
      config: {
        author: "",
        basePackage: "",
        controllerPackage: "",
        entityPackage: "",
        id: 1,
        isTrim: "",
        mapperPackage: "",
        mapperXmlPackage: "",
        serviceImplPackage: "",
        servicePackage: "",
        trimValue: ""
      },
      form: {
        author: "",
        basePackage: "",
        controllerPackage: "",
        entityPackage: "",
        isTrim: "0",
        mapperPackage: "",
        mapperXmlPackage: "",
        serviceImplPackage: "",
        servicePackage: "",
        trimValue: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        basePackage: [
          { required: true, message: "请输入基础包名", trigger: "blur" }
        ],
        controllerPackage: [
          { required: true, message: "请输入controller包名", trigger: "blur" }
        ],
        entityPackage: [
          { required: true, message: "请输入entity包名", trigger: "blur" }
        ],
        servicePackage: [
          { required: true, message: "请输入service包名", trigger: "blur" }
        ],
        serviceImplPackage: [
          { required: true, message: "请输入serviceImpl包名", trigger: "blur" }
        ],
        mapperPackage: [
          { required: true, message: "请输入mapper包名", trigger: "blur" }
        ],
        mapperXmlPackage: [
          { required: true, message: "请输入mapperXml包名", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    let that = this;
    window.onresize = function temp() {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.selectInfo();
  },
  computed: {
    tableHeight: function() {
      return this.clientHeight - 230 + "px";
    }
  },
  methods: {
    selectInfo() {
      this.$axios
        .get("http://127.0.0.1:8089/generatorConfig/list", {
          params: {}
        })
        .then(res => {
          console.log(res.data);
          this.config = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateConfig() {
      this.form = JSON.parse(JSON.stringify(this.config));
      this.dialogFormVisible = true;
    },
    submit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.form["id"] = this.config.id;
          this.$axios
            .get("http://127.0.0.1:8089/generatorConfig/save", {
              params: this.form
            })
            .then(res => {
              console.log(res.data);
              this.dialogFormVisible = false;
              this.selectInfo();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
font {
  font-size: 14px;
}
</style>


