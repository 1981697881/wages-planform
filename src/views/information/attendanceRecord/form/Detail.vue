<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'员工'" prop="fempid">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" v-model="form.fempid" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出勤率'">
            <el-input v-model="form.fattendrate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'年'">
            <el-date-picker
              v-model="form.fyear"
              type="year"
              style="width: 100%"
              value-format="yyyy"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'月'">
            <el-date-picker
              v-model="form.fmonth"
              type="month"
              style="width: 100%"
              value-format="MM"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'实际出勤天数'">
            <el-input v-model="form.factdays"></el-input>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'应出勤天数'">
            <el-input v-model="form.freqdays"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addAttendList} from '@/api/information/index'
import {getTuserList} from '@/api/basic/index'
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
      form: {
        factdays: null,
        fattendrate: null,
        fempid: null,
        fmonth: null,
        freqdays: null,
        fyear: null,
      },
      disPl: true,
      loading: false,
      rules: {
        fempid: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.getUsersArray();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fname: query});
      } else {
        this.usersList = [];
      }
    },
    getUsersArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addAttendList(this.form).then(res => {
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
