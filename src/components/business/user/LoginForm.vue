<template>
  <div id="login_wrap">
    <el-button plain @click="dialogVisible = true">
      点击登录
    </el-button>
  <div>
    <el-dialog
      title="登录"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
        <div id="wrap">
            <div class="slider-wrap">
              <el-tabs v-model="active" @tab-click="handleClick">
                <el-tab-pane label="账号密码登录" name="0">
                  <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机验证码登录" name="1">
                  <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                    <el-form-item label="手机号" prop="phone">
                      <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                      <el-input v-model="form.code"></el-input>
                      <el-button type="primary" @click="getCode" :disabled="codeDisabled">{{ codeText }}</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
        </div>
    </el-dialog>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox} from 'element-plus'

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
  //height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  //.el-tabs__header {
  //  border: none;
  //}
  //.el-tabs__item {
  //  padding: 0 20px;
  //}
  //.el-tabs__content {
  //  padding: 20px;
  //}
  //.el-tabs__pane {
  //  padding: 20px;
  //}

}

//.slider-wrap {
//  margin-left: 35px;
//  width: 240px;
//}
</style>