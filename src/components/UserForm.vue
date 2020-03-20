<template>
<el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm" :disabled="disabled">
  <el-form-item :label="$t('column.userId')" prop="userId">
    <el-input v-model="userForm.userId"></el-input>
  </el-form-item>
  <el-form-item :label="$t('column.userName')" prop="userName">
    <el-input v-model="userForm.userName"></el-input>
  </el-form-item>
  <el-form-item :label="$t('column.certType')" prop="certType">
    <el-select v-model="userForm.certType" :placeholder="$t('system.pickTip')">
      <el-option label="身份证" value="01"></el-option>
      <el-option label="军官证" value="02"></el-option>
      <el-option label="其他证件" value="03"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item :label="$t('column.certId')" prop="certId">
    <el-input v-model="userForm.certId"></el-input>
  </el-form-item>
  <el-form-item :label="$t('column.phoneNo')" prop="phoneNo">
    <el-input v-model="userForm.phoneNo"></el-input>
  </el-form-item>
  <el-form-item :label="$t('column.email')" prop="email">
    <el-input v-model="userForm.email"></el-input>
  </el-form-item>
  <el-form-item :label="$t('column.passWord')" prop="passWord">
    <el-input type="password" v-model="userForm.passWord"></el-input>
  </el-form-item>
  <div>
</div>
</el-form>
</template>

<script>
import {myaxios} from '@/common/Interceptor'
export default {
  name: 'userinfo',
  data () {
    return {
      disabled: false,
      userForm: {
        userId: '',
        userName: '',
        certType: '',
        certId: '',
        phoneNo: '',
        email: ''
      },
      rules: {
        userId: [
          { required: true, message: '请输入用户编号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        phoneNo: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (userForm) {
      console.log(this.userForm)
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          var url = '/demo/user/adduser'
          var method = 'POST'
          var params = this.userForm
          myaxios(url, method, params).then(data1 => {
            let status = data1.data.body
            if (status === '01') {
              this.$message.success(`${this.$t('message.newUserSuccess')}`)
            } else {
              this.$message.error(`${this.$t('message.newUserFail')}`)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
