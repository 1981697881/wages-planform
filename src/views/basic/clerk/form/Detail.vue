<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工号'" prop="fnumber">
            <el-input v-model="form.fnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户名称'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-radio-group style="width: 100%" v-model="form.fgender">
              <el-radio :label="'男'">男</el-radio>
              <el-radio :label="'女'">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.fphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'邮箱'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'带教老师'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" v-model="form.fteacher" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'是否合作商'">
            <el-radio-group style="width: 100%" v-model="form.officialWebsite">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'基础合作费'">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'职位'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod2"
                       :loading="loading" style="width: 100%" v-model="form.fduty" placeholder="请选择">
              <el-option
                v-for="item in dutyList"
                :key="item.fid"
                :label="item.fdutyname"
                :value="item.fdutyname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'部门'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod3"
                       :loading="loading" style="width: 100%" v-model="form.fdept" placeholder="请选择">
              <el-option
                v-for="item in organizationsList"
                :key="item.fid"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上级领导'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" v-model="form.fheader" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下级职员'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'入职日期'">
            <el-date-picker
              v-model="form.fjoindate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'转正日期'">
            <el-date-picker
              v-model="form.fregulardate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'离职日期'">
            <el-date-picker
              v-model="form.fdeparturedate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'是否固定工资'">
            <el-radio-group style="width: 100%" v-model="form.officialWebsite">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'工资总额'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'绩效工资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'加班薪资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'竞业薪资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'管理薪资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'各类补贴'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'转正工资'">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'工资总额'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'绩效工资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'加班薪资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'竞业薪资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'管理薪资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'各类补贴'">
            <el-input-number style="width: 100%" :min="0" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTuser, getTuserList, getDutyList, getOrganizationsList} from '@/api/basic/index'

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
        fnumber: null,
        fname: null,
        fgender: '男',
        fphone: null,
        address: null,
        fduty: null,
        fdept: null,
        fteacher: null,
        fheader: null,
        companyAddress: null,
        fjoindate: null,
        fregulardate: null,
        fdeparturedate: null
      },
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
      disPl: true,
      visible: null,
      username: '',
      userList: [],
      dutyList: [],
      organizationsList: [],
      rules: {
        jobNum: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ],
        storeId: [
          {required: true, message: '请输入选择', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入名稱', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.getUsersArray()
    this.getDutyArray()
    this.getOrganizationsArray()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    query() {
      this.visible = true
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fname: query});
      } else {
        this.usersList = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getDutyArray({fdutyname: query});
      } else {
        this.dutyList = [];
      }
    },
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        this.getOrganizationsArray({fdeptname: query});
      } else {
        this.organizationsList = [];
      }
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addTuser(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },
    getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    getDutyArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDutyList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.dutyList = res.data.records
        }
      });
    },
    getOrganizationsArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
    }
  }
}
</script>

<style>
</style>
