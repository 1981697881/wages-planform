<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'" prop="fdeptid">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" v-model="form.fdeptid" placeholder="请选择">
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
          <el-form-item :label="'方案名称'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'方案内容'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'方案号'">
            <el-input v-model="form.fnumber"></el-input>
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
          <el-form-item :label="'返款比例'">
            <el-input v-model="form.frewardrate"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
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
          <el-form-item :label="'开始日期'">
            <el-date-picker
              v-model="form.fstartdate"
              type="date"
              style="width: 100%"
              value-format="yyyy"
              placeholder="选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'结束日期'">
            <el-date-picker
              v-model="form.fenddate"
              type="date"
              style="width: 100%"
              value-format="MM"
              placeholder="选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addSalePrj} from '@/api/information/index'
import {getOrganizationsList} from '@/api/basic/index'

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
      organizationsList: [],
      form: {
        famount: null,
        fdeptid: null,
        fdesc: null,
        fenddate: null,
        fname: null,
        fnumber: null,
        frewardrate: null,
        fsalerreward: null,
        fshopreward: null,
        fstartdate: null,
      },
      disPl: true,
      rules: {
        fempid: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.getOrganizationsArray()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        this.getOrganizationsArray({fdeptname: query});
      } else {
        this.organizationsList = [];
      }
    },
    getOrganizationsArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if(res.flag){
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addSalePrj(this.form).then(res => {
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
</s
