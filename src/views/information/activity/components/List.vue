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
import { getSalePrjList, deleteSalePrj } from '@/api/information/index'
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
        { text: '方案号', name: 'fnumber' },
        { text: '方案名称', name: 'fname' },
        { text: '方案内容', name: 'fdesc' },
        { text: '部门', name: 'fdeptid' },
        { text: '开始日期', name: 'fstartdate' },
        { text: '结束日期', name: 'fenddate' },
        { text: '卡项金额', name: 'famount' },
        { text: '门店奖励', name: 'fshopreward' },
        { text: '返款比例', name: 'frewardrate' },
        { text: '销售人员奖励', name: 'fsalerreward' },
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
      deleteSalePrj(val).then(res => {
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
      this.loading = true
      getSalePrjList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh/2 - 130px);
  }
</style>
