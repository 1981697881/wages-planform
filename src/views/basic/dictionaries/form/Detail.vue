<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成类型'" prop="jobNum">
            <el-input v-model="form.jobNum" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="username">
            <el-input v-model="form.username" :readOnly="visible"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="jobNum">
            <el-input v-model="form.jobNum" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'描述'" prop="username">
            <el-input v-model="form.username" :readOnly="visible"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import { addUsers, alterUsers, getUsersTree, getUsersInfo, getMenuList } from '@/api/system/index'
import { getClerkList } from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: [],

      value: false,
      Checkeds: [],
      form: {
        uid: null,
        username: null, // 名称
        eid: null,
        jobNum: null,
        description: null
      },
      columns: [
        { text: '用户组', name: 'gpName' },
        { text: 'gpLevel', name: 'gpLevel', default: false },
        { text: 'isDel', name: 'isDel', default: false },
        { text: 'gpId', name: 'gpId', default: false }
      ],
      activeName: 'first',
      pidS: [],
      list: [],
      visible: false,
      rules: {
        username: [
          { required: true, message: '请输入名稱', trigger: 'blur' }
        ],
        jobNum: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        eid: [
          { required: true, message: '请选择职员', trigger: 'change' }
        ]

      },
      multipleSelection: [],
      levelFormat: []
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    changeCheck(val) {
      const levelFormat = this.levelFormat
      levelFormat.forEach((item, index) => {
        if (val == item.eid) {
          this.form.jobNum = item.jobNum
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getChecked() {
      let array = this.$refs.tree1.getCheckedKeys()
      return array
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          let obj = this.form
          let mids = []
          let gids = []
          this.multipleSelection.forEach(function(item, index) {
            gids.push(item.gpId)
          })
          if (obj.status = '正常状态') {
            obj.status = 0
          } else if (obj.status = '冻结') {
            obj.status = 1
          } else if (obj.status = '禁用') {
            obj.status = 2
          } else if (obj.status = '禁言') {
            obj.status = 3
          } else if (obj.status = '敏感用户') {
            obj.status = 4
          }
          obj.gids = gids
          obj.mids = this.getChecked()
          if (typeof (this.form.uid) != undefined && this.form.uid != null) {
            alterUsers(obj).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          } else {
            addUsers(obj).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          }
        } else {
          return false
        }
      })

    },
    factchGroup() {
      this.loading = true
      getUsersTree().then(res => {
        if (res.flag) {
          this.loading = false
          this.list = res.data
          if (this.listInfo) {
            this.visible = true
            this.fetchData(this.listInfo.uid)
          }
        }

      })
    },
    fetchFormat() {
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 1500
      }
      getClerkList(data, { disable: false }).then(res => {
        this.levelFormat = res.data.records
      })
    },
    fetchMenu() {
      getMenuList().then(res => {
        this.data = res.data.treeVoList
      })
    },
    fetchData(val) {
      getUsersInfo(val).then(res => {
        if (res.flag) {
          this.form = res.data
          let rows = this.list
          let group = res.data.gids
          this.Checkeds = res.data.mids
          if (rows) {
            rows.forEach(row => {
              for (const i in group) {
                if (row.gpId == group[i]) {
                  this.$refs.multipleTable.toggleRowSelection(row)
                }
              }
            })
          } else {
            this.$refs.multipleTable.clearSelection()
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
