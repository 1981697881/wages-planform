<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'" prop="fdept">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod2"
                       :loading="loading" style="width: 100%" multiple v-model="form.fdept" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'业务人员'" prop="fsales">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" multiple v-model="form.fsales" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
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
            <el-input-number style="width: 100%" v-model="form.fcommision"></el-input-number>
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
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'合同结束时间'" prop="fenddate">
            <el-date-picker
              v-model="form.fenddate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'回款银行'">
            <el-input v-model="form.fbank"></el-input>
           <!-- <el-select v-model="form.fbank" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20" >
        <el-col :span="24">
          <el-form-item :label="'回款帐号'">
            <el-input v-model="form.faccout"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'启动日期'" prop="fstartdate">
            <el-date-picker
              v-model="form.fstartdate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'服务老师'" prop="fserice">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%"  v-model="form.fserice" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'分成信息'">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button @click="setRow">增加</el-button>
              <el-button @click="delRow">删除</el-button>
            </div>
            <el-table :data="form.supplierDivList" border height="250px" ref="multipleTable"
            stripe size="mini" :highlight-current-row="true">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
            ></el-table-column>
          </el-table>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="编辑"
      v-if="visible"
      :width="'20%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" :model="postform" :size="'mini'" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'项目类型'">
              <el-input v-model="postform.ftype"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'分成比例'">
              <el-input v-model="postform.fdivrate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="confirmData('postform')">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addSupplier,getOrganizationsList,getTuserList} from '@/api/basic/index'

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
      options: [],
      loading: false,
      form: {
        fdept: null,
        fsales: null,
        fname: null,
        fcommision: 0,
        fcommdiv: null,
        faccout: null,
        fstartdate: null,
        fenddate: null,
        fbank: null,
        fserice: null,
        supplierDivList: []
      },
      postform: {
        ftype: null,
        fdivrate: null,
      },
      visible: null,
      list: [],
      usersList: [],
      columns: [
        { text: '项目类型', name: 'ftype' },
        { text: '分成比例', name: 'fdivrate'},
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
    this.fetchData()
    this.fetchUserData()
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.fsales = this.form.fsales.split(",");
      this.form.fdept = this.form.fdept.split(",");
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchUserData({fname: query});
      } else {
        this.usersList = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchData({fdeptname: query});
      } else {
        this.options = [];
      }
    },
    setRow() {
      this.postform = {
        ftype: null,
        fdivrate: null,
      }
      this.visible = true
    },
    delRow() {
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          this.form.supplierDivList.splice(item)
        })
      }else{
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    confirmData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const postForm = {...this.postform}
          if(this.form.supplierDivList.findIndex(item =>item.ftype == postForm.ftype) == -1){
            this.form.supplierDivList.push(postForm)
            this.visible = false
          }else{
            this.$message({
              message: "已存在相同项",
              type: 'error'
            });
          }
        }
      })
    },
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize:  10
    }) {
      getOrganizationsList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.options = res.data.records
        }
      });
    },
    fetchUserData(val={}, data = {
      pageNum: 1,
      pageSize:  10
    }) {
      getTuserList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.usersList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.form.fsales = this.form.fsales.join(",");
          this.form.fdept = this.form.fdept.join(",");
          addSupplier(this.form).then(res => {
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
                                                                                               
