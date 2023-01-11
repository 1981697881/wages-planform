<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'方案名称'" prop="gpName">
            <el-input v-model="form.gpName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'招商部人员'" prop="gpName">
            <el-input v-model="form.gpName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="''">
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

<script>
  import {groupAdd, groupAlter} from "@/api/system/index";
  export default {
    props: {
      gpInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          gpId: null,
          gpName: null, // 名称
          gpLevel: -1,
        },
        pidS:[],
        pArray:[],
        list: [
          {gbName: '底薪'},
          {gbName: '业绩提成'},
          {gbName: '部门提成'},
          {gbName: '带教提成'},
          {gbName: '打板提成'},
          {gbName: '操作提成'},
          {gbName: '计分(次)提成'},
          {gbName: '提成小计'},
          {gbName: '预留风险金'},
          {gbName: '发放风险金'},
          {gbName: '上期发放差额'},
          {gbName: '上期提成差额'},
          {gbName: '应发提成'},
          {gbName: '实发提成'},
        ],
        columns: [
          { text: '字段名称', name: 'gpName' },
          { text: '选择', name: 'gpLevel'},
        ],
        rules: {
          gpName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          gpLevel: [
            {required: true, message: '请选择等级', trigger: 'change'},
          ],

        },
        levelFormat: [[1,'一级'],[2,'二级']]
      };
    },
    created() {
      if(this.gpInfo){
        this.form = this.gpInfo
      }
    },
    mounted() {

    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            if (typeof (this.form.gpId) != undefined && this.form.gpId != null) {
              groupAlter(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            } else {
              groupAdd(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            }
          }else {
            return false;
          }
        })

      },
    }
  };
</script>

<style>
</style>
