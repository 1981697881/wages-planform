<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门名称'" prop="fdeptname">
            <el-input v-model="form.fdeptname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上级部门'">
            <el-select  filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading" style="width: 100%" v-model="form.fparentname" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门负责人'" prop="fheader">
            <el-select  filterable
                        remote
                        :remote-method="remoteMethod2"
                        :loading="loading" style="width: 100%" v-model="form.fheader" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'是否部门提成'">
            <el-radio-group style="width: 100%" v-model="form.fisno">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'参与提成收款类型'">
            <el-radio-group style="width: 100%" v-model="form.fgettype">
              <el-radio :label="'全款'">全款</el-radio>
              <el-radio :label="'活动'">活动</el-radio>
              <el-radio :label="'抵扣'">抵扣</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addOrganizations,getOrganizationsList,getTuserList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      form: {
        fdeptname: null,
        fparentname: null,
        fheader: null,
        fisno: 0,
        fgettype: '全款',
      },
      options: [],
      usersList: [],
      disPl: true,
      rules: {
        fdeptname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        fheader: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
    this.fetchUserData()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchUserData({fname: query});
      } else {
        this.usersList = [];
      }
    },remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchData({fdeptname: query});
      } else {
        this.options = [];
      }
    },
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize:  10
    }) {
      getOrganizationsList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.options = res.data.records
        }
      });
    },
    fetchUserData(val={}, data = {
      pageNum: 1,
      pageSize:  10
    }) {
      getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.usersList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addOrganizations(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style>
</style>
