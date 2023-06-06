<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成方案名称'" prop="fschemename">
            <el-input v-model="form.fschemename"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'日期'" prop="fdate">
            <el-date-picker
              v-model="form.fdate"
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
          <el-form-item :label="'启动有效期(月)'">
            <el-date-picker
              v-model="form.fstartexpiringdate"
              type="month"
              value-format="MM"
              style="width: 100%"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产出有效期(月)'">
            <el-date-picker
              v-model="form.foutputexpiringdate"
              type="month"
              style="width: 100%"
              value-format="MM"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产出不足(每家)扣款'">
            <el-input v-model="form.fdeduction"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用部门'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod3"
                       :loading="loading" style="width: 100%" multiple v-model="form.fapplicabledepartment" placeholder="请选择">
              <el-option
                v-for="item in organizationsList"
                :key="item.fid"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'适用岗位'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod2"
                       :loading="loading" style="width: 100%" multiple v-model="form.fapplicableposition" placeholder="请选择">
              <el-option
                v-for="item in dutyList"
                :key="item.fid"
                :label="item.fdutyname"
                :value="item.fdutyname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用项目类型'">
            <el-select style="width: 100%" multiple v-model="form.fapplicableprojecttypes" placeholder="请选择">
              <el-option
                v-for="item in productionTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'适用人员'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" multiple v-model="form.fsuitpeople" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="'生效日期'">
          <el-date-picker
            v-model="form.feffectivedate"
            type="date"
            format="yyyy-MM-dd"
            style="width: 100%"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="'失效日期'">
          <el-date-picker
            v-model="form.fexpiringdate"
            type="date"
            format="yyyy-MM-dd"
            style="width: 100%"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'分(次)值设定'">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button @click="setRow">增加</el-button>
              <el-button @click="delRow">删除</el-button>
            </div>
            <el-table class="tableBox" ref="multipleTable" border height="250px"
                      stripe size="mini" :highlight-current-row="true" :data="form.tProjectCommissionDetails" align="center" :cell-style="myclass" highlight-current-row>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
              >
                <template slot-scope="scope">
                  <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                  <el-input v-if="!t.sfkgg" v-model="scope.row[i]" clearable />
                  <span>{{scope.row[i]}}</span>
                </template>
              </el-table-column>
            </el-table>
           <!-- <el-table :data="form.tProjectCommissionDetails" border height="250px" ref="multipleTable"
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
          </el-table>-->
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
            <el-form-item :label="'项目编码'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'项目名称'" prop="name">
              <el-input v-model="postform.name"></el-input>
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

<script>import {getTuserList,getDutyList,getOrganizationsList,getProductionTypeList} from '@/api/basic/index'
import {addProjectCommission} from '@/api/poject/index'
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
      loading: false,
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
      list: [],
      columns: [
        { text: '启动家数/产出家数', name: 'gpName',sfkgg: false, sfcb: true,},

      ],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      visible: null,
      form: {
        fschemename: null,
        fdate: null,
        fstartexpiringdate: null,
        foutputexpiringdate: null,
        fdeduction: null,
        fsuitpeople: null,
        fapplicabledepartment: null,
        fapplicableposition: null,
        fapplicableprojecttypes: null,
        feffectivedate: null,
        fexpiringdate: null,
        tProjectCommissionDetails: [],
      },
      disPl: true,
      userList: [],
      dutyList: [],
      organizationsList: [],
      productionTypeList: [{
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
      rules: {
        fschemename: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fdate: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.getUsersArray()
    this.getDutyArray()
    this.getOrganizationsArray()
    //this.getProductionTypeArray()
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.fsuitpeople = this.form.fsuitpeople.split(",");
      this.form.fapplicabledepartment = this.form.fapplicabledepartment.split(",");
      this.form.fapplicableposition = this.form.fapplicableposition.split(",");
      this.form.fapplicableprojecttypes = this.form.fapplicableprojecttypes.split(",");
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fname: query});
      } else {
        this.userList = [];
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
    myclass({ row, columnIndex }) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null ) {
        return "color: red";
      }
    },
    // 提交操作
    present() {
      let result = [];
      // 通过双层循环拿到所需字段
      this.form.tProjectCommissionDetails.forEach((item) => {
        let data = {};
        item.forEach((e) => {
          // 将字段名、字段值以键值对的形式赋值
          data[e.zdm] = e.value;
        });
        // 每一行数据为一个对象添加到数组中 [{},{},{},...]
        result.push(data);
      });
      console.log(result, "参数");
      // 执行接口操作
    },
    setRow() {
      if(this.form.fstartexpiringdate != null && this.form.foutputexpiringdate!=null){
        if(this.form.foutputexpiringdate >= this.form.fstartexpiringdate){
          var obj ={}
          for(var i = this.form.fstartexpiringdate;i<=this.form.foutputexpiringdate;i++){
            this.columns.push({ text: i, name: 'gpLevel'+i,sfkgg: false, sfcb: true})
            obj['gpLevel'+i] = ""
          }
          var itemObj = Object.assign({
            gpName: this.form.tProjectCommissionDetails.length+1,
            sfkgg: true,
            sfcb: null,
          }, obj)
          console.log(itemObj)
          this.form.tProjectCommissionDetails.push(itemObj)
        }
      }else{
        this.$message({
          message: "请选择日期（月）",
          type: 'error'
        });
      }

     // this.visible = true
    },
    delRow() {
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          this.list.splice(item)
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
          if(this.list.findIndex(item =>item.name == postForm.name) == -1){
            this.list.push(postForm)
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
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form}
          params.fsuitpeople = params.fsuitpeople.join(',')
          params.fapplicabledepartment = params.fapplicabledepartment.join(',')
          params.fapplicableposition = params.fapplicableposition.join(',')
          params.fapplicableprojecttypes = params.fapplicableprojecttypes.join(',')
          addProjectCommission(params).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },getUsersArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },getProductionTypeArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getProductionTypeList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.productionTypeList = res.data.records
        }
      });
    },
    getDutyArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDutyList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.dutyList = res.data.records
        }
      });
    },
    getOrganizationsArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
    }
  }
}
</script>

<style scoped>
  .tableBox {
    margin-bottom: 20px;
  }
  /* 通过显隐控制input框的状态 */
  .tableBox .el-input {
    display: none;
  }
  .tableBox .current-row .el-input {
    display: block;
  }
  .tableBox .current-row .el-input + span {
    display: none;
  }
</style>
                                                                                                 
