<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品类型'" prop="ftype">
            <el-input v-model="form.ftype"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上级类型'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%"  v-model="form.fparentid" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.ftype"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProductionType,getProductionTypeList} from '@/api/basic/index'

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
        ftype: null,
        fparentid: null,
      },
      disPl: true,
      options: [],
      rules: {
        ftype: [
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
        this.fetchData({ftype: query});
      } else {
        this.options = [];
      }
    },
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize:  10
    }) {
      getProductionTypeList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.options = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addProductionType(this.form).then(res => {
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
