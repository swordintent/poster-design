<template>

    <div id="loginWrap">
      <!-- 未登录时显示的登录按钮 -->
      <el-button v-if="!isLoggedIn" @click="visible = true">登录/注册</el-button>
      <!-- 登录后显示的用户信息 -->
      <div v-else class="user-info">
        <el-avatar :src="userInfo.avatar"></el-avatar>
        <span>{{ userInfo.name }}</span>
      </div>
      <teleport to="body">
      <!-- 登录/注册弹窗 -->
        <el-dialog v-model="visible" title="登录/注册">
          <!-- 登录表单 -->
          <div v-if="isLogin" class="form-container">
            <el-form :model="loginForm">
              <el-form-item label="用户名">
                <el-input v-model="loginForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
            </el-form>
            <div class="form-footer">
              <el-button link @click="toggleForm">注册账号</el-button>
              <el-button type="primary" @click="handleLogin">登录</el-button>
            </div>
          </div>
          <!-- 注册表单 -->
          <div v-else class="form-container">
            <el-form :model="registerForm">
              <el-form-item label="用户名">
                <el-input v-model="registerForm.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="registerForm.password"></el-input>
              </el-form-item>
            </el-form>
            <div class="form-footer">
              <el-button link @click="toggleForm">已有账号？</el-button>
              <el-button type="primary" @click="handleRegister">注册</el-button>
            </div>
          </div>
        </el-dialog>
      </teleport>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElAvatar,ElDialog, ElMessageBox , ElForm, ElFormItem, ElMessage} from 'element-plus';
import api from "@/api";
import { useStore } from 'vuex'

const isLogin = ref(true);
const isLoggedIn = ref(false);
const userInfo = reactive({ avatar: '', name: '' });

const loginForm = reactive({ username: '', password: '' });
const registerForm = reactive({ username: '', email: '', password: '' });
const store = useStore();
onMounted(() => {
  checkLoginStatus();
});
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const checkLoginStatus = () => {
  // 这里是示例逻辑，你需要根据实际情况来检查登录状态
  const token = api.login.getUserInfo().then(response => {
    if(response.uid > 0){
      setToLogin(response);
    }
  });
};

const visible = computed({
  get() {
    return store.state.showLoginDialog;
  },
  set(value) {
    store.dispatch('toggleLoginDialog', value);
  },
});

function setToLogin(response) {
  isLoggedIn.value = true;
  userInfo.avatar = response.avatar ? response.avatar : 'path/to/avatar.jpg'; // 示例头像路径
  userInfo.name = response.username ? response.username :'用户'; // 示例昵称
  visible.value = false;
  console.log('changeOnlineSetting');
  store.commit('changeOnline', true);
}

const handleLogin = () => {
  // 实现登录逻辑
  console.log('登录信息', loginForm);
  api.login.login({
    mail: loginForm.email,
    password: loginForm.password,
  }).then(response => {
    // 登录成功，处理响应数据
    console.log('登录成功', response);
    // 检查响应头中的authorization
    if (response.uid > 0) {
      setToLogin(response);
      ElMessage({
        message: '登录成功' + localStorage.getItem('xp_token'),
        type: 'success',
      })
    }else {
      ElMessageBox.alert("登录失败，用户名或密码错误", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      });
    }
  }).catch(error => {
    // 登录失败，处理错误
    ElMessageBox.alert("登录失败，网络错误" + error, "提示", {
      confirmButtonText: "确定",
      type: "warning",
    });
  })
};

const handleRegister = () => {
  // 实现注册逻辑
  console.log('注册信息', registerForm);
  // 假设注册成功
  visible.value = false;
};

</script>

<style lang="less" scoped >
#loginWrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-info span {
  margin-left: 10px;
}
.form-container {
  margin-bottom: 20px;
}
.form-footer {
  text-align: right;
}
</style>
