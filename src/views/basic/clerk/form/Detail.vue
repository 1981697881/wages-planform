<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工号'" prop="jobNum">
            <el-input v-model="form.jobNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.tel"></el-input>
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
          <el-form-item :label="'是否合作商'">
            <el-radio-group v-model="form.officialWebsite">
              <el-radio :label="3">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基础合作费'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'职位'">
            <el-select v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'部门'">
            <el-select v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'带教老师'">
            <el-select v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上级领导'">
            <el-select v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'下级职员'">
            <el-select v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'入职日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'转正日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'是否固定工资'">
            <el-radio-group v-model="form.officialWebsite">
              <el-radio :label="3">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'离职日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
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
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'绩效工资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'加班薪资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'竞业薪资'">
            <el-input-nmber v-model="form.address"></el-input-nmber>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'管理薪资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'各类补贴'">
            <el-input-nmber v-model="form.address"></el-input-nmber>
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
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'绩效工资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'加班薪资'">
            <el-input-number v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'竞业薪资'">
            <el-input-nmber v-model="form.address"></el-input-nmber>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="'管理薪资'">
          <el-input-number v-model="form.address"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="'各类补贴'">
          <el-input-nmber v-model="form.address"></el-input-nmber>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="微信用户"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" label-width="80px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder="名称">
                <el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import { addClerk, alterClerk, clerkInfo } from '@/api/basic/index'

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
        eid: null,
        jobNum: null,
        address: null,
        tel: null,
        uid: null,
        disable: true,
        username: null,
        remark: null,
        name: null// 名称
      },
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
      list: [],
      columns: [
        { text: '会员名称', name: 'username' },
        { text: '微信号', name: 'wechatId' },
        { text: '联系地址', name: 'adress' },
        { text: '联系电话', name: 'phoneNumber' },
        { text: '注册时间', name: 'createDatetime' },
        { text: '最后登录时间', name: 'editDatetime' },
        { text: '生日', name: 'birthday' },
        { text: '性别', name: 'sex' },
        { text: '描述', name: 'describes' }
      ],
      disPl: true,
      visible: null,
      username: '',
      pidS: [],
      levelFormat: [{ name: '管理员', value: '0' }, { name: '生产企业', value: '1' }, { name: '打码平台', value: '2' }, { name: '销售员', value: '3' }],
      rules: {
        jobNum: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        storeId: [
          { required: true, message: '请输入选择', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名稱', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    query() {
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          } else {
            addClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          }
        } else {
          return false
        }
      })
    },
    dblclick(obj) {
      this.visible = false
      this.form.wechatName = obj.username
      this.form.uid = obj.uid
    },
    fetchData(val) {
      clerkInfo(val).then(res => {
        this.form = res.data
      })
    }
  }
}
</script>

<style>
</style>
