<template>
  <div>
    <el-tabs v-model="activeName" >
    <el-tab-pane label="项目信息" name="first">
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'开单时间'" prop="companyName">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'设计单号'" prop="companyAddress">
            <el-input v-model="form.companyAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'科室'" prop="companyAddress">
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
        <el-col :span="8">
          <el-form-item :label="'顾客姓名'" prop="companyName">
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
        <el-col :span="8">
          <el-form-item :label="'年龄'" prop="companyAddress">
            <el-input v-model="form.companyAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'性别'" prop="companyAddress">
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
        <el-col :span="8">
          <el-form-item :label="'设计师(咨询)'" prop="companyName">
            <el-select multiple v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'服务老师'" prop="companyName">
            <el-select multiple v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'业务员'" prop="companyAddress">
            <el-select multiple v-model="form.companyAddress" placeholder="请选择">
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
        <el-col :span="8">
          <el-form-item :label="'业务部门'" prop="companyName">
            <el-select multiple v-model="form.companyAddress" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'店家'" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'项目类型'" prop="companyAddress">
            <el-select multiple v-model="form.companyAddress" placeholder="请选择">
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
        <el-col :span="8">
          <el-form-item :label="'是否PV'" prop="companyName">
              <el-radio-group v-model="form.officialWebsite">
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'活动'" prop="companyName">
            <el-radio-group v-model="form.officialWebsite">
              <el-radio :label="3">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'方案号'" prop="companyAddress">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'成交金额'" prop="companyName">
            <el-input-number :min="0" v-model="form.companyName"></el-input-number>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'定金'" prop="companyName">
            <el-input-number :min="0" v-model="form.companyName"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'服务部门'" prop="companyAddress">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'下店操作人'" prop="companyName">
            <el-input-number :min="0" v-model="form.companyName"></el-input-number>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'下店操作费'" prop="companyName">
            <el-input-number :min="0" v-model="form.companyName"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'是否直客'" prop="companyAddress">
            <el-radio-group v-model="form.officialWebsite">
              <el-radio :label="3">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'项目'">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
  </div>
            <el-table :data="list1" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
            stripe size="mini" :highlight-current-row="true">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column
              v-for="(t,i) in columns1"
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
  </el-tab-pane>
  <el-tab-pane label="财务信息" name="second">
  <el-row :gutter="20">
    <el-col :span="8">
      <el-form-item :label="'总收款金额'" prop="companyName">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item :label="'退款金额'" prop="companyAddress">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item :label="'支付金额'" prop="companyAddress">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
  </el-row><el-row :gutter="20">
    <el-col :span="8">
      <el-form-item :label="'未收款金额'" prop="companyName">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item :label="'佣金'" prop="companyAddress">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item :label="'打板提成'" prop="companyAddress">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
  </el-row><el-row :gutter="20">
    <el-col :span="8">
      <el-form-item :label="'店铺收款金额'" prop="companyName">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col><el-col :span="8">
    <el-form-item :label="'回款金额'" prop="companyName">
      <el-input-number :min="0" v-model="form.companyName"></el-input-number>
    </el-form-item>
  </el-col>
    <el-col :span="8">
      <el-form-item :label="'店家员工'" prop="companyAddress">
        <el-input-number :min="0" v-model="form.companyName"></el-input-number>
      </el-form-item>
    </el-col>
  </el-row><el-row :gutter="20">
    <el-col :span="8">
      <el-form-item :label="'返还打版金'" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
        <div style="margin-top:20px;margin-bottom: 20px">
          <el-button @click="setRow">增加</el-button>
        <el-button @click="delRow">删除</el-button>
    </div>
    <el-table :data="list2" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
    stripe size="mini" :highlight-current-row="true">
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column
      v-for="(t,i) in columns2"
      :key="i"
      align="center"
      :prop="t.name"
      :label="t.text"
      :width="t.width?t.width:(selfAdaption?'':'120px')"
      v-if="t.default!=undefined?t.default:true"
    ></el-table-column>
  </el-table>
  </el-col>
  </el-row><el-row :gutter="20">
    <el-col :span="24">
        <div style="margin-top:20px;margin-bottom: 20px">
          <el-button @click="setRow">增加</el-button>
        <el-button @click="delRow">删除</el-button>
        <el-button >打印付款申请单</el-button>
    </div>
    <el-table :data="list3" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
    stripe size="mini" :highlight-current-row="true">
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column
      v-for="(t,i) in columns3"
      :key="i"
      align="center"
      :prop="t.name"
      :label="t.text"
      :width="t.width?t.width:(selfAdaption?'':'120px')"
      v-if="t.default!=undefined?t.default:true"
    ></el-table-column>
  </el-table>
  </el-col>
  </el-row>
  </el-tab-pane><el-tab-pane label="操作信息" name="third">
  <el-row :gutter="20">
    <el-col :span="8">
      <el-form-item :label="'项目范围'" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item :label="'末次月经'" prop="companyAddress">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item :label="'药物过敏'" prop="companyAddress">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
        <div style="margin-top:20px;margin-bottom: 20px">
          <el-button @click="setRow">增加</el-button>
        <el-button @click="delRow">删除</el-button>
    </div>
    <el-table :data="list4" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
    stripe size="mini" :highlight-current-row="true">
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column
      v-for="(t,i) in columns4"
      :key="i"
      align="center"
      :prop="t.name"
      :label="t.text"
      :width="t.width?t.width:(selfAdaption?'':'120px')"
      v-if="t.default!=undefined?t.default:true"
    ></el-table-column>
  </el-table>
  </el-col>
  </el-row>
  </el-tab-pane><el-tab-pane label="使用耗材" name="fourth">
  <el-row :gutter="20">
    <el-col :span="24">
    <el-table :data="list5" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
    stripe size="mini" :highlight-current-row="true">
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column
      v-for="(t,i) in columns5"
      :key="i"
      align="center"
      :prop="t.name"
      :label="t.text"
      :width="t.width?t.width:(selfAdaption?'':'120px')"
      v-if="t.default!=undefined?t.default:true"
    ></el-table-column>
  </el-table>
  </el-col>
  </el-row>
  </el-tab-pane>
