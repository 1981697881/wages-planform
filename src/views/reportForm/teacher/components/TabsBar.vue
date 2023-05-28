<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-col :span="5" style="display: inline-block">
        <el-form-item :label="''">
          <el-date-picker
            style="width: 100%"
            v-model="value"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <!--<el-col :span="4">
        <el-form-item :label="''" >
          <el-select v-model="fapplicabledepartment" placeholder="部门">
            <el-option
              v-for="item in organizationsList"
              :key="item.fid"
              :label="item.fdeptname"
              :value="item.fdeptname">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>-->
      <el-col :span="2">
        <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
      </el-col>
      <el-button-group style="float:right">
        <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary"
                    :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}
         </el-button>-->
        <!--@click="printer"-->
        <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import { getToken } from '@/utils/auth'
import { getOrganizationsList } from '@/api/basic/index'
export default {
  components: {
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value: '',
      organizationsList: [],
      btnList: [],
      headers: {
        'authorization': getToken('waprx')
      },
      fileUrl: '',
      search: {
        name: '',
        fapplicabledepartment: '',
        type: 1
      }
    }
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  mounted() {
    this.getOrganizationsArray()
    /*let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })*/
  },
  methods: {
    getOrganizationsArray(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      getOrganizationsList(data, val).then(res => {
        this.organizationsList = res.data.records
      });
    },
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.cinemaName != null && this.search.cinemaName != '' ? obj.cinemaName = this.search.cinemaName : null
      return obj
    },
    onFun(method, event) {
      this[method](event)
    },
    handlerAdd() {
      this.$emit('showShipDialog')
    },
    upload() {
      this.$emit('uploadList')
    },
    del() {
      if (this.selections.length > 0) {
        this.$confirm('是否删除，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var idArray = []
          this.selections.forEach((item) => {
            idArray.push({id: item.id})
          })
          this.$emit('del', idArray)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.fid) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style>
</style>
