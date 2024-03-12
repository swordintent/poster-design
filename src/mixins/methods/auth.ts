// authMixin.js
import store from '@/store'

export default {
    methods: {
        async checkLoginAndAct(action: Function | undefined, ...args: any[]) {

            if (store.getters.online) {
                if (typeof action === 'function') {
                    await action(...args); // 支持异步函数并传递参数
                }
            } else {
                await store.dispatch('toggleLoginDialog', true);
            }
        }
    }
}