</el-tabs>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProject} from '@/api/information/index'

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
      form: {
        companyName: null,
        companyAddress: null,
        telephone: null,
        officialWebsite: null,
        remark: null,
      },
      list1: [],
      columns1: [
        { text: '项目类型', name: 'gpName' },
        { text: '项目名称', name: 'gpLevel'},
        { text: '疗程价格', name: 'gpLevel'},
        { text: '单次价格', name: 'gpLevel'},
        { text: '数量', name: 'gpLevel'},
        { text: '已操作数量', name: 'gpLevel'},
        { text: '取消数量', name: 'gpLevel'},
        { text: '剩余数量', name: 'gpLevel'},
        { text: '耗材销售人', name: 'gpLevel'},
        { text: '备注', name: 'gpLevel'},
        { text: '项目状态', name: 'gpLevel'},
      ],
      list2: [],
      columns2: [
        { text: '收款日期', name: 'gpName' },
        { text: '收款单号', name: 'gpLevel'},
        { text: '收款人', name: 'gpLevel'},
        { text: '收款金额', name: 'gpLevel'},
        { text: '收款方式', name: 'gpLevel'},
        { text: '收款类型', name: 'gpLevel'},
        { text: '方案号', name: 'gpLevel'},
        { text: '备注', name: 'gpLevel'},
      ],
      list3: [],
      columns3: [
        { text: '付款日期', name: 'gpName' },
        { text: '付款单号', name: 'gpLevel'},
        { text: '收款人', name: 'gpLevel'},
        { text: '付款金额', name: 'gpLevel'},
        { text: '付款类型', name: 'gpLevel'},
        { text: '账号信息', name: 'gpLevel'},
        { text: '备注', name: 'gpLevel'},
      ],list4: [],
      columns4: [
        { text: '操作日期', name: 'gpName' },
        { text: '项目名称', name: 'gpLevel'},
        { text: '操作数量', name: 'gpLevel'},
        { text: '手术方式', name: 'gpLevel'},
        { text: '成交项目编码', name: 'gpLevel'},
        { text: '麻醉方式', name: 'gpLevel'},
        { text: '麻醉医生', name: 'gpLevel'},
        { text: '拆线人', name: 'gpLevel'},
        { text: '治疗医生', name: 'gpLevel'},
        { text: '操作科室', name: 'gpLevel'},
        { text: '医助', name: 'gpLevel'},
        { text: '操作部位', name: 'gpLevel'},
        { text: '配台护士', name: 'gpLevel'},
        { text: '配台分值', name: 'gpLevel'},
        { text: '巡回护士', name: 'gpLevel'},
        { text: '巡回分值', name: 'gpLevel'},
        { text: '巡回2护士', name: 'gpLevel'},
        { text: '巡回2分值', name: 'gpLevel'},
        { text: '留观护士', name: 'gpLevel'},
        { text: '留观分值', name: 'gpLevel'},
        { text: '项目类型', name: 'gpLevel'},
        { text: '备注', name: 'gpLevel'},
        { text: '出入时间', name: 'gpLevel'},
        { text: '起止时间', name: 'gpLevel'},
        { text: '登记人', name: 'gpLevel'},
      ],list5: [],
      columns5: [
        { text: '耗材名称', name: 'gpName' },
        { text: '型号', name: 'gpLevel'},
        { text: '数量', name: 'gpLevel'},
        { text: '备注', name: 'gpLevel'},
        { text: '成本金额', name: 'gpLevel'},
      ],
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
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
    setRow(){
      this.visible = true
    },
    delRow(){

    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addProject(this.form).then(res => {
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
