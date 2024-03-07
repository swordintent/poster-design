// authMixin.js
import store from '@/store'
export default {
    methods: {
        checkLoginAndAct(action: any) {
            if (store.getters.online) {
                action();
            } else {
                store.dispatch('toggleLoginDialog', true);
            }
        }
    }
}
