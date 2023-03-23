<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'咨询老师'" prop="fteacherid">
            <el-select v-model="form.fteacherid" placeholder="请选择">
              <el-option
                v-for="(item,index) in userList"
                :key="index"
                :label="item.username"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'日期'" prop="fdate">
            <el-date-picker
              v-model="form.fdate"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'成交业绩'" >
            <el-input-number v-model="form.fperformanceamt"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'沙龙场数'">
            <el-input-number v-model="form.fsalons"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'沙龙费用'" >
            <el-input-number v-model="form.fsalonamt"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出勤天数'">
            <el-input-number v-model="form.fattenddays"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属公司'" >
            <el-input v-model="form.fcompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'退款业绩'">
            <el-input-number v-model="form.fretamount"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addCooperationExp} from '@/api/information/index'
import {getUsersList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        fsalons: 0,
        fsalonamt: 0,
        fperformanceamt: 0,
        fdate: null,
        fteacherid: null,
        fcompany: null,
        fattenddays: 0,
        fretamount: 0,
      },
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
      userList: [],
      disPl: true,
      rules: {
        fteacherid: [
          {required: true, message: '请选择', trigger: 'change'}
        ],fdate: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.getUsersArray()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    getUsersArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getUsersList(data, val).then(res => {
        this.userList = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addCooperationExp(this.form).then(res => {
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
