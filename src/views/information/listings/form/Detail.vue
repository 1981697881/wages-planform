<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="项目信息" name="first">
        <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'开单时间'" prop="fdate">
                <el-date-picker
                  v-model="form.fdate"
                  type="date"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'设计单号'" prop="fbillno">
                <el-input v-model="form.fbillno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'科室'" prop="fdept">
                <el-select style="width: 100%" v-model="form.fdept" placeholder="请选择">
                  <el-option
                    v-for="item in organizationsList"
                    :key="item.fid"
                    :label="item.fdeptname"
                    :value="item.fid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'顾客姓名'" prop="fcustomer">
                <el-select style="width: 100%" v-model="form.fcustomer" placeholder="请选择">
                  <el-option
                    v-for="item in customList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'年龄'" prop="fage">
                <el-input v-model="form.fage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'性别'" prop="fgender">
                <el-select style="width: 100%" v-model="form.fgender" placeholder="请选择">
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
            <el-col :span="8">
              <el-form-item :label="'设计师(咨询)'" prop="fdesigner">
                <el-select style="width: 100%" multiple v-model="form.fdesigner" placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.uid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'服务老师'" prop="fservicer">
                <el-select style="width: 100%" multiple v-model="form.fservicer" placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.uid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'业务员'" prop="fsaller">
                <el-select style="width: 100%" multiple v-model="form.fsaller" placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.uid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'业务部门'" prop="fsaledept">
                <el-select style="width: 100%" multiple v-model="form.fsaledept" placeholder="请选择">
                  <el-option
                    v-for="item in organizationsList"
                    :key="item.fid"
                    :label="item.fdeptname"
                    :value="item.fdeptname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'店家'" prop="fshopname">
                <el-select style="width: 100%" v-model="form.fshopname" placeholder="请选择">
                  <el-option
                    v-for="item in supplierList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'项目类型'" prop="fprjtype">
                <el-select style="width: 100%" v-model="form.fprjtype" placeholder="请选择">
                  <el-option
                    v-for="item in productionTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'是否PV'">
                <el-radio-group style="width: 100%" v-model="form.fispv">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'活动'">
                <el-radio-group style="width: 100%" v-model="form.fispromotion">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'方案号'" prop="fsaleprjid">
                <el-input v-model="form.fsaleprjid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'成交金额'">
                <el-input-number style="width: 100%" :min="0" v-model="form.famount"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'定金'">
                <el-input-number style="width: 100%" :min="0" v-model="form.fdepositamt"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'服务部门'" prop="fservicedeptid">
                <el-select style="width: 100%" multiple v-model="form.fservicedeptid" placeholder="请选择">
                  <el-option
                    v-for="item in organizationsList"
                    :key="item.fid"
                    :label="item.fdeptname"
                    :value="item.fdeptname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'下店操作人'" prop="fopername">
                <el-select style="width: 100%" v-model="form.fopername" placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.uid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'下店操作费'">
                <el-input-number style="width: 100%" :min="0" v-model="form.foperamt"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'是否直客'">
                <el-radio-group style="width: 100%" v-model="form.fistclient">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'项目'">
                <div style="margin-top:20px;margin-bottom: 20px">
                  <el-button  size="mini"@click="setRow1">增加</el-button>
                  <el-button  size="mini"@click="delRow1">删除</el-button>
                </div>
                <el-table class="tableBox" ref="multipleTable" border height="250px"
                          stripe size="mini"  @selection-change="handleSelectionChange1" :highlight-current-row="true" :data="form.tProjectDetails" align="center" :cell-style="myclass" highlight-current-row>
                  <el-table-column align="center" type="selection"></el-table-column>
                  <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
                  <template
                    v-for="(t,i) in columns1"
                  >
                    <el-table-column
                      :key="i"
                      align="center"
                      :prop="t.name"
                      :width="t.width?t.width:'120px'"
                      v-if="t.name == 'fprodid'"
                      :label="t.text"
                    >
                      <template slot-scope="scope" >
                        <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                        <el-select @change="changeProduction($event,scope.row)" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]" placeholder="请选择">
                          <el-option
                            v-for="item in productionList"
                            :key="item.fid"
                            :label="item.fname"
                            :value="item.fname">
                          </el-option>
                        </el-select>
                        <span>{{scope.row[t.name]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :key="i"
                      align="center"
                      :prop="t.name"
                      :width="t.width?t.width:'120px'"
                      v-else-if="t.name == 'fproject'"
                      :label="t.text"
                    >
                      <template slot-scope="scope" >
                        <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                        <el-select @change="changeProduction($event,scope.row)" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <span>{{scope.row[t.name]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :key="i"
                      align="center"
                      :prop="t.name"
                      v-else
                      :width="t.width?t.width:'120px'"
                      :label="t.text"
                    >
                      <template slot-scope="scope">
                        <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                        <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable />
                        <span>{{scope.row[t.name]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="财务信息" name="second">
        <el-form :size="'mini'" :rules="rules" ref="form2">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'总收款金额'">
              <el-input-number style="width: 100%" :min="0" v-model="form2.fallamt"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'退款金额'">
              <el-input-number style="width: 100%" :min="0" v-model="form2.fretamt"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'支付金额'" >
              <el-input-number style="width: 100%" :min="0" v-model="form2.fpayamt"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'未收款金额'">
              <el-input-number style="width: 100%" :min="0" v-model="form2.funrecamt"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'佣金'" >
              <el-input-number style="width: 100%" :min="0" v-model="form2.fcommamt"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'打板提成'" >
              <el-input-number style="width: 100%" :min="0" v-model="form2.fplateamt"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'店铺收款金额'">
              <el-input-number style="width: 100%" :min="0" v-model="form2.fshoprecamt"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'回款金额'">
              <el-input-number style="width: 100%" :min="0" v-model="form2.frealamt"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'店家员工'">
              <el-input v-model="form2.fshopemp"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'返还打版金'">
              <el-input-number style="width: 100%" v-model="form2.fretplateamt"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button  size="mini"@click="setRow2">增加</el-button>
              <el-button  size="mini"@click="delRow">删除</el-button>
            </div>
            <el-table class="tableBox"  border height="250px" stripe size="mini" :highlight-current-row="true" :data="form2.tProjectFinancePays" align="center" :cell-style="myclass" highlight-current-row>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns2"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
              >
                <template slot-scope="scope">
                  <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                  <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable />
                  <span>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button  size="mini"@click="setRow3">增加</el-button>
              <el-button  size="mini"@click="delRow">删除</el-button>
              <el-button>打印付款申请单</el-button>
            </div>
            <el-table class="tableBox"  border height="250px" stripe size="mini" :highlight-current-row="true" :data="form2.tProjectFinanceRecs" align="center" :cell-style="myclass" highlight-current-row>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns3"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
              >
                <template slot-scope="scope">
                  <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                  <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable />
                  <span>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="操作信息" name="third">
        <el-form  :size="'mini'" :rules="rules" ref="form3">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'项目范围'">
              <el-input v-model="form3.fprojectrange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'末次月经'">
              <el-date-picker
                v-model="form3.flastmenstruation"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'药物过敏'">
              <el-input v-model="form3.fdrugallergy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button  size="mini"@click="setRow4">增加</el-button>
              <el-button  size="mini"@click="delRow">删除</el-button>
            </div>
            <el-table class="tableBox"  border height="250px" stripe size="mini" :highlight-current-row="true" :data="form3.tProjectOperations" align="center" :cell-style="myclass" highlight-current-row>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns4"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
              >
                <template slot-scope="scope">
                  <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                  <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable />
                  <span>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="使用耗材" name="fourth">
        <el-form  :size="'mini'" :rules="rules" ref="form4">
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="margin-top:20px;margin-bottom: 20px">
              <el-button  size="mini"@click="setRow5">增加</el-button>
              <el-button  size="mini"@click="delRow">删除</el-button>
            </div>
            <el-table class="tableBox"  border height="250px" stripe size="mini" :highlight-current-row="true" :data="form4.tProjectMaterials" align="center" :cell-style="myclass" highlight-current-row>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns5"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
              >
                <template slot-scope="scope">
                  <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                  <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable />
                  <span>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" style="text-align:center">
      <el-button  size="mini"type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProject,getProjectFinanceList,getProjectOperationMessageList,getProjectMaterialList,addProjectFinance,addProjectOperation,addProjectMaterial} from '@/api/information/index'
import {getTuserList,getDutyList,getOrganizationsList,getProductionTypeList,getCustomDictList,getSupplierList,getProductionList} from '@/api/basic/index'
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
      activeName: 'first',
      form: {
        fage: 0,
        famount: 0,
        fbillno: null,
        fcustomer: null,
        fdahst: null,
        fdate: null,
        fdepositamt: 0,
        fdept: null,
        fdesigner: null,
        fgender: null,
        fopername: null,
        fispromotion: 0,
        fispv: 0,
        fistclient: 0,
        flmp: 0,
        foperamt: 0,
        fprjlimit: null,
        fprjtype: null,
        fsaledept: null,
        fsaleprjid: null,
        fsaller: null,
        fservicedeptid: null,
        fservicer: null,
        fshopname: null,
        tProjectDetails: [],
      },
      form2: {
        fallamt: 0,
        fcommamt: 0,
        fpayamt: 0,
        fplateamt: 0,
        frealamt: 0,
        fretamt: 0,
        fretplateamt: 0,
        fshoprecamt: 0,
        funrecamt: 0,
        fshopemp: null,
        tProjectFinancePays: [],
        tProjectFinanceRecs: [],
      },form3: {
        fdrugallergy: null,
        flastmenstruation: null,
        fshopemp: null,
        tProjectOperations: [],
      },form4: {
        tProjectMaterials: []
      },
      list1: [],
      multipleSelection1: [],
      columns1: [
        {text: '项目类型', width: '200', name: 'fprodtype',sfkgg: false, sfcb: true},
        {text: '项目名称', width: '250',name: 'fprodid',sfkgg: false, sfcb: true},
        {text: '项目', name: 'fproject',sfkgg: false, sfcb: true},
        {text: '赠送人', name: 'fdonor',sfkgg: false, sfcb: true},
        {text: '赠送项目名称', name: 'fgiftprojectname',sfkgg: false, sfcb: true},
        {text: '疗程价格', name: 'fallamt',sfkgg: false, sfcb: true},
        {text: '单次价格', name: 'fsingleamt',sfkgg: false, sfcb: true},
        {text: '数量', name: 'fqty',sfkgg: false, sfcb: true},
        {text: '已操作数量', name: 'fuseqty',sfkgg: false, sfcb: true},
        {text: '取消数量', name: 'fcancelqty',sfkgg: false, sfcb: true},
        {text: '剩余数量', name: 'fremaintqty',sfkgg: false, sfcb: true},
        {text: '耗材销售人', name: 'fmatsaller',sfkgg: false, sfcb: true},
        {text: '备注', name: 'fnote'},
        {text: '项目状态', name: 'fstatus'},
      ],
      list2: [],
      columns2: [
        {text: '收款日期', name: 'gpName'},
        {text: '收款单号', name: 'gpLevel1'},
        {text: '收款人', name: 'gpLevel2'},
        {text: '收款金额', name: 'gpLevel3'},
        {text: '收款方式', name: 'gpLevel4'},
        {text: '收款类型', name: 'gpLevel5'},
        {text: '方案号', name: 'gpLevel6'},
        {text: '备注', name: 'gpLevel7'},
      ],
      list3: [],
      columns3: [
        {text: '付款日期', name: 'gpName'},
        {text: '付款单号', name: 'gpLevel1'},
        {text: '收款人', name: 'gpLevel2'},
        {text: '付款金额', name: 'gpLevel3'},
        {text: '付款类型', name: 'gpLevel4'},
        {text: '账号信息', name: 'gpLevel5'},
        {text: '备注', name: 'gpLevel6'},
      ], list4: [],
      columns4: [
        {text: '操作日期', name: 'gpName'},
        {text: '项目名称', name: 'gpLevel1'},
        {text: '操作数量', name: 'gpLevel2'},
        {text: '手术方式', name: 'gpLevel3'},
        {text: '成交项目编码', name: 'gpLevel4'},
        {text: '麻醉方式', name: 'gpLevel5'},
        {text: '麻醉医生', name: 'gpLevel6'},
        {text: '拆线人', name: 'gpLevel7'},
        {text: '治疗医生', name: 'gpLevel8'},
        {text: '操作科室', name: 'gpLevel9'},
        {text: '医助', name: 'gpLevel10'},
        {text: '操作部位', name: 'gpLevel11'},
        {text: '配台护士', name: 'gpLevel12'},
        {text: '配台分值', name: 'gpLevel13'},
        {text: '巡回护士', name: 'gpLevel14'},
        {text: '巡回分值', name: 'gpLevel15'},
        {text: '巡回2护士', name: 'gpLevel16'},
        {text: '巡回2分值', name: 'gpLevel17'},
        {text: '留观护士', name: 'gpLevel18'},
        {text: '留观分值', name: 'gpLevel19'},
        {text: '项目类型', name: 'gpLevel20'},
        {text: '备注', name: 'gpLevel21'},
        {text: '出入时间', name: 'gpLevel22'},
        {text: '起止时间', name: 'gpLevel23'},
        {text: '登记人', name: 'gpLevel24'},
      ], list5: [],
      columns5: [
        {text: '耗材名称', name: 'gpName'},
        {text: '型号', name: 'gpLevel1'},
        {text: '数量', name: 'gpLevel2'},
        {text: '备注', name: 'gpLevel3'},
        {text: '成本金额', name: 'gpLevel4'},
      ],
      userList: [],
      dutyList: [],
      supplierList: [],
      organizationsList: [],
      customList: [],
      productionList: [],
      productionTypeList: [{
        value: 0,
        label: '无创'
      }, {
        value: 1,
        label: '美外'
      }, {
        value: 2,
        label: '抗衰'
      }, {
        value: 3,
        label: '大健康' //
      }],projectList: [{
        value: '购买',
        label: '购买'
      }, {
        value: '赠送',
        label: '赠送'
      }, {
        value: '转换',
        label: '转换'
      }],
      options: [{
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
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
    this.getUsersArray()
    this.getDutyArray()
    this.getCustomDictArray()
    this.getOrganizationsArray()
    this.getProjectFinance()
    this.getProjectOperationMessage()
    this.getProjectMaterial()
    this.getSupplier()
    this.getProduction()
    if (this.listInfo) {
      this.form = this.listInfo
      /*this.form.tProjectDetails = JSON.parse(this.tProjectDetails)*/

      this.form.fdesigner = this.form.fdesigner.split(",");
      this.form.fsaledept = this.form.fsaledept.split(",");
      this.form.fsaller = this.form.fsaller.split(",");
      this.form.fservicedeptid = this.form.fservicedeptid.split(",");
      this.form.fservicer = this.form.fservicer.split(",");
    }
  },
  methods: {
    changeProduction(val,row){
      this.productionList.forEach((item)=>{
        if(item.fname == val){
          row.fprodtype = item.ftype
        }
      })
    },
    myclass({ row, columnIndex }) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null ) {
        return "color: red";
      }
    },
    setRow1() {
      var itemObj = {
        fprodtype: "",
        fprodid: "",
        fallamt: "",
        fsingleamt: "",
        fqty: "",
        fuseqty: "",
        fcancelqty: "",
        fremaintqty: "",
        fmatsaller: "",
        fnote: "",
        fstatus: "",
        sfkgg: true,
        sfcb: null,
      }
      this.form.tProjectDetails.push(itemObj)
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    },
    delRow1() {
      if(this.multipleSelection1.length>0){
        this.multipleSelection1.forEach((item)=>{
          this.form.tProjectDetails.splice(item)
        })
      }else{
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    setRow2() {
      var itemObj = {
        gpName: "",
        gpLevel1: "",
        gpLevel2: "",
        gpLevel3: "",
        gpLevel4: "",
        gpLevel5: "",
        gpLevel6: "",
        gpLevel7: "",
        sfkgg: true,
        sfcb: null,
      }
      this.list2.push(itemObj)
    },setRow3() {
      var itemObj = {
        gpName: "",
        gpLevel1: "",
        gpLevel2: "",
        gpLevel3: "",
        gpLevel4: "",
        gpLevel5: "",
        gpLevel6: "",
        sfkgg: true,
        sfcb: null,
      }
      this.list3.push(itemObj)
    },setRow4() {
      var itemObj = {
        gpName: "",
        gpLevel1: "",
        gpLevel2: "",
        gpLevel3: "",
        gpLevel4: "",
        gpLevel5: "",
        gpLevel6: "",
        gpLevel7: "",
        gpLevel8: "",
        gpLevel9: "",
        gpLevel10: "",
        gpLevel11: "",
        gpLevel12: "",
        gpLevel13: "",
        gpLevel14: "",
        gpLevel15: "",
        gpLevel16: "",
        gpLevel17: "",
        gpLevel18: "",
        gpLevel19: "",
        gpLevel20: "",
        gpLevel21: "",
        gpLevel22: "",
        gpLevel23: "",
        gpLevel24: "",
        sfkgg: true,
        sfcb: null,
      }
      this.list4.push(itemObj)
    },
    setRow5() {
      var itemObj = {
        gpName: "",
        gpLevel1: "",
        gpLevel2: "",
        gpLevel3: "",
        gpLevel4: "",
        sfkgg: true,
        sfcb: null,
      }
      this.list5.push(itemObj)
    },
    delRow() {

    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          /*this.form.tProjectDetails = JSON.stringify(this.tProjectDetails)*/
          this.form.fdesigner = this.form.fdesigner.join(',');
          this.form.fsaledept = this.form.fsaledept.join(',');
          this.form.fsaller = this.form.fsaller.join(',');
          this.form.fservicedeptid = this.form.fservicedeptid.join(',');
          this.form.fservicer = this.form.fservicer.join(',');
          addProject(this.form).then(res => {
            if(res.flag){
              if(this.form.fid){
                addProjectFinance(this.form2).then(res => {
                  this.$emit('uploadList')
                  this.$emit('hideDialog', false)
                })
                addProjectOperation(this.form3).then(res => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                })
                addProjectMaterial(this.form4).then(res => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                })
              }
            }else{
              this.$emit('uploadList')
            }
          })

        } else {
          return false
        }
      })
    },getProjectFinance(val={fbillid: this.form.fid}, data = {
      pageNum: 1,
      pageSize: 500
    }) {
      getProjectFinanceList(data, val).then(res => {
        this.list2 = res.data.records
      });
    },getProjectOperationMessage(val={fbillid: this.form.fid}, data = {
      pageNum: 1,
      pageSize: 500
    }) {
      getProjectOperationMessageList(data, val).then(res => {
        this.list4 = res.data.records
      });
    },getProjectMaterial(val={fbillid: this.form.fid}, data = {
      pageNum: 1,
      pageSize: 500
    }) {
      getProjectMaterialList(data, val).then(res => {
        this.list5 = res.data.records
      });
    },
    getUsersArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getTuserList(data, val).then(res => {
        this.userList = res.data.records
      });
    },
    getProduction(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getProductionList(data, val).then(res => {
        this.productionList = res.data.records
      });
    },getSupplier(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getSupplierList(data, val).then(res => {
        this.supplierList = res.data.records
      });
    },getProductionTypeArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getProductionTypeList(data, val).then(res => {
        this.productionTypeList = res.data.records
      });
    },
    getDutyArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getDutyList(data, val).then(res => {
        this.dutyList = res.data.records
      });
    },
    getOrganizationsArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getOrganizationsList(data, val).then(res => {
        this.organizationsList = res.data.records
      });
    },
    getCustomDictArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getCustomDictList(data, val).then(res => {
        this.customList = res.data.records
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
  /* 通过显隐控制input框的状态 */
  .tableBox .el-select {
    display: none;
  }
  .tableBox .current-row .el-select {
    display: block;
  }
  .tableBox .current-row .el-select + span {
    display: none;
  }
</style>
