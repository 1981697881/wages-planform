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
import { getTuserList, deleteTuser } from '@/api/basic/index'
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
        { text: '工号', name: 'fnumber' },
        { text: '用户名称', name: 'fname' },
        { text: '联系电话', name: 'fphone' },
        { text: '邮箱', name: 'tel' },
        { text: '岗位', name: 'tel' },
        { text: '职位(角色)', name: 'fduty' },
        { text: '部门', name: 'fdept' },
        { text: '带教老师', name: 'fteacher' },
        { text: '上级领导', name: 'fheader' },
        { text: '下级职员', name: 'tel' },
        { text: '入职日期', name: 'fjoindate' },
        { text: '转正日期', name: 'fregulardate' },
        { text: '离职日期', name: 'fdeparturedate' },
        { text: '描述', name: 'remark' },
      ]
    }
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    Delivery(val) {
      deleteTuser(val).then(res => {
        if (res.flag) {
          this.$store.dispatch('list/setClickData', '')
          this.$emit('uploadList')
        }
      })
    },
    //监听单击某一行
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
      getTuserList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
