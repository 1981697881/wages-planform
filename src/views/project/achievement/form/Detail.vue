<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成方案名称'" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'日期'" prop="companyAddress">
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
          <el-form-item :label="'结算金额字段'" prop="telephone">
            <el-select v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'提成方式'">
            <el-select v-model="form.companyAddress" placeholder="请选择">
            <el-option
              v-for="item in options2"
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
          <el-form-item :label="'固定提成方式'" prop="telephone">
            <el-select v-model="form.companyAddress" placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'固定提成值'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用部门'" prop="telephone">
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
          <el-form-item :label="'适用岗位'" prop="telephone">
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
          <el-form-item :label="'适用项目类型'" prop="telephone">
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
          <el-form-item :label="'适用人员'" prop="telephone">
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
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生效日期'" prop="telephone">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'失效日期'" prop="telephone">
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
        <el-col :span="24">
          <el-form-item :label="'提成设定'">
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

<script>import {addCompany} from '@/api/basic/index'

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
      options1: [{
        value: '收款',
        label: '收款'
      }, {
        value: '实际回款',
        label: '实际回款'
      }],
      options2: [{
        value: '固定',
        label: '固定'
      }, {
        value: '阶梯式',
        label: '阶梯式'
      }],options3: [{
        value: '比例',
        label: '比例'
      }, {
        value: '金额',
        label: '金额'
      }],
      list: [],
      columns: [
        { text: '提成类型/金额段', name: 'gpName' },
        { text: '金额段1', name: 'gpLevel'},
        { text: '金额段2', name: 'gpLevel'},
        { text: '金额段3', name: 'gpLevel'},
      ],
      form: {
        companyName: null,
        companyAddress: null,
        telephone: null,
        officialWebsite: null,
        remark: null,
      },
      disPl: true,
      rules: {
        companyName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], telephone: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        companyAddress: [
          {required: true, message: '请输入', trigger: 'blur'}
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
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addCompany(this.form).then(res => {
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
