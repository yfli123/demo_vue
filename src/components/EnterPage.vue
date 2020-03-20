<template>
  <div class="CopClass">
    <!-- <h1>{{msg}}</h1>
    <h2> Element UI Button </h2>
    <el-button>默认按钮</el-button>
    <el-button type="primary" @click="login">Show Channels</el-button>
    <el-button type="text">文字按钮</el-button> -->
    <el-input v-model="searchVal" :placeholder="$t('system.operate')" @input="search(searchVal)"></el-input>
    <el-button type="primary" @click="newUser">{{$t('system.new')}}</el-button>
    <el-table :data="user_data" border highlight-current-row @current-change="handleSelectRow" stripe justify="center" style="width: 100%">
      <el-table-column prop="userId" sortable :label="$t('column.userId')"></el-table-column>
      <el-table-column prop="userName" :filter-method="filterHandler" :label="$t('column.userName')"></el-table-column>
      <el-table-column prop="phoneNo" :label="$t('column.phoneNo')"></el-table-column>
      <el-table-column prop="email" :label="$t('column.email')"></el-table-column>
      <!-- <el-table-column prop="inputTime" :label="$t('column.inputTime')"></el-table-column>
      <el-table-column prop="updateTime" :label="$t('column.updateTime')"></el-table-column> -->
      <el-table-column
        fixed="right"
        :label="$t('system.operate')"
        width="150">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text" size="small">{{$t('system.view')}}</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">{{$t('system.edit')}}</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">{{$t('system.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      ref="user"
      :title="$t('title.newUser')"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <userinfo ref="user"></userinfo>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">{{$t('system.cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('system.confirm')}}</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      :page-count="pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
import userinfo from './UserForm'
import {myaxios} from '@/common/Interceptor'
export default {
  name: 'CopName',
  components: { userinfo },
  data () {
    return {
      dialogVisible: false,
      searchVal: '',
      msg: 'Welcome to Vue App Webpage',
      checked: true,
      currentPage: 1, /* 初始页 */
      pagesize: 5, /*     每页的数据 */
      user_data: [],
      tableData: [],
      total: 0,
      pages: 2
    }
  },
  methods: {
    fetch: function () {
      var url = '/demo/user/getpageusers'
      var method = 'GET'
      var params = {
        currentPage: this.currentPage,
        pageSize: this.pagesize
      }
      myaxios(url, method, params).then(data1 => {
        this.user_data = data1.data.body.records
        this.tableData = data1.data.body.records
        this.total = data1.data.body.total
      })
    },
    newUser: function () {
      this.dialogVisible = true
    },
    edit: function (row) {
      this.dialogVisible = true
      var url = '/demo/user/getuser'
      var method = 'GET'
      var params = {
        userId: row.userId
      }
      myaxios(url, method, params).then(data1 => {
        this.$refs['user'].userForm = data1.data.body
      })
    },
    view: function (row) {
      this.dialogVisible = true
      var url = '/demo/user/getuser'
      var method = 'GET'
      var params = {
        userId: row.userId
      }
      myaxios(url, method, params).then(data1 => {
        this.$refs['user'].userForm = data1.data.body
      })
    },
    del: function (row) {
      this.$confirm('确认删除？')
        .then(_ => {
          var url = '/demo/user/deluser'
          var method = 'DELETE'
          var params = {
            userId: row.userId
          }
          myaxios(url, method, params).then(data1 => {
            this.fetch()
          })
        }).catch(_ => {
          console.log(row)
        })
    },
    handleClose: function () {
      this.dialogVisible = false
    },
    cancel: function () {
      this.dialogVisible = false
    },
    confirm: function () {
      this.$refs['user'].submitForm('userForm')
      this.dialogVisible = false
    },
    /* // 初始页currentPage、初始每页数据数pagesize和数据data */
    handleSizeChange: function (size) {
      this.pagesize = size
      this.fetch()
      console.log(this.pagesize) /* //每页下拉显示数据 */
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.fetch()
      console.log(this.currentPage) /* //点击第几页 */
    },
    filterHandler (value, row, column) {
      const property = column['userName']
      return row[property] === value
    },
    handleSelectRow (val) {
      this.currentRow = val
    },
    search (searchVal) {
      const _this = this
      _this.user_data = []
      _this.user_data = _this.tableData.filter(Val => {
        if (Val.userId.includes(_this.searchVal) || Val.userName.includes(_this.searchVal)) {
          _this.user_data.push(Val)
          return _this.user_data
        }
      })
    }
  },
  created () {
    console.log('created Event  --> Goto fetch()')
    this.fetch()
  }
}
</script>
