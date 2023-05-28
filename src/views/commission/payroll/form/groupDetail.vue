<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'方案名称'" prop="fprogrammename">
            <el-input v-model="form.fprogrammename"></el-input>
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
                :width="'120px'"
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
  import {addProgramme} from "@/api/commodity/index";

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
          fprogrammename: null, // 名称
          fprogrammefield: null, // 名称
        },
        pidS: [],
        pArray: [],
        list: [
          {text: '底薪', name: "gbName1"},
          {text: '业绩提成', name: "gbName2"},
          {text: '部门提成', name: "gbName3"},
          {text: '带教提成', name: "gbName4"},
          {text: '打板提成', name: "gbName5"},
          {text: '操作提成', name: "gbName6"},
          {text: '计分(次)提成', name: "gbName7"},
          {text: '提成小计', name: "gbName8"},
          {text: '预留风险金', name: "gbName9"},
          {text: '发放风险金', name: "gbName10"},
          {text: '上期发放差额', name: "gbName11"},
          {text: '上期提成差额', name: "gbName12"},
          {text: '应发提成', name: "gbName13"},
          {text: '实发提成', name: "gbName14"}],
        multipleSelection: [],
        columns: [
          {text: '字段名称', name: 'text'},
        ],
        rules: {
          fprogrammename: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
      };
    },
    created() {
      if (this.gpInfo) {
        this.form = this.gpInfo
        this.multipleSelection = JSON.parse(this.form.fprogrammefield)
      }
    },
    mounted() {

    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            this.form.fprogrammefield = JSON.stringify(this.multipleSelection)
            addProgramme(this.form).then(res => {
              this.$emit('hideGroupDialog', false)
              this.$emit('uploadGroup')
            });
          } else {
            return false;
          }
        })

      },
    }
  };
</script>

<style>
</style>
