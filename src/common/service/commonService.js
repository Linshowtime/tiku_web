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
export default {
  getTopSubject,
  getStages,
  getStageSubjectIdByStageAndSubject,
  getStageByGrade,
  getAllAreas,
  login,
  register,
  sendMsg,
  validateNum
}
