<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'档案号'" prop="fnumber">
            <el-input v-model="form.fnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'顾客姓名'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'出生日期'">
            <el-date-picker
              v-model="form.fbirthdate"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'身份证号'">
            <el-input v-model="form.fidno"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'年龄'">
            <el-input v-model="form.fage"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-radio-group v-model="form.fsex">
              <el-radio :label="'男'">男</el-radio>
              <el-radio :label="'女'">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'负责老师'">
            <el-select  style="width: 100%" v-model="form.fdesigner" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.username"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'业务员'">
            <el-select style="width: 100%" v-model="form.fmanager" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.username"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'备注'">
            <el-input v-model="form.fnote"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'店家员工'">
            <el-radio-group v-model="form.finternal">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'打版金额'">
            <el-input-number v-model="form.fpatternamt"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'抵扣打版金额'">
            <el-input-number v-model="form.fusepatternamt"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'未抵扣金额'">
            <el-input-number v-model="form.funpatteramt"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'调整日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'修改记录'">
            <el-table :data="list" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
            stripe size="mini" :highlight-current-row="true">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              :width="t.width?t.width:(selfAdaption?'':'120px')"
              v-if="t.default!=undefined?t.default:true"
            ></el-table-column>
          </el-table>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addCustom, getUsersList} from '@/api/basic/index'

export default {
  props: {
    //是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    },
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
      form: {
        fnumber: null,
        fname: null,
        fbirthdate: null,
        fidno: null,
        fage: null,
        fsex: '男',
        fdesigner: null,
        fmanager: null,
        fnote: null,
        finternal: 0,
        fpatternamt: null,
        fusepatternamt: null,
        funpatteramt: null
      },
      usersList: [],
      list: [],
      columns: [
        { text: '修改人', name: 'fmanager' },
        { text: '修改时间', name: 'falterdate'},
      ],
      disPl: true,
      rules: {
        fnumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.fetchUserData()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    fetchUserData(val={}, data = {
      pageNum: 1,
      pageSize:  500
    }) {
      getUsersList(data, val).then(res => {
        this.usersList = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addCustom(this.form).then(res => {
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
