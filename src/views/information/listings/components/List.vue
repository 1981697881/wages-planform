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
import { getProjectList, deleteProject } from '@/api/information/index'
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
        { text: '开单日期', name: 'companyName' },
        { text: '设计单编号', name: 'telephone' },
        { text: '科室', name: 'officialWebsite' },
        { text: '顾客姓名', name: 'companyAddress' },
        { text: '负责老师', name: 'remark' },
        { text: '是否PV', name: 'status' },
        { text: '项目范围', name: 'status' },
        { text: '成交金额', name: 'status' },
        { text: '定金', name: 'status' },
        { text: '已收款', name: 'status' },
        { text: '未收款', name: 'status' },
        { text: '退款', name: 'status' },
        { text: '已付款', name: 'status' },
        { text: '备注', name: 'status' }
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
      deleteProject(val).then(res => {
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
      getProjectList(data, val).then(res => {
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
