 'use strict'

 import axios from 'axios'
 import router from '@/router'
 import {
   MessageBox
 } from 'element-ui'

 axios.defaults.withCredentials = true
 axios.defaults.crossDomain = true

 axios.interceptors.response.use(
   response => response,
   error => {
     const response = error.response
     if (response && response.status === 302) {
       MessageBox.confirm(
         '您的登录信息已过期，您可以取消以停留在此页，或重新登录',
         '系统提示', {
           confirmButtonText: '重新登录',
           cancelButtonText: '取消',
           type: 'warning'
         }
       ).then(() => {
         localStorage.setItem('islogin', JSON.stringify(false))
         router.replace({
           path: '/login'
         })
       }).catch(() => {

       });
     }
   })