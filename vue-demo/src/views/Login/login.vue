<template>
  <el-form ref="ruleForm" label-width="70px" class="demo-ruleForm" :model="ruleForm" :rules="rules">
    <el-form-item label="学号:" prop="studentNum">
      <el-input v-model="ruleForm.studentNum"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        password: "",
        studentNum: ""
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        studentNum: [{ required: true, message: "请输入学号", trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async valid => {
        
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>