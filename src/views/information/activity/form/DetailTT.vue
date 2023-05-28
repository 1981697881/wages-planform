<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'" prop="fdeptid">
            <el-select style="width: 100%" v-model="form.fdeptid" placeholder="请选择">
              <el-option
                v-for="item in organizationsList"
                :key="item.fid"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'销售人员'" prop="fsalerid">
            <el-select style="width: 100%" v-model="form.fsalerid" placeholder="请选择">
              <el-option
                v-for="(item,index) in userList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'卡项金额'">
            <el-input v-model="form.famount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'方案'" prop="fsalerid">
            <el-select style="width: 100%" v-model="form.fprjid" placeholder="请选择">
              <el-option
                v-for="(item,index) in salePrjList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'销售人员奖励'">
            <el-input v-model="form.fsalerreward"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'门店奖励'">
            <el-input v-model="form.fshopreward"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'销售日期'">
            <el-date-picker
              v-model="form.fsaledate"
              type="date"
              style="width: 100%"
              value-format="yyyy"
              placeholder="选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'门店'">
            <el-select style="width: 100%" v-model="form.fsupplyid" placeholder="请选择">
              <el-option
                v-for="item in supplierList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'数量'">
            <el-input v-model="form.fqty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'剩余数量'">
            <el-input v-model="form.fremainqtu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addSalePrjList,getSalePrjList} from '@/api/information/index'
import {getOrganizationsList, getTuserList,getSupplierList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      userList: [],
      salePrjList: [],
      organizationsList: [],
      supplierList: [],
      form: {
        famount: null,
        fdeptid: null,
        fprjid: null,
        fqty: null,
        fremainqtu: null,
        fsaledate: null,
        fsalerid: null,
        fsupplyid: null,
      },
      disPl: true,
      rules: {
        fempid: [
          {required: true, message: '请选择', trigger: 'change'}
        ],fsalerid: [
          {required: true, message: '请选择', trigger: 'change'}
        ],fprjid: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.getUsersArray();
    this.getSalePrjArray();
    this.getOrganizationsArray()
    this.getSupplier()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    getOrganizationsArray(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getOrganizationsList(data, val).then(res => {
        this.organizationsList = res.data.records
      });
    },getSupplier(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getSupplierList(data, val).then(res => {
        this.supplierList = res.data.records
      });
    }, getSalePrjArray(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getSalePrjList(data, val).then(res => {
        this.salePrjList = res.data.records
      });
    },
    getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getTuserList(data, val).then(res => {
        this.userList = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addSalePrjList(this.form).then(res => {
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
