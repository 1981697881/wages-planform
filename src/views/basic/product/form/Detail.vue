<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品编号'" prop="fnumber">
            <el-input v-model="form.fnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品名称'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品分类'" prop="ftype">
            <el-select style="width: 100%" v-model="form.ftype" placeholder="请选择">
              <el-option
                v-for="(item,index) in typeOptions"
                :key="index"
                :label="item.ftype"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品品牌'">
            <el-input v-model="form.fbrand"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'成交项目编码'" >
            <el-select style="width: 100%" v-model="form.fprjectno" placeholder="请选择">
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
          <el-form-item :label="'产品单位'">
            <el-input v-model="form.funit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'单次价格'">
            <el-input-number style="width: 100%" v-model="form.fprice"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'数量'">
            <el-input-number style="width: 100%" v-model="form.fqt"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'疗程价格'">
            <el-input-number style="width: 100%" v-model="form.fperiodprice"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'市场参考价'">
            <el-input-number style="width: 100%" v-model="form.fsaleprice"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目类型'">
            <el-select style="width: 100%" v-model="form.fprojecttype" placeholder="请选择">
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
          <el-form-item :label="'采购成本'">
            <el-input-number style="width: 100%" v-model="form.fpurcost"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'备注'">
            <el-input v-model="form.fnote"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'提成分类'">
            <el-input v-model="form.fdeducttype"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'活动/赠送操作费(次)'">
            <el-input-number style="width: 100%" v-model="form.ffiveaway"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProduction,getProductionTypeList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: [{
        value: '无创',
        label: '无创'
      }, {
        value: '美外',
        label: '美外'
      }, {
        value: '抗衰',
        label: '抗衰'
      }, {
        value: '大健康',
        label: '大健康'
      }],
      typeOptions: [],
      form: {
        fnumber: null,
        fname: null,
        ftype: null,
        fbrand: null,
        remark: null,
        fprjectno: null,
        funit: null,
        fprice: null,
        fqt: null,
        fperiodprice: null,
        fsaleprice: null,
        fprojecttype: null,
        fpurcost: null,
        fnote: null,
        fdeducttype: null,
        ffiveaway: null
      },
      disPl: true,
      rules: {
        fnumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        ftype: [
          {required: true, message: '请选择', trigger: 'change'}
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
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize:  500
    }) {
      getProductionTypeList(data, val).then(res => {
        this.typeOptions = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addProduction(this.form).then(res => {
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
