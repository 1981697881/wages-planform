<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'" prop="fdept">
            <el-select multiple v-model="form.fdept" placeholder="请选择">
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
          <el-form-item :label="'业务人员'" prop="fsales">
            <el-select multiple v-model="form.fsales" placeholder="请选择">
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
          <el-form-item :label="'供应商名称'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'介绍费'">
            <el-input-number v-model="form.fcommision"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'介绍费分成'">
            <el-input v-model="form.fcommdiv"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'合同起始时间'" prop="fstartdate">
            <el-date-picker
              v-model="form.fstartdate"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20" prop="fenddate">
        <el-col :span="12">
          <el-form-item :label="'合同结束时间'">
            <el-date-picker
              v-model="form.fenddate"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'回款银行'">
            <el-select v-model="form.fbank" placeholder="请选择">
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
          <el-form-item :label="'启动日期'" prop="fstartdate">
            <el-date-picker
              v-model="form.fstartdate"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'服务老师'" prop="fserice">
            <el-select v-model="form.fserice" placeholder="请选择">
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
        <el-col :span="24">
          <el-form-item :label="'分成信息'">
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

<script>import {deleteSupplier} from '@/api/basic/index'

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
        fdept: null,
        fsales: null,
        fname: null,
        fcommision: 0,
        fcommdiv: null,
        fstartdate: null,
        fenddate: null,
        fbank: null,
        fserice: null
      },
      list: [],
      columns: [
        { text: '修改人', name: 'gpName' },
        { text: '修改时间', name: 'gpLevel'},
      ],
      disPl: true,
      rules: {
        fdept: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fsales: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fstartdate: [
          {required: true, message: '请选择', trigger: 'change'}
        ],fenddate: [
          {required: true, message: '请选择', trigger: 'change'}
        ],fbank: [
          {required: true, message: '请选择', trigger: 'change'}
        ],fserice: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fname: [
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
          deleteSupplier(this.form).then(res => {
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
