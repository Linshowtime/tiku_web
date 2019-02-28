'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_URL: '"http://10.2.2.73:8084"',
  BASE_URL: '"http://localhost:8089"',
  //BASE_URL: '"http://tikutest.zy.com/Exam"',
  Human_Service_URL: '"http://localhost:8089/human"',
  Subject_Service_URL: '"http://127.0.0.1:8089/api/subject/"',
  Paper_Service_URL: '"http://10.2.2.73:8084"',
  Tiku_Service_URL: '"http://tikutest.zy.com/testwebseviceserver/"',
  //Exam_Web_URL:'"http://tikutest.zy.com/Exam/"',
  Exam_Web_URL:'"http://localhost:8082/"',
  Org_Service_URL:'"http://localhost:8081"',
  Knowledge_Service_URL:'"http://127.0.0.1:8089/api/knowledge/"',

  PageSize:'"20"'
})
