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
  <LoginForm />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import LoginForm from '@/components/business/user/LoginForm.vue'

export default defineComponent({
  components: {LoginForm}
})


</script>
<style lang="less">
#appindex {
  min-width: 1180px;
  .viewWrap {
    min-height: calc(110vh - 110px);
    min-width: 1170px;
  }
}
</style>
