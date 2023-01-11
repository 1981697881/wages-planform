<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />

  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getCompanyList, deleteCompany } from '@/api/basic/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: '档案号', name: 'companyName' },
        { text: '客户姓名', name: 'telephone' },
        { text: '客户电话', name: 'officialWebsite' },
        { text: '开单日期', name: 'companyAddress' },
        { text: '设计单号', name: 'remark' },
        { text: '服务部门', name: 'remark' },
        { text: '服务老师', name: 'remark' },
        { text: '业务员', name: 'remark' },
        { text: '业务部门', name: 'remark' },
        { text: '门店', name: 'remark' },
        { text: '成交金额', name: 'remark' },
        { text: '项目名称', name: 'remark' },
        { text: '数量', name: 'remark' },
        { text: '已操作数量', name: 'remark' },
        { text: '取消数量', name: 'remark' },
        { text: '剩余数量', name: 'remark' },
        { text: '耗材销售人员', name: 'remark' },
        { text: '备注', name: 'remark' },
        { text: '项目状态', name: 'status' }
      ]
    }
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    Delivery(val) {
      deleteCompany(val).then(res => {
        if (res.flag) {
          this.$store.dispatch('list/setClickData', '')
          this.$emit('uploadList')
        }
      })
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      /*this.loading = true
      getCompanyList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })*/
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
