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
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'收据号'" prop="fbillno">
                <el-input v-model="form.fbillno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'科室'" prop="fdept">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod2"
                           :loading="loading" style="width: 100%" v-model="form.fdept" placeholder="请选择">
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
              <el-form-item :label="'顾客姓名'" prop="fcustomer">
                <el-input v-model="form.fcustomer"></el-input>
                <!-- <el-select filterable
                            remote
                            :remote-method="remoteMethod3"
                            :loading="loading" @change="changeCustom" style="width: 100%" v-model="form.fcustomer" placeholder="请选择">
                   <el-option
                     v-for="item in customList"
                     :key="item.fid"
                     :label="item.fname"
                     :value="item.fname">
                   </el-option>
                 </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'服务部门'" prop="fservicedeptid">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod2"
                           :loading="loading" style="width: 100%" multiple v-model="form.fservicedeptid"
                           placeholder="请选择">
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
              <el-form-item :label="'服务老师'" prop="fservicer">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod"
                           :loading="loading" style="width: 100%" @change="changeFServicer" multiple
                           v-model="form.fservicer"
                           placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'方案号'" prop="fsaleprjid">
                <!-- <el-input v-model="form.fsaleprjid"></el-input>-->
                <el-select filterable
                           remote
                           :remote-method="remoteMethod5"
                           :loading="loading" style="width: 100%" v-model="form.fsaleprjid" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in salePrjList"
                    :key="index"
                    :label="item.fname"
                    :value="item.fid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'业务部门'" prop="fsaledept">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod2"
                           :loading="loading" style="width: 100%" multiple v-model="form.fsaledept" placeholder="请选择">
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
              <el-form-item :label="'业务员'" prop="fsaller">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod"
                           :loading="loading" style="width: 100%" @change="changeFSaller" multiple
                           v-model="form.fsaller"
                           placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'设计师(咨询)'" prop="fdesigner">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod"
                           :loading="loading" style="width: 100%" multiple v-model="form.fdesigner" placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'店家'" prop="fshopname">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod4"
                           :loading="loading" style="width: 100%" v-model="form.fshopname" placeholder="请选择">
                  <el-option
                    v-for="item in supplierList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'项目类型'" prop="fprjtype">
                <el-select
                  :loading="loading" style="width: 100%" v-model="form.fprjtype" placeholder="请选择">
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
              <el-form-item :label="'是否直客'">
                <el-radio-group style="width: 100%" v-model="form.fistclient">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="'成交金额'">
                <el-input-number style="width: 100%" :min="0" v-model="form.famount"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="'定金'">
                <el-input-number style="width: 100%" :min="0" v-model="form.fdepositamt"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="'下店操作人'" prop="fopername">
                <el-select filterable
                           remote
                           :remote-method="remoteMethod"
                           :loading="loading" style="width: 100%" v-model="form.fopername" placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.fid"
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="'下店操作费'">
                <el-input-number style="width: 100%" :min="0" v-model="form.foperamt"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">


          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="'项目'">
                <div style="margin-top:20px;margin-bottom: 20px">
                  <el-button size="mini" @click="setRow1">增加</el-button>
                  <el-button size="mini" @click="delRow1">删除</el-button>
                </div>
                <el-table class="tableBox" ref="multipleTable" border height="250px"
                          stripe size="mini" @selection-change="handleSelectionChange1" :highlight-current-row="true"
                          :data="form.tProjectDetails" align="center" :cell-style="myclass" highlight-current-row>
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
                      <template slot-scope="scope">
                        <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                        <el-select filterable
                                   remote
                                   :remote-method="remoteMethod6"
                                   :loading="loading" @change="changeProduction($event,scope.row)" style="width: 100%"
                                   v-if="!t.sfkgg"
                                   v-model="scope.row[t.name]" placeholder="请选择">
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
                      <template slot-scope="scope">
                        <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                        <el-select style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                   placeholder="请选择">
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
                        <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                        <span>{{scope.row[t.name]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button size="mini" type="primary" @click="saveData('form')">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="财务信息" name="second">
        <el-form :size="'mini'" :model="form2" :rules="rules" ref="form2">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'总收款金额'">
                <el-input-number style="width: 100%" :min="0" v-model="form2.fallamt"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'退款金额'">
                <el-input-number style="width: 100%" v-model="form2.fretamt"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'支付金额'">
                <el-input-number style="width: 100%" v-model="form2.fpayamt"></el-input-number>
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
              <el-form-item :label="'佣金'">
                <el-input-number style="width: 100%" :min="0" v-model="form2.fcommamt"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'打板提成'">
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
                <el-button size="mini" @click="setRow2">增加</el-button>
                <el-button size="mini" @click="delRow2">删除</el-button>
              </div>
              <el-table class="tableBox" border height="250px" ref="multipleTable2"
                        @selection-change="handleSelectionChange2"
                        stripe size="mini" :highlight-current-row="true"
                        :data="form2.tProjectFinanceRecs" align="center" :cell-style="myclass" highlight-current-row>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
                <template
                  v-for="(t,i) in columns2"
                >
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-if="t.name == 'frecdate'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-date-picker
                        style="width: 100%"
                        v-if="!t.sfkgg"
                        value-format="yyyy-MM-dd"
                        v-model="scope.row[t.name]"
                        placeholder="请选择">
                      </el-date-picker>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'freceiver'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'frectype'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="(item,index) in frectypeList"
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
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'fcollectiontype'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="(item,index) in fcollectiontypeList"
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
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'fprjno'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod5"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="(item,index) in salePrjList"
                          :key="index"
                          :label="item.fname"
                          :value="item.fid">
                        </el-option>
                      </el-select>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    v-else-if="t.name == 'frecamt'"
                    :width="t.width?t.width:'120px'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 frecamt fpayamt//-->
                      <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" v-on:input="onCount1($event)"  clearable/>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column><el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    v-else
                    :width="t.width?t.width:'120px'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 frecamt fpayamt//-->
                      <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="margin-top:20px;margin-bottom: 20px">
                <el-button size="mini" @click="setRow3">增加</el-button>
                <el-button size="mini" @click="delRow3">删除</el-button>
                <el-button size="mini">打印付款申请单</el-button>
              </div>
              <el-table class="tableBox" border height="250px" stripe size="mini" :highlight-current-row="true"
                        ref="multipleTabl3" @selection-change="handleSelectionChange3"
                        :data="form2.tProjectFinancePays" align="center" :cell-style="myclass" highlight-current-row>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
                <template
                  v-for="(t,i) in columns3"
                >
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-if="t.name == 'fpaydate'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-date-picker
                        style="width: 100%"
                        v-if="!t.sfkgg"
                        value-format="yyyy-MM-dd"
                        v-model="scope.row[t.name]"
                        placeholder="请选择">
                      </el-date-picker>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'fcustomer'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod4"
                                 :loading="loading" style="width: 100%" @change="changeProductionUser($event,scope.row)"
                                 v-if="!t.sfkgg" v-model="scope.row[t.name]" placeholder="请选择">
                        <el-option
                          v-for="item in supplierList"
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
                    v-else-if="t.name == 'fpaymethod'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select @change="changeProduction($event,scope.row)" style="width: 100%"
                                 v-if="!t.sfkgg"
                                 v-model="scope.row[t.name]" placeholder="请选择">
                        <el-option
                          v-for="item in fpaymethodList"
                          :key="item.fid"
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
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'fpaytype'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="(item,index) in fpaytypeList"
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
                    v-else-if="t.name == 'fpayamt'"
                    :width="t.width?t.width:'120px'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" v-on:input="onCount2($event)" clearable/>
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
                      <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button size="mini" type="primary" @click="saveData2('form2')">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作信息" name="third">
        <el-form :size="'mini'" :model="form3" :rules="rules4" ref="form3">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'档案号'" prop="fnumber">
                <el-input v-model="form3.fnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'姓名'" prop="fname">
                <el-input v-model="form3.fname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'身份证号'" prop="fidno">
                <el-input v-model="form3.fidno"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'出生日期'" prop="fbirthdate">
                <el-date-picker
                  v-model="form3.fbirthdate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'年龄'" prop="fage">
                <el-input v-model="form3.fage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'性别'" prop="fsex">
                <el-select style="width: 100%" v-model="form3.fsex" placeholder="请选择">
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
                <el-button size="mini" @click="setRow4">增加</el-button>
                <el-button size="mini" @click="delRow4">删除</el-button>
              </div>
              <el-table class="tableBox" border height="250px" stripe size="mini" :highlight-current-row="true"
                        ref="multipleTable4" @selection-change="handleSelectionChange4"
                        :data="form3.tProjectOperations" align="center" :cell-style="myclass" highlight-current-row>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
                <template
                  v-for="(t,i) in columns4"
                >
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-if="t.name == 'foperdate'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-date-picker
                        style="width: 100%"
                        v-if="!t.sfkgg"
                        type="date"
                        value-format="yyyy-MM-dd"
                        v-model="scope.row[t.name]"
                        placeholder="请选择">
                      </el-date-picker>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'fpordid'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod6"
                                 :loading="loading" @change="changeProduction2($event,scope.row)" style="width: 100%"
                                 v-if="!t.sfkgg"
                                 v-model="scope.row[t.name]" placeholder="请选择">
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
                    v-else-if="t.name == 'foperid'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod7"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="(item,index) in dictList"
                          :key="index"
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
                    v-else-if="t.name == 'fanestype'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="(item,index) in fanestype"
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
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'faneser'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'foffsit'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'foperdept'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod2"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in organizationsList"
                          :key="item.fid"
                          :label="item.fdeptname"
                          :value="item.fdeptname">
                        </el-option>
                      </el-select>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column><el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'faid'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'fdoctor'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'fvisitingnurse'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'fmatchingnurse'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'fitinerantnurse'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'fitinerantnurse2'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'frecorder'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod"
                                 :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                                 placeholder="请选择">
                        <el-option
                          v-for="item in userList"
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
                    v-else-if="t.name == 'fbegintime'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-date-picker
                        style="width: 100%"
                        v-if="!t.sfkgg"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="scope.row[t.name]"
                        placeholder="请选择">
                      </el-date-picker>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    :width="t.width?t.width:'120px'"
                    v-else-if="t.name == 'fendtime'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-date-picker
                        style="width: 100%"
                        v-if="!t.sfkgg"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="scope.row[t.name]"
                        placeholder="请选择">
                      </el-date-picker>
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
                      <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button size="mini" type="primary" @click="saveData3('form3')">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="使用耗材" name="fourth">
        <el-form :size="'mini'" :model="form4" :rules="rules" ref="form4">
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="margin-top:20px;margin-bottom: 20px">
                <el-button size="mini" @click="setRow5">增加</el-button>
                <el-button size="mini" @click="delRow5">删除</el-button>
              </div>
              <el-table class="tableBox" border height="250px" stripe size="mini" :highlight-current-row="true"
                        ref="multipleTable5" @selection-change="handleSelectionChange5"
                        :data="form4.tProjectMaterials" align="center" :cell-style="myclass" highlight-current-row>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
                <template
                  v-for="(t,i) in columns5"
                >
                  <el-table-column
                    :key="i"
                    align="center"
                    :prop="t.name"
                    v-if="t.name == 'fprodid'"
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-select filterable
                                 remote
                                 :remote-method="remoteMethod6"
                                 :loading="loading" @change="changeProduction3($event,scope.row)" style="width: 100%"
                                 v-if="!t.sfkgg"
                                 v-model="scope.row[t.name]" placeholder="请选择">
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
                    v-else
                    :label="t.text"
                  >
                    <template slot-scope="scope">
                      <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                      <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                      <span>{{scope.row[t.name]}}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button size="mini" type="primary" @click="saveData4('form4')">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>import {
  addProject,
  getProjectFinanceList,
  getProjectOperationMessageList,
  getProjectMaterialList,
  addProjectFinance,
  addProjectOperation,
  getSalePrjList,
  addProjectMaterial
} from '@/api/information/index'
import {
  getTuserList,
  getDutyList,
  getOrganizationsList,
  getProductionTypeList,
  getCustomDictList,
  getSupplierList,
  getProductionList,
  getDictList
} from '@/api/basic/index'

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
      loading: false,
      form: {
        fage: 0,
        famount: 0,
        fbillno: null,
        fcustomer: null,
        fdahst: null,
        fdate: new Date(),
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
        tProjectFinanceRecs: [],
        tProjectFinancePays: [],
      },
      form3: {
        fnumber: null,
        fname: null,
        fidno: null,
        fbirthdate: null,
        fage: null,
        fsex: null,
        fdrugallergy: null,
        fprojectrange: null,
        flastmenstruation: null,
        fshopemp: null,
        tProjectOperations: [],
      },
      form4: {
        tProjectMaterials: []
      },
      list1: [],
      multipleSelection1: [],
      multipleSelection2: [],
      multipleSelection3: [],
      multipleSelection4: [],
      multipleSelection5: [],
      columns1: [
        {text: '项目类型', width: '200', name: 'fprodtype', sfkgg: false, sfcb: true},
        {text: '项目名称', width: '250', name: 'fprodid', sfkgg: false, sfcb: true},
        {text: '项目', name: 'fproject', sfkgg: false, sfcb: true},
        {text: '赠送人', name: 'fdonor', sfkgg: false, sfcb: true},
        {text: '赠送项目名称', name: 'fgiftprojectname', sfkgg: false, sfcb: true},
        {text: '疗程价格', name: 'fallamt', sfkgg: false, sfcb: true},
        {text: '单次价格', name: 'fsingleamt', sfkgg: false, sfcb: true},
        {text: '数量', name: 'fqty', sfkgg: false, sfcb: true},
        {text: '已操作数量', name: 'fuseqty', sfkgg: false, sfcb: true},
        {text: '取消数量', name: 'fcancelqty', sfkgg: false, sfcb: true},
        {text: '剩余数量', name: 'fremaintqty', sfkgg: false, sfcb: true},
        {text: '耗材销售人', name: 'fmatsaller', sfkgg: false, sfcb: true},
        {text: '备注', name: 'fnote'},
        {text: '项目状态', name: 'fstatus'},
      ],
      list2: [],
      columns2: [
        {text: '收款日期', name: 'frecdate', width: '200'},
        {text: '收款单号', name: 'frecno', width: '200'},
        {text: '收款人', name: 'freceiver'},
        {text: '收款金额', name: 'frecamt'},
        {text: '收款方式', name: 'frectype', width: '200'},
        {text: '收款类型', name: 'fcollectiontype', width: '200'},
        {text: '方案号', name: 'fprjno', width: '150'},
        {text: '备注', name: 'fnote'},
      ],
      list3: [],
      columns3: [
        {text: '付款日期', name: 'fpaydate', width: '200'},
        {text: '付款单号', name: 'fphone', width: '200'},
        {text: '收款人', name: 'fcustomer'},
        {text: '付款金额', name: 'fpayamt'},
        {text: '付款方式', name: 'fpaymethod', width: '200'},
        {text: '付款类型', name: 'fpaytype', width: '200'},
        {text: '账号信息', name: 'faccount', width: '200'},
        {text: '备注', name: 'fnote'},
      ], list4: [],
      columns4: [
        {text: '操作日期', name: 'foperdate', width: '200'},
        {text: '项目名称', name: 'fpordid', width: '200'},
        {text: '操作数量', name: 'fqty'},
        {text: '手术方式', name: 'foperid'},
        {text: '成交项目编码', name: 'fprojectnumber'},
        {text: '麻醉方式', name: 'fanestype'},
        {text: '麻醉医生', name: 'faneser'},
        {text: '拆线人', name: 'foffsit'},
        {text: '治疗医生', name: 'fdoctor'},
        {text: '操作科室', name: 'foperdept', width: '150'},
        {text: '医助', name: 'faid'},
        {text: '操作部位', name: 'foperpart'},
        {text: '配台护士', name: 'fmatchingnurse'},
        {text: '配台分值', name: 'fmnvalue'},
        {text: '巡回护士', name: 'fitinerantnurse'},
        {text: '巡回分值', name: 'finvalue'},
        {text: '巡回2护士', name: 'fitinerantnurse2'},
        {text: '巡回2分值', name: 'finvalue2'},
        {text: '留观护士', name: 'fvisitingnurse'},
        {text: '留观分值', name: 'fvnvalue'},
        {text: '项目类型', name: 'fprojecttype', width: '200'},
        {text: '备注', name: 'fnote'},
        {text: '出入时间', name: 'fbegintime', width: '200'},
        {text: '起止时间', name: 'fendtime', width: '200'},
        {text: '登记人', name: 'frecorder'},
      ], list5: [],
      columns5: [
        {text: '耗材名称', name: 'fprodid'},
        {text: '型号', name: 'fspec'},
        {text: '数量', name: 'fqty'},
        {text: '备注', name: 'fnote'},
        {text: '成本价格', name: 'fprice'},
      ],
      userList: [],
      salePrjList: [],
      dutyList: [],
      supplierList: [],
      dictList: [],
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
      }],
      projectList: [{
        value: '购买',
        label: '购买'
      }, {
        value: '赠送',
        label: '赠送'
      }, {
        value: '转换',
        label: '转换'
      }], frectypeList: [{
        value: '小冲',
        label: '小冲'
      }, {
        value: '转账（对公）',
        label: '转账（对公）'
      }, {
        value: '转账（对私）',
        label: '转账（对私）'
      }, {
        value: '银联',
        label: '银联'
      }, {
        value: '返款抵扣',
        label: '返款抵扣'
      }, {
        value: '现金',
        label: '现金'
      }],
      fcollectiontypeList: [{
        value: '定金',
        label: '定金'
      }, {
        value: '保证金',
        label: '保证金'
      }, {
        value: '收款',
        label: '收款'
      }, {
        value: '抵扣',
        label: '抵扣'
      }], fpaymethodList: [{
        value: '对公转账',
        label: '对公转账'
      }, {
        value: '小冲',
        label: '小冲'
      }, {
        value: '个人转账',
        label: '个人转账'
      }],
      fpaytypeList: [{
        value: '佣金',
        label: '佣金'
      }, {
        value: '退款',
        label: '退款'
      }, {
        value: '奖励',
        label: '奖励'
      }, {
        value: '介绍费',
        label: '介绍费'
      }], fanestype: [{
        value: '0',
        label: '局麻'
      }, {
        value: '1',
        label: '全麻'
      }],
      options: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
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
      },rules4: {
        fnumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        fidno: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fbirthdate: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        fage: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        fsex: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
    }
  },

  computed: {
   /* 'form2.fallamt': {
      get() {
        let number = 0;
        this.form2.tProjectFinanceRecs.forEach((item)=>{
          if (!item.frecamt && typeof(item.frecamt)!="undefined" && item.frecamt!=0) {
            console.log(123333)
          }
        });
        return number
      }
    },
    'form2.fretamt': {
      get() {
        let number = 0;
        this.form2.tProjectFinanceRecs.forEach((item)=>{
          if (!item.frecamt && typeof(item.frecamt)!="undefined" && item.frecamt!=0) {
            console.log(123333)
          }
        });
        return number
      }
    },
    'form2.fpayamt': {
      get() {
        let number = 0;
        this.form2.tProjectFinancePays.forEach((item)=>{
          if (!item.fpayamt && typeof(item.fpayamt)!="undefined" && item.fpayamt!=0) {
            console.log(123333)
          }
        });
        return number
      }
    },*/
  },
  watch: {
    'form.fcustomer': {
      handler(newVal, oldVal) {
        this.form3.fname = newVal
        console.log(newVal, oldVal)
      },
    },
    /*'form2.tProjectFinanceRecs': {
      handler(newVal, oldVal) {
        /!*this.form2.fallamt = newVal
        this.form2.fretamt = newVal*!/
        let number = 0;
        this.form2.tProjectFinanceRecs.forEach((item)=>{
          if (!item.frecamt && typeof(item.frecamt)!="undefined" && item.frecamt!=0) {
          }
        });
      },
    },
    'form2.tProjectFinancePays': {
      handler(newVal, oldVal) {
        /!*this.form2.fpayamt = newVal*!/
        this.form2.tProjectFinancePays.forEach((item)=>{
          if (!item.fpayamt && typeof(item.fpayamt)!="undefined" && item.fpayamt!=0) {
          }
        });
      },
    },*/
  },
  mounted() {
    this.form = this.$options.data().form;
    this.form2 = this.$options.data().form2;
    this.form3 = this.$options.data().form3;
    this.form4 = this.$options.data().form4;
    this.getDictType();
    this.getUsersArray();
    this.getSalePrj();
    this.getDutyArray();
    this.getCustomDictArray();
    this.getOrganizationsArray();
    this.getSupplier();
    this.getProduction();
    if (this.listInfo) {
      this.form = this.listInfo
      this.getProjectFinance();
      this.getProjectOperationMessage();
      this.getProjectMaterial();
      /*this.form.tProjectDetails = JSON.parse(this.tProjectDetails)*/
      this.form.fdesigner = this.form.fdesigner.split(",");
      this.form.fsaledept = this.form.fsaledept.split(",");
      this.form.fsaller = this.form.fsaller.split(",");
      this.form.fservicedeptid = this.form.fservicedeptid.split(",");
      this.form.fservicer = this.form.fservicer.split(",");
    }
  },
  methods: {
    onCount1(val) {
      console.log(val)
      console.log(1233)
      let number = 0;
      let fnumber = 0;
      this.form2.tProjectFinanceRecs.forEach((item)=>{
        if (typeof(item.frecamt)!="undefined" && item.fpayamt!=0) {
          console.log(item.frecamt<0)
          if(item.frecamt<0){
            fnumber+=parseInt(item.frecamt)
          }else{
            number+=parseInt(item.frecamt)
          }
        }
      });
      console.log(fnumber)
      this.form2.fallamt=number
      this.form2.fretamt=fnumber
    },
    onCount2(row) {
      console.log(row)
      console.log(1231113)
      let number = 0;
      this.form2.tProjectFinancePays.forEach((item)=>{
        if (typeof(item.fpayamt)!="undefined" && item.fpayamt!=0) {
          number+=parseInt(item.fpayamt)
        }
      });
      this.form2.fpayamt=number
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fname: query});
      } else {
        this.usersList = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getOrganizationsArray({fdeptname: query});
      } else {
        this.organizationsList = [];
      }
    },
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        this.getCustomDictArray({fname: query});
      } else {
        this.customList = [];
      }
    },
    remoteMethod4(query) {
      if (query !== '') {
        this.loading = true;
        this.getSupplier({fname: query});
      } else {
        this.supplierList = [];
      }
    },
    remoteMethod5(query) {
      if (query !== '') {
        this.loading = true;
        this.getSalePrj({fname: query});
      } else {
        this.salePrjList = [];
      }
    }, remoteMethod6(query) {
      if (query !== '') {
        this.loading = true;
        this.getProduction({fname: query});
      } else {
        this.productionList = [];
      }
    }, remoteMethod7(query) {
      if (query !== '') {
        this.loading = true;
        this.getDictList({fname: query});
      } else {
        this.dictList = [];
      }
    },
    changeProductionUser(val, row) {
      this.supplierList.forEach((item) => {
        if (item.fname == val) {
          row.faccount = item.faccout
        }
      })
    }, changeCustom(val) {
      this.customList.forEach((item) => {
        if (item.fname == val) {
          this.form.fgender = item.fsex
          this.form.fage = item.fage
        }
      })
    },
    changeProduction(val, row) {
      this.productionList.forEach((item) => {
        if (item.fname == val) {
          row.fprodtype = item.ftype
          row.fqty = item.fqt
          row.fsingleamt = item.fprice
          row.fallamt = item.fperiodprice
        }
      })
    }, changeProduction2(val, row) {
      this.productionList.forEach((item) => {
        if (item.fname == val) {
          row.fprojecttype = item.ftype
        }
      })
    }, changeProduction3(val, row) {
      this.productionList.forEach((item) => {
        if (item.fname == val) {
          row.fspec = item.fprjectno
          row.fprice = item.fpurcost
        }
      })
    },
    changeFServicer(val) {
      this.form.fservicedeptid = []
      for (var item in this.userList) {
        for (var items in val) {
          if (this.userList[item].fname == val[items]) {
            if (this.form.fservicedeptid == null) {
              this.form.fservicedeptid = []
            }
            if (this.form.fservicedeptid.indexOf(this.userList[item].fdept) == -1) {
              this.form.fservicedeptid.push(this.userList[item].fdept)
            }
          }
        }
      }
    },
    changeFSaller(val) {
      this.form.fsaledept = []
      for (var item in this.userList) {
        for (var items in val) {
          if (this.userList[item].fname == val[items]) {
            if (this.form.fsaledept == null) {
              this.form.fsaledept = []
            }
            if (this.form.fsaledept.indexOf(this.userList[item].fdept) == -1) {
              this.form.fsaledept.push(this.userList[item].fdept)
            }
          }
        }
      }
    },
    myclass({row, columnIndex}) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null) {
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
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    handleSelectionChange3(val) {
      this.multipleSelection3 = val
    },
    handleSelectionChange4(val) {
      this.multipleSelection4 = val
    },
    handleSelectionChange5(val) {
      this.multipleSelection5 = val
    },
    delRow1() {
      if (this.multipleSelection1.length > 0) {
        this.multipleSelection1.forEach((item) => {
          this.form.tProjectDetails.splice(this.form.tProjectDetails.indexOf(item), 1)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    }, delRow2() {
      if (this.multipleSelection2.length > 0) {
        this.multipleSelection2.forEach((item) => {
          this.form2.tProjectFinanceRecs.splice(this.form2.tProjectFinanceRecs.indexOf(item), 1)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    }, delRow3() {
      if (this.multipleSelection3.length > 0) {
        this.multipleSelection3.forEach((item) => {
          this.form2.tProjectFinancePays.splice(this.form2.tProjectFinancePays.indexOf(item), 1)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    }, delRow4() {
      if (this.multipleSelection4.length > 0) {
        this.multipleSelection4.forEach((item) => {
          this.form3.tProjectOperations.splice(this.form3.tProjectOperations.indexOf(item), 1)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    }, delRow5() {
      if (this.multipleSelection5.length > 0) {
        this.multipleSelection5.forEach((item) => {
          this.form4.tProjectMaterials.splice(this.form4.tProjectMaterials.indexOf(item), 1)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    setRow2() {
      var itemObj = {
        frecdate: "",
        frecno: "",
        fbillid: this.form.fid,
        freceiver: "",
        frecamt: "",
        frectype: "",
        fcollectiontype: "",
        fprjno: "",
        fnote: "",
        sfkgg: true,
        sfcb: null,
      }
      this.form2.tProjectFinanceRecs.push(itemObj)
    },
    setRow3() {
      var itemObj = {
        fpaydate: "",
        fbillid: this.form.fid,
        fphone: "",
        fcustomer: "",
        fpayamt: "",
        fpaytype: "",
        faccount: "",
        fnote: "",
        sfkgg: true,
        sfcb: null,
      }
      this.form2.tProjectFinancePays.push(itemObj)
    },
    setRow4() {
      var itemObj = {
        faid: "",
        fbillid: this.form.fid,
        faneser: "",
        fanestype: "",
        fbegintime: "",
        fdoctor: "",
        fendtime: "",
        finvalue: "",
        finvalue2: "",
        fitinerantnurse: "",
        fitinerantnurse2: "",
        fmatchingnurse: "",
        fmnvalue: "",
        fnote: "",
        foffsit: "",
        foperdate: "",
        foperdept: "",
        foperid: "",
        foperpart: "",
        fpordid: "",
        fprojectnumber: "",
        fprojecttype: "",
        fqty: "",
        frecorder: "",
        fvisitingnurse: "",
        fvnvalue: "",
        sfkgg: true,
        sfcb: null,
      }
      this.form3.tProjectOperations.push(itemObj)
    },
    setRow5() {
      var itemObj = {
        fprodid: "",
        fbillid: this.form.fid,
        fspec: "",
        fqty: "",
        fnote: "",
        fprice: "",
        sfkgg: true,
        sfcb: null,
      }
      this.form4.tProjectMaterials.push(itemObj)
    },
    delRow() {

    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          /*this.form.tProjectDetails = JSON.stringify(this.tProjectDetails)*/
          let params = {...this.form}
          params.fdesigner = params.fdesigner.join(',');
          params.fsaledept = params.fsaledept.join(',');
          params.fsaller = params.fsaller.join(',');
          params.fservicedeptid = params.fservicedeptid.join(',');
          params.fservicer = params.fservicer.join(',');
          params.tProjectDetails.forEach((item) => {
            delete item.fid
          })
          addProject(params).then(res => {
            if (res.flag) {
              this.$emit('uploadList')
              this.$confirm('是否关闭窗口', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$emit('hideDialog', false)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }
          })

        } else {
          return false
        }
      })
    }, saveData2(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form2}
          params.fbillid = this.form.fid
          params.tProjectFinancePays.forEach((item) => {
            delete item.fid
          })
          params.tProjectFinanceRecs.forEach((item) => {
            delete item.fid
          })
          if (this.form.fid) {
            addProjectFinance(params).then(res => {
              if (res.flag) {
                this.$emit('uploadList')
                this.$confirm('是否关闭窗口', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$emit('hideDialog', false)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '请先保存项目'
            });
          }
        } else {
          return false
        }
      })
    },
    saveData3(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form3}
          params.fbillid = this.form.fid
          params.tProjectOperations.forEach((item) => {
            delete item.fid
          })
          if (this.form.fid) {
            addProjectOperation(params).then(res => {
              if (res.flag) {
                this.$emit('uploadList')
                this.$confirm('是否关闭窗口', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$emit('hideDialog', false)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '请先保存项目'
            });
          }
        } else {
          return false
        }
      })
    },
    saveData4(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form4}
          params.tProjectMaterials.forEach((item) => {
            delete item.fid
          })
          if (this.form.fid) {
            addProjectMaterial(params.tProjectMaterials).then(res => {
              if (res.flag) {
                this.$emit('uploadList')
                this.$confirm('是否关闭窗口', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$emit('hideDialog', false)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '请先保存项目'
            });
          }
        } else {
          return false
        }
      })
    },
    getProjectFinance(val = {fbillid: this.form.fid}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getProjectFinanceList(data, val).then(res => {
        if (res.data.records.length > 0) {
          this.form2 = res.data.records[0]
        }
      });
    }, getProjectOperationMessage(val = {fbillid: this.form.fid}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getProjectOperationMessageList(data, val).then(res => {
        if (res.data.records.length > 0) {
          this.form3 = res.data.records[0]
        }
      });
    }, getProjectMaterial(val = {fbillid: this.form.fid}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getProjectMaterialList(data, val).then(res => {
        if (res.data.records.length > 0) {
          this.form4.tProjectMaterials = res.data.records
        }
      });
    },
    getSalePrj(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getSalePrjList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.salePrjList = res.data.records
        }
      });
    },
    getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    }, getDictType(val = {ftypeid: 6}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDictList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.dictList = res.data.records
        }
      });
    },
    getProduction(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getProductionList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.productionList = res.data.records
        }

      });
    }, getSupplier(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getSupplierList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.supplierList = res.data.records
        }

      });
    }, getProductionTypeArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getProductionTypeList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.productionTypeList = res.data.records
        }

      });
    },
    getDutyArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDutyList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.dutyList = res.data.records
        }

      });
    },
    getOrganizationsArray(val = {}, data = {

      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
    },
    getCustomDictArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getCustomDictList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.customList = res.data.records
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
