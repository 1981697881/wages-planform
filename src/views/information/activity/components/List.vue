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
        { text: '方案号', name: 'companyName' },
        { text: '方案名称', name: 'telephone' },
        { text: '方案内容', name: 'officialWebsite' },
        { text: '部门', name: 'companyAddress' },
        { text: '开始日期', name: 'remark' },
        { text: '结束日期', name: 'status' },
        { text: '卡项金额', name: 'status' },
        { text: '门店奖励', name: 'status' },
        { text: '返款比例', name: 'status' },
        { text: '销售人员奖励', name: 'status' },
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
    height: calc(100vh/2 - 130px);
  }
</style>
