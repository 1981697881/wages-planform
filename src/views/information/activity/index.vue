<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialogT" @showWriteoff="handlerWriteoff" @delList="delivery"  @queryBtn="query1" @uploadList="upload1"/>
      </div>
      <list ref="list"  @showDialog="handlerDialogT" @uploadList="uploadPage"/>
    </div>
    <div class="list-containerOther">
      <div>
        <tabs-bar-t ref="tabst" @showDialog="handlerDialogTh" @delList="delivery"  @queryBtn="query2" @uploadList="upload2"/>
      </div>
      <list-t ref="listt"  @showDialog="handlerDialogTh" @uploadList="uploadPage"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="核销记录"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload1" :listInfo="listInfo"></info>
    </el-dialog><el-dialog
      :visible.sync="visible1"
      title="基本信息"
      v-if="visible1"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info-t @hideDialog="hideWindow" @uploadList="upload1" :listInfo="listInfo"></info-t>
    </el-dialog><el-dialog
      :visible.sync="visible2"
      title="基本信息"
      v-if="visible2"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info-th @hideDialog="hideWindow" @uploadList="upload2" :listInfo="listInfo"></info-th>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar,TabsBarT, List, ListT} from "./components";
import { Info,InfoT,InfoTh } from "./form";

export default {
  components: {
    TabsBar,
    TabsBarT,
    List,
    ListT,
    Info,
    InfoT,
    InfoTh,
  },
  data() {
    return {
      visible: null,
      visible1: null,
      visible2: null,
      listInfo: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    this.$refs.listt.fetchData(this.$refs.tabst.qFilter())
  },
  methods: {
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    },
    hideWindow(val) {
      this.visible = val
      this.visible1 = val
      this.visible2 = val
    },
    handlerDialogT(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible1 = true
    },handlerDialogTh(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    handlerWriteoff(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 查询
    query1() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    }, query2() {
      this.$refs.listt.fetchData(this.$refs.tabst.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload1(){
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }, // 更新列表
    upload2(){
      this.$refs.listt.uploadPr(this.$refs.tabst.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
