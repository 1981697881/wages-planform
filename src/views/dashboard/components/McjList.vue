<template>
  <div style="display: flex">
    <list
      style="flex: 1"
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @dblclick="dblclick"
      @row-click="rowClick"
    />
    <list
      style="flex: 1;padding-right: 10px"
      class="list-main box-shadow"
      :columns="columns2"
      :loading="loading"
      :list="list2"
      index
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import List from '@/components/List'

  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: {
          records: [{
        cn: '华中',
        eur1: 'A',
        eur2: '2304-原味开心果480g',
        eur3: '12000',
        eur4: '500000',
      },{
        cn: '华中',
        eur1: 'B',
        eur2: '2361-碧根果220g',
        eur3: '12141',
        eur4: '530000',
      },{
        cn: '华中',
        eur1: 'C',
        eur2: '2308-紫皮腰果220g',
        eur3: '10000',
        eur4: '352000',
      },{
        cn: '华南',
        eur1: 'D',
        eur2: '2350-综合果仁380g',
        eur3: '9612',
        eur4: '24300',
      },{
        cn: '华北',
        eur1: 'E',
        eur2: '2325-盐焗巴旦木果仁500g',
        eur3: '64900',
        eur4: '765120',
      },{
        cn: '华西',
        eur1: 'F',
        eur2: '2326-甄选。坚果礼1850g',
        eur3: '16219',
        eur4: '481000',
      },{
        cn: '华南',
        eur1: 'G',
        eur2: '2326-缤纷。坚果礼1410g',
        eur3: '35140',
        eur4: '485134',
      },{
        cn: '华南',
        eur1: 'H',
        eur2: '2339-黑加仑葡萄干750g',
        eur3: '19663',
        eur4: '359000',
      },{
        cn: '华南',
        eur1: 'J',
        eur2: '2303-原味开心果360g',
        eur3: '18002',
        eur4: '298461',
      },{
        cn: '华南',
        eur1: 'K',
        eur2: '2306-原味开心果400g',
        eur3: '56409',
        eur4: '806011',
      }]
    },list2: {
          records: [{
        eur1: '2023/02/10',
        eur2: 'A',
        eur3: '12000',
        eur4: '500000',
      },{
        eur1: '2023/02/10',
        eur2: 'B',
        eur3: '12141',
        eur4: '530000',
      },{
        eur1: '2023/02/10',
        eur2: 'C',
        eur3: '10000',
        eur4: '352000',
      },{
        eur1: '2023/02/10',
        eur2: 'D',
        eur3: '9612',
        eur4: '24300',
      },{
        eur1: '2023/02/10',
        eur2: 'E',
        eur3: '64900',
        eur4: '765120',
      },{
        eur1: '2023/02/10',
        eur2: '2326-甄选。坚果礼1850g',
        eur3: '16219',
        eur4: '481000',
      },{
        eur1: '2023/02/10',
        eur2: '2326-缤纷。坚果礼1410g',
        eur3: '35140',
        eur4: '485134',
      },{
        eur1: '2023/02/10',
        eur2: '2339-黑加仑葡萄干750g',
        eur3: '19663',
        eur4: '359000',
      },{
        eur1: '2023/02/10',
        eur2: '2303-原味开心果360g',
        eur3: '18002',
        eur4: '298461',
      },{
        eur1: '2023/02/10',
        eur2: '2306-原味开心果400g',
        eur3: '56409',
        eur4: '806011',
      }]
    },
        columns: [
          { text: '购货单位', name: 'eur1' },
          { text: '产品名称', name: 'eur2' },
          { text: '实发数量', name: 'eur3' },
          { text: '实发金额', name: 'eur4' }
        ], columns2: [
          { text: '日期', name: 'eur1' },
          { text: '购货单位', name: 'eur2' },
          { text: '合计数量', name: 'eur3' },
          { text: '合计金额', name: 'eur4' }
        ]
      };
    },
    methods: {
      ExportData() {
        import('@/vendor/Export2Excel').then(excel => {
          // 表格的表头列表
          const columns = this.columns
          const tHeader = []
          // 与表头相对应的数据里边的字段
          const filterVal = []
          columns.forEach((item, index) => {
            tHeader.push(item.text)
            filterVal.push(item.name)
          })
          const list = this.list.records
          const data = this.formatJson(filterVal, list);
          // 这里还是使用export_json_to_excel方法比较好，方便操作数据
          excel.export_json_to_excel([tHeader],data,'主营业务成品线效率表')
        })
      },
      formatJson(filter, jsonDate){
        return jsonDate.map(v =>
          filter.map(j => {
            return v[j]
          })
        )
      },
      uploadPr(val) {
        this.fetchData(val.columns, val.array)
      },
      dblclick(obj) {
        // this.$emit('showDialog',obj.row)
      },
      // 监听单击某一行
      rowClick(obj) {
        this.$store.dispatch('list/setClickData', obj.row);
      },

      fetchData(val) {
        this.loading = true
        this.columns = val.columns
        this.list = { records: val.array2 }
        this.loading = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: 213px;
  }
</style>
