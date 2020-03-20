<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="active"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="menu in menus" :key=menu.menuId :index=menu.menuId>
          <i class="el-icon-location"></i>
          <span slot="title">{{menu.menuName}}</span>
        </el-menu-item>
        <el-select style="margin-left: 10px; width: 100px; margin-top: 10px; " v-model="selectValue" @change="langChange" :placeholder="$t('system.pickTip')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 10px;"  icon="el-icon-user" @click="logIn" circle></el-button>
        <el-button type="primary" style="margin-left: 10px;"  icon="el-icon-close" @click="logOut" circle></el-button>
        <el-button type="primary" style="margin-left: 10px;"  icon="el-icon-refresh" @click="refreshToken" circle></el-button>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <!-- <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button> -->
        </el-radio-group>
        <el-menu :default-active="subActive" class="el-menu-vertical-demo" @select="handleSelectSubMenu" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <div v-for="submenu in menu.subMenus" :key="submenu.menuId">
            <div v-if="submenu.leafNode === '0'" >
              <el-submenu :index="submenu.menuId">
                <!-- <i class="el-icon-menu"></i> -->
                <span slot="title">{{submenu.menuName}}</span>
                <el-menu-item v-for="submenu1 in submenu.subMenus" :key="submenu1.menuId" :index="submenu1.menuId">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{submenu1.menuName}}</span>
                </el-menu-item>
              </el-submenu>
            </div>
            <div v-else>
              <el-menu-item :index="submenu.menuId">
                <i class="el-icon-menu"></i>
                <span slot="title">{{submenu.menuName}}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
        </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
    <el-dialog
      :title="$t('title.logIn')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseDialog">
      <el-form :model="logInForm" status-icon :rules="rules2" ref="logInForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="userId" :label="$t('column.userId')">
            <el-input v-model="logInForm.userId"></el-input>
          </el-form-item>
          <el-form-item :label="$t('column.passWord')" prop="passWord">
            <el-input type="password" v-model="logInForm.passWord" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('logInForm')">{{$t('system.confirm')}}</el-button>
            <el-button @click="resetForm('logInForm')">{{$t('system.reSet')}}</el-button>
            <el-button @click="cancel()">{{$t('system.cancel')}}</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import CopName from '@/components/EnterPage'
import MainMenu from '@/components/MainMenu'
import Main from '@/components/Main'
import {myaxios} from '@/common/Interceptor'
export default {
  components: { Main, MainMenu, CopName, HelloWorld },
  name: 'Main',
  data () {
    return {
      isCollapse: false,
      active: '001',
      subActive: '001001',
      dialogVisible: false,
      menus: [],
      element: {},
      logInForm: {
        userId: '',
        passWord: ''
      },
      menu: {
        menuId: '',
        menuName: '',
        routeUrl: '',
        menuLevel: '',
        leafNode: '',
        subMenus: []
      },
      selectValue: '',
      rules2: {
        passWord: [
          { required: true, message: this.$t('message.logNotEmptyTip'), trigger: 'blur' }
        ],
        userId: [{required: true, message: this.$t('message.logNotEmptyTip'), trigger: 'blur'}
        ]
      },
      options: [
        {
          value: 'cn',
          label: '中文'
        }, {
          value: 'en',
          label: 'English'
        }
      ]
    }
  },
  mounted () {
    this.selectValue = localStorage.lang === undefined ? 'cn' : localStorage.lang
    this.getmenus()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      this.active = key
      localStorage.menu = key
      this.menu = this.menus.find(item => item.menuId === key)
      if (localStorage.subMenu) {
        this.handleSelectSubMenu(localStorage.subMenu, '')
      }
    },
    handleCloseDialog () {
      this.dialogVisible = false
    },
    handleSelectSubMenu (key, keyPath) {
      this.getMenu(key, this.menus)
      this.subActive = key
      localStorage.subMenu = key
      this.$router.push({path: this.element.routeUrl, query: {}})
    },
    getMenu (key, menus) {
      menus.map(element => {
        if (element.leafNode === '0') {
          this.getMenu(key, element.subMenus)
        } else if (element.menuId === key) {
          this.element = element
        }
      })
    },
    getmenus () {
      var url = '/demo/menu/getmenus'
      var method = 'GET'
      var params = {
        lang: localStorage.lang
      }
      myaxios(url, method, params).then(data1 => {
        console.log(data1)
        this.menus = data1.data.body
        if (localStorage.menu) {
          this.handleSelect(localStorage.menu, '')
        } else {
          this.menu = this.menus[0]
        }
      })
    },
    langChange (e) {
      localStorage.setItem('lang', e)
      this.$i18n.locale = e
      this.getmenus()
    },
    logIn () {
      this.dialogVisible = true
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      this.$message.success(`${this.$t('message.logOutSuccessTip')}`)
      this.menus = []
      this.subMenus = []
    },
    getToken () {
      this.axios({
        method: 'GET',
        url: '/demo/oauth/token',
        params: {
          username: this.logInForm.userId,
          password: this.logInForm.passWord,
          grant_type: 'password',
          client_id: 'demoApp',
          client_secret: 'demoAppSecret'
        }
      }).then((data1) => {
        console.log(data1)
        localStorage.token = data1.data.access_token
        localStorage.refreshToken = data1.data.refresh_token
        this.$message.success(`${this.$t('message.logOnSuccessTip')}`)
        this.getmenus()
      }).catch((error) => {
        this.$message.error(`${this.$t('message.logOnFailTip')}`, error)
      })
    },
    refreshToken () {
      this.axios({
        method: 'GET',
        url: '/demo/oauth/token',
        params: {
          refresh_token: localStorage.refreshToken,
          grant_type: 'refresh_token',
          client_id: 'demoApp',
          client_secret: 'demoAppSecret'
        }
      }).then((data1) => {
        console.log(data1)
        localStorage.token = data1.data.access_token
        localStorage.refreshToken = data1.data.refresh_token
      }).catch((error) => {
        console.log('error:' + error)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getToken()
          this.dialogVisible = false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    cancel () {
      this.dialogVisible = false
    }
  }
}
</script>

<style>

</style>
