'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"http://10.2.2.73:8084"',
  Subject_Service_URL: '"http://10.2.2.73:8083"',
  Paper_Service_URL: '"http://10.2.2.73:8084"',
  Tiku_Service_URL: '"http://tikutest.zy.com/testwebseviceserver/"',
  Exam_Web_URL:'"http://tikutest.zy.com/Exam/"',
  PageSize:'"20"'
})
