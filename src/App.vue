<!--
 * @Author: ShawnPhang
 * @Date: 2023-09-18 17:34:44
 * @Description:  
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2023-09-20 16:10:58
-->
<template>
  <div id="appindex">
    <div class="viewWrap">
      <router-view />
    </div>
  </div>
  <div id="login_wrap">
    <el-button plain @click="dialogVisible = true">
      Click to open the Dialog
    </el-button>

    <el-dialog v-model="dialogVisible" title="裁剪图片" width="80%" :before-close="handleClose" >
      <div id="wrap"  style="height: 50vh">
        asd
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button >取消</el-button>
        <el-button >确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox, ElDialog } from 'element-plus'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
</script>

<style lang="less">
#login_wrap {
  display: flex;
  align-items: center;
}
//:deep(.el-dialog__body) {
//  padding: 0 !important;
//}
//:deep(.el-dialog__header) {
//  padding: 10px 35px;
//  // var(--el-dialog-padding-primary)
//}
#wrap {
  display: flex;
  align-items: center;
}
// .tool-left {
//   display: inline-flex;
//   flex: 1;
// }
.slider-wrap {
  margin-left: 35px;
  width: 240px;
}
#appindex {
  min-width: 1180px;
  .viewWrap {
    min-height: calc(110vh - 110px);
    min-width: 1170px;
  }
}
</style>
