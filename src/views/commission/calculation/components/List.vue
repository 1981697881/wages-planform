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
        { text: '月份', name: 'companyName' },
        { text: '部门', name: 'telephone' },
        { text: '职位', name: 'officialWebsite' },
        { text: '姓名', name: 'companyAddress' },
        { text: '成交金额', name: 'remark' },
        { text: '返款', name: 'remark' },
        { text: '介绍费', name: 'remark' },
        { text: '耗材成本', name: 'remark' },
        { text: '麻醉成本', name: 'remark' },
        { text: '店家奖励', name: 'remark' },
        { text: '打板金提成扣款', name: 'remark' },
        { text: '返款状态', name: 'remark' },
        { text: '实际回款', name: 'remark' },
        { text: '底薪', name: 'remark' },
        { text: '业绩提成比例', name: 'remark' },
        { text: '业绩提成', name: 'remark' },
        { text: '部门提成比例', name: 'remark' },
        { text: '部门提成', name: 'remark' },
        { text: '带教提成', name: 'remark' },
        { text: '打板提成', name: 'remark' },
        { text: '操作提成', name: 'remark' },
        { text: '成交项目编码', name: 'remark' },
        { text: '提成小计', name: 'remark' },
        { text: '预留保证金', name: 'remark' },
        { text: '发放保证金月份', name: 'remark' },
        { text: '发放保证金', name: 'remark' },
        { text: '上期发放差额', name: 'remark' },
        { text: '本月退款金额', name: 'remark' },
        { text: '重算差额', name: 'remark' },
        { text: '应发提成', name: 'remark' },
        { text: '实发提成', name: 'remark' },
        { text: '发放差额', name: 'remark' },
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
