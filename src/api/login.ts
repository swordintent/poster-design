import fetch from '@/utils/axios'

//登录
export const login = (params: Type.Object = {}) => fetch('login', params, 'post')

//注册
export const register = (params: Type.Object = {}) => fetch('register', params, 'post')


