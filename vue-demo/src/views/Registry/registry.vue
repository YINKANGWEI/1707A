<template>
  <el-form ref="ruleForm" label-width="70px" class="demo-ruleForm" :model="ruleForm" :rules="rules">
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="学号:" prop="studentNum" v-if="ruleForm.role == '3' || ruleForm.role == '2'">
      <el-input v-model="ruleForm.studentNum"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="身份:" prop="role">
      <el-select v-model="ruleForm.role" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :label="item.role" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        password: "",
        studentNum: "",
        username: "",
        role: ""
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        studentNum: [
          { required: true, message: "请输入学号", trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      options: []
    };
  },
  methods: {
    submitForm() {
      let { ruleForm } = this;
      this.$refs["ruleForm"].validate(async valid => {
        let res = await axios.post("/api/registry", { ...ruleForm });
        if (res.data.code) {
          this.$message({
            message: res.data.msg,
            type: "success"
          })
          this.$router.push("/login")
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }
  },
  async mounted() {
    let res = await axios.get("/api/user/role");
    this.options = res.data.data;
  }
};
</script>

<style lang="scss" scoped>
</style>