import axios from 'axios';//引入axios
import Vue from 'vue';
import router from '@/router';
export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Content-Type': 'application/json',
        'token': sessionStorage.getItem('token')
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
      timeout: 30 * 1000 // 30秒超时
    });
    // 请求时的拦截
    instance.interceptors.request.use(function (config) {
      // 发送请求之前做一些处理
      return config;
    }, function (error) {
      // 当请求异常时做一些处理
      return Promise.reject(error);
    });
    router.beforeEach((to, from, next) => {
      if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('token')&&sessionStorage.getItem('role')==to.meta.role) { // 当前的token是否存在
          next();
        } else {
          next({
            path: '/login'
          })
        }
      } else {
        next();
      }
     if(to.meta.auth){
       if(sessionStorage.getItem('auth')==1){
         next();
       }
       else{
         if(sessionStorage.getItem('role')==0){
           next({
             path:'/student'
           })
         }
         else{
           next({
             path:'/teacher'
           })
         }
       }
     }
     else{
       next();
     }
    });
    // 响应时拦截
    instance.interceptors.response.use(function (response) {
      // // 返回响应时做一些处理
      // if(response.data.resultCode=='0000'){
      //   return response.data.data;
      // }else {
      //
      //   if(response.data.hasOwnProperty("result")){
      //     return response.data.result;
      //   }
      //   return null;
      // }
      if (response.data && response.data.code == 4) { // 401, token失效
        // 只有在当前路由不是登录页面才跳转
        router.currentRoute.path !== 'login' &&
        router.replace({
          path: '/login'
        })
      }
      return response;

    }, function (error) {
      // 当响应异常时做一些处理
      return Promise.reject(error);
    });

    instance(options)
      .then(response => { //then 请求成功之后进行什么操作

        resolve(response);//把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error);
        reject(error);
      });

  });
}
