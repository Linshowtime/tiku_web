import _global from '@/common/js/GlobalParams'
import {fetch} from "@/common/js/fetch"; //引用fetch.js

/**
 * 获取所有顶级学科
 * @returns {*}
 */
export function getTopSubject() {
  return fetch({
    url: _global.requestUrl.getTopSubjectUrl,
    method: 'get',
    params: null
  })
}
/**
 * 获取所有顶级学科
 * @returns {*}
 */
export function getOrgs() {
  return fetch({
    url: _global.requestUrl.allOrgUrl,
    method: 'get',
    data: null
  })
}

/**
 * 获取所有学段
 * @returns {*}
 */
export function getStages() {
  return fetch({
    url: _global.requestUrl.getStagesUrl,
    method: 'get',
    params: null
  })
}
/**
 * 获取所有学段
 * @returns {*}
 */
export function getAllGrade() {
  return fetch({
    url: _global.requestUrl.getGradesUrl,
    method: 'get',
    params: null
  })
}
/**
 * 根据学段和学科获取学段学科id
 * @param stageId
 * @param subjectId
 * @returns {*}
 */
export function getStageSubjectIdByStageAndSubject(stageId, subjectId) {
  return fetch({
    url: _global.requestUrl.getStageSubjectIdUrl,
    method: 'post',
    data: {
      'gradeSegmentId': stageId,
      'courseId': subjectId
    }
  })
}

/**
 * 通过年级获取学段
 * @param gradeId
 */
export function getStageByGrade(gradeId) {
  return fetch({
    url: _global.requestUrl.getStageByGradeUrl + gradeId,
    method: 'get',
    params: null
  })
}

export function getAllAreas() {
  return fetch({
    url: _global.requestUrl.allAreasUrl,
    method: 'get',
    params: null
  })
}
export function updateUser(param) {
  return fetch({
    url: _global.requestUrl.updateUserUrl,
    method: 'post',
    data: param
  })
}
export function login(param) {
  return fetch({
    url: _global.requestUrl.loginUrl,
    method: 'post',
    data: param
  })
}
export function register(param) {
  return fetch({
    url: _global.requestUrl.registerUrl,
    method: 'post',
    data: param
  })
}
export function sendMsg(param) {
  return fetch({
    url: _global.requestUrl.sendMsgUrl,
    method: 'post',
    data: param
  })
}
export function validateNum(param) {
  return fetch({
    url: _global.requestUrl.validateNumUrl,
    method: 'post',
    data: param
  })
}
export function searchStudentByPage(param,pageNo, pageSize) {
  return fetch({
    url: _global.requestUrl.queryStudentUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })
}
export function updateStudent(param) {
  return fetch({
    url: _global.requestUrl.updateStudentUrl,
    method: 'post',
    data: param
  })
}
export function authStudent(param) {
  return fetch({
    url: _global.requestUrl.authStudentUrl,
    method: 'post',
    data: param
  })
}
export function addStudent(param) {
  return fetch({
    url: _global.requestUrl.addStudentUrl,
    method: 'post',
    data: param
  })
}

export function searchTeacherByPage(param,pageNo, pageSize) {
  return fetch({
    url: _global.requestUrl.queryTeacherUrl + pageNo + '/' + pageSize,
    method: 'post',
    data: param
  })
}
export function updateTeacher(param) {
  return fetch({
    url: _global.requestUrl.updateTeacherUrl,
    method: 'post',
    data: param
  })
}
export function authTeacher(param) {
  return fetch({
    url: _global.requestUrl.authTeacherUrl,
    method: 'post',
    data: param
  })
}
export function addTeacher(param) {
  return fetch({
    url: _global.requestUrl.addTeacherUrl,
    method: 'post',
    data: param
  })
}
/**
 *
 * @returns {*}
 */
export function Connect() {
  return fetch({
    url: _global.requestUrl.testUrl,
    method: 'get',
    params: null
  })
}

export default {
  getTopSubject,
  getStages,
  getStageSubjectIdByStageAndSubject,
  getStageByGrade,
  getAllAreas,
  login,
  register,
  sendMsg,
  validateNum,
  Connect,
  getOrgs,
  searchStudentByPage,
  updateStudent,
  addStudent,
  searchTeacherByPage,
  addTeacher,
  updateTeacher,
  authTeacher,
  authStudent,
  updateUser,
  getAllGrade
}
