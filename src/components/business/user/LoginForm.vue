<template>
  <div id="login_wrap">
    <el-button plain @click="dialogVisible = true">
      点击登录
    </el-button>
  <div>
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
        <div>
          <div id="wrap">
            <div class="slider-wrap">
              <el-tabs v-model="active" @tab-click="handleClick">
                <el-tab-pane label="账号密码登录" name="0">
                  <LoginForm />
                </el-tab-pane>
                <el-tab-pane label="手机验证码登录" name="1">
                  <PhoneLogin />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
    </el-dialog>
  </div>
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
<style scoped lang="less">
#login_wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#wrap {
  display: flex;
  align-items: center;
}

.slider-wrap {
  margin-left: 35px;
  width: 240px;
}
</style>