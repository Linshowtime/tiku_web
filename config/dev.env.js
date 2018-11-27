'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_URL: '"http://10.2.2.73:8084"',
  BASE_URL: '"http://tikutest.zy.com/Exam"',
  Subject_Service_URL: '"http://10.2.2.73:8083"',
  Paper_Service_URL: '"http://10.2.2.73:8084"',
  Tiku_Service_URL: '"http://tikutest.zy.com/testwebseviceserver/"',
  Exam_Web_URL:'"http://tikutest.zy.com/Exam/"',
  Org_Service_URL:'"http://localhost:8081"',
  Knowledge_Service_URL:'"http://tikutest.zy.com/Exam"',
  PageSize:'"20"'
})
