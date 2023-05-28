<template>
  <div class="app-list">
    <a-tree ref="tree" @showList="handlerList" class="list-tree" />
    <div class="list-container">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @delList="delList" @delGroup="delGroup" @uploadAll="uploadAll" @queryBtn="query" @showGroupDialog="groupDialog"  />
      </div>
      <list ref="list" @showDialog="handlerDialog" />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="用户信息"
      v-if="visible"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="工资表信息"
      v-if="visible2"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <group-d @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></group-d>

    </el-dialog>
  </div>
</template>

<script>
import { ATree, TabsBar, List } from "./components";
import { Info, GroupD } from "./form";
export default {
  components: {
    ATree,
    TabsBar,
    List,
    GroupD,
    Info
  },
  data() {
    return {
      visible: null,
      gpInfo: null,
      listInfo: null,
      visible2: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.tree.fetchData()
    /*this.$refs.list.fetchData()
    */
  },
  methods: {
    hideWindow(val) {
      this.visible = val

    },
    handlerList(val) {
      console.log(val)
      this.$refs.list.fetchHead({fid: val.fid})
    },
    hideGroupWindow(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    groupDialog(obj) {
      this.gpInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.gpInfo = info
      }
      this.visible2 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr()
    },
    // 更新列表
    uploadAll() {

      this.$refs.tree.fetchData()
      //this.$refs.list.uploadPr()
    },
    // 更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList(val) {
      if(val) {
        this.$refs.list.Delivery(val)
      }
    },// 查询
    query() {
      /*this.$refs.list.uploadPr(this.$refs.tabs.qFilter())*/
    },
    delGroup(val) {
      if(val) {
        this.$refs.tree.Delivery(val)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
