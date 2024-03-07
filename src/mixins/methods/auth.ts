// authMixin.js
import store from '@/store'
import {useStore} from "vuex";

export default {
    methods: {
        async checkLoginAndAct(action: Function | undefined, ...args: any[]) {
            const store = useStore();

            if (store.getters.online) {
                if (typeof action === 'function') {
                    await action(...args); // 支持异步函数并传递参数
                }
            } else {
                store.dispatch('toggleLoginDialog', true);
            }
        }
    }
}
