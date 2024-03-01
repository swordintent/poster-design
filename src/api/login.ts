import fetch from '@/utils/axios'

//登录
export const login = (params: Type.Object = {}) => fetch('login', params, 'post')

//注册
export const register = (params: Type.Object = {}) => fetch('register', params, 'post')

// //获取验证码
// export const getCode = (params: Type.Object = {}) => fetch('get_code', params, 'post')
//
// //忘记密码
// export const forgetPassword = (params: Type.Object = {}) => fetch('forget_password', params, 'post')
//
// //修改密码
// export const changePassword = (params: Type.Object = {}) => fetch('change_password', params, 'post')
//
// //退出登录
// export const logout = (params: Type.Object = {}) => fetch('logout', params, 'post')

//获取用户信息
export const getUserInfo = (params: Type.Object = {}) => fetch('getUserInfo', params, 'post')

