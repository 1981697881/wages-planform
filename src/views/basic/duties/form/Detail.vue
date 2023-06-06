<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'职务名称'" prop="fdutyname">
            <el-input v-model="form.fdutyname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上级职务'">
            <el-select filterable
                         remote
                         :remote-method="remoteMethod"
                         :loading="loading" style="width: 100%" v-model="form.fparentname" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.fdutyname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'是否提成'">
            <el-radio-group style="width: 100%" v-model="form.fiscomm">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
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

<script>import {addDuty,getDutyList} from '@/api/basic/index'

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
        fdutyname: null,
        fparentname: null,
        fiscomm: 0,
      },
      options: [],
      disPl: true,
      rules: {
        fdutyname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchData({fdutyname: query});
      } else {
        this.options = [];
      }
    },
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDutyList(data, val).then(res => {
        if(res.flag){
          this.loading = false;
          this.options = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addDuty(this.form).then(res => {
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
